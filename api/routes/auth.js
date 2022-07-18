const router = require("express").Router();
const {body, validationResult} = require("express-validator")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const { User } = require("../database/indexDB")

require("dotenv").config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET || "secret"
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || "secret"

let refreshTokens = [];

router.post("/login", 
async (req, res) => {
    
    const {email, password} = req.body;

    let user = await User.sync({ alter: true })
    .then(()=> {
        return User.findOne(
            {
                where: { email: email}
            }
        )
    })

    if(!user){
        console.log("user not found!")
        return res.status(400).json({
            errors: [
                {
                    msg: "Invalid credentials"
                }
            ]
        })
    }

    let match = await bcrypt.compare(password, user.password);

    if(!match) {
        return res.status(401).json({
            errors: [
                {
                    msg: "Invalid credentials"
                }
            ]
        })
    }

    const accessToken = await JWT.sign(
        {email},
        ACCESS_TOKEN,
        {
            expiresIn: 60
        }
    )

    const refreshToken = await JWT.sign(
        {email},
        REFRESH_SECRET,
        {
            expiresIn: 300
        }
    )

    refreshTokens.push(refreshToken);

    res.json({
        accessToken,
        refreshToken
    })
});


router.post("/signup",
body("email").isEmail(), 
body("password").isLength({min: 6}),
async (req, res) => {
    const {email, password} = req.body

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    let user = await User.sync({ alter: true })
    .then(()=> {
        return User.findOne(
            {
                where: { email: email}
            }
        )
    })

    if(user) {
        return res.status(200).json({
            errors: [
                {
                    email: user.email,
                    msg: "The user already exists"
                }
            ]
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await User.create({
        email: email,
        password: hash
    })

    console.log("User created!")

    const accessToken = await JWT.sign(
        {email},
        ACCESS_TOKEN,
        {
            expiresIn: 60,
        }
    );

    res.json({
        accessToken
    });
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

        if(!refreshToken.includes(refreshToken)){
            res.status(403).json({
                errors: [
                    {
                        msg: "Invalid refresh token"
                    }
                ]
            })
        }

        try {
            const user = await JWT.verify(
                refreshToken,
                REFRESH_SECRET
            );

            const {email} = user;
            const accessToken = await JWT.sign(
                {email},
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
)
router.delete("/logout", (req, res) => {
    const refreshToken = req.header("x-auth-token");
  
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.sendStatus(204);
  });


module.exports = router;