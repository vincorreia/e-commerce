import React, {useState, useContext} from "react"

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

    function updateCart(increaseOrDecrease, product) {
        if(cart[product.name]){
            if(increaseOrDecrease === "inc"){
                product.amount = cart[product.name].amount + 1
            } else if (increaseOrDecrease === "dec"){
                product.amount = cart[product.name].amount - 1
            }
        } else{
            product.amount = 1
        }
        setCart({...cart, [product.name]: product});
    }
    return (
        <CartContext.Provider value={cart}>
            <CartUpdateContext.Provider value={updateCart}>
                {children}
            </CartUpdateContext.Provider>
        </CartContext.Provider>
    )
}