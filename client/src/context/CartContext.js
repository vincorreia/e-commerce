import React, {useState, useContext, useEffect} from "react"

const CartContext = React.createContext()
const CartUpdateContext = React.createContext()

export function useCart(){
    return useContext(CartContext);
}

export function useUpdateCart(){
    return useContext(CartUpdateContext)
}


   
export default function CartProvider({children}) {
    const [cart, setCart] = useState({})

    useEffect(() => {
        let cartCookie
        try {
            cartCookie = JSON.parse(localStorage.cart)
        }
        catch {
            cartCookie = {}
        }
        finally{
        setCart(cartCookie)
        }
    }, [])
    

    
    function updateCart(increaseOrDecrease, product) { /* increaseOrDecrease will receive "inc" or "dec", inc will increase the amount in cart by one, dec will decrease by one */                                     
        let newCart = {...cart, [product.name]: product}

        if(checkIfInCart(product.name)){
            let currentAmount = cart[product.name].amount
            
            if(increaseOrDecrease === "inc"){
                product.amount =  currentAmount + 1
            } 
            
            else if (increaseOrDecrease === "dec"){
                product.amount = currentAmount - 1

                if(product.amount === 0){
                    delete newCart[product.name]
                }
            }

        } 
        
        else{
            product.amount = 1
        }
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);
    }

    function checkIfInCart(name){
        return cart[name]
    }

    return (
        <CartContext.Provider value={cart}>
            <CartUpdateContext.Provider value={updateCart}>
                {children}
            </CartUpdateContext.Provider>
        </CartContext.Provider>
    )
}