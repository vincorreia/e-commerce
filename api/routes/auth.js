const router = require("express").Router();
const {body, validationResult} = require("express-validator")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const { User } = require("../database/indexDB")

require("dotenv").config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET || "secret"
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || "secret1"

let refreshTokens = [];

router.post("/login", 
async (req, res) => {
    
    const {email, password} = req.body;

    let user = await findOrCreate(email);


    let match = await bcrypt.compare(password, user.password);

    if(!user){
        return res.status(400).json({
            errors: [
                {
                    msg: "Invalid credentials"
                }
            ]
        })
    }

    else if(!match) {
        return res.status(401).json({
            errors: [
                {
                    msg: "Invalid credentials"
                }
            ]
        })
    }
    else {
    const accessToken = await generateToken(user);

    const refreshToken = await generateToken(user, 10800, REFRESH_SECRET);

    refreshTokens.push(refreshToken);

    res.json({
        accessToken,
        refreshToken,
        isStaff: user.isStaff
    })
    }
});


router.post("/signup",
body("email")
.isEmail()
.withMessage("Please provide a valid e-mail address"), 
body("password").isLength({min: 6})
.withMessage("Password must be at least 6 digits long")
,
async (req, res) => {
    const {email, password} = req.body

    const errors = validationResult(req);


    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    else {
        let user = await findOrCreate(email);
            
            if(user) {
                return res.status(406).json({
                    errors: [
                        {
                            email: user.email,
                            msg: "The user already exists"
                        }
                    ]
                })
            }

            else{
            
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
        
            let newUser = await User.create({
                email: email,
                password: hash
            })
        
            const accessToken = await generateToken(newUser);
            
            const refreshToken = await generateToken(newUser, 10800, REFRESH_SECRET);
            
            refreshTokens.push(refreshToken);

            res.json({
                accessToken,
                refreshToken,
                isStaff: newUser.isStaff
            });
        }
    }
}
)


router.post("/token",
    async (req, res) => {
        const refreshToken = req.header("x-auth-token");
        
        if(!refreshToken){
            res.status(401).json({
                errors: [
                    {
                        msg: "Token not found"
                    }
                ]
            })
        }

        else if(!refreshTokens.includes(refreshToken)){
            res.status(403).json({
                errors: [
                    {
                        msg: "Invalid refresh token"
                    }
                ]
            })
        }

        else {

            try {
                const user = await JWT.verify(
                    refreshToken,
                    REFRESH_SECRET
                );

                const {email, id, isStaff, name} = user;
                const accessToken = await JWT.sign(
                    {email, id, isStaff, name},
                    ACCESS_TOKEN,
                    {
                        expiresIn: 60
                    }
                    );
                
                res.json({ accessToken })
            }
            catch (error) {
                res.status(403).json({
                    errors: [
                        {
                            msg: "Invalid token"
                        }
                    ]
                })
            }
        }
    }
)

router.delete("/logout", (req, res) => {
    const refreshToken = req.header("x-auth-token");
  
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.sendStatus(204);
  });



async function findOrCreate(email){
    const user = await User.sync({ alter: true })
    .then(()=> {
        return User.findOne(
            {
                where: { email: email}
            }
        )
    })

    if(!user){
        return false;
    }

    else{
        return user
    }

}

async function generateToken(user, expiration = 60, secret = ACCESS_TOKEN){
    const token = await JWT.sign(
        {email: user.email, id: user.id, isStaff: user.isStaff, name: user.name},
        secret,
        {
            expiresIn: expiration,
        }
    );

    return token;
}
module.exports = router;