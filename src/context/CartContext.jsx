import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        console.log("Adding to cart:", product, "Quantity:", quantity); 
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
    
            if (existingProductIndex !== -1) {
                console.log("Updating existing product quantity"); 
                return prevCart.map((item, index) =>
                    index === existingProductIndex
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                console.log("Adding new product to cart");
                return [...prevCart, { ...product, quantity }];
            }
        });
    };
    
    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
