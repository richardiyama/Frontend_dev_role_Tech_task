import React, { useState, useEffect, createContext } from "react"
import { ShoppingCart } from "../interfaces/shoppingCartInterface";

const AppContext = createContext({});

const LOCALSTORAGE_CART = 'shoppingCartItems';

function AppProvider({ children }: any) {
    const [shoppingCartItems, setCartItems] = useState<ShoppingCart[]>([]);
    const [isCartVisible, setIsCartVisible] = useState<boolean>(false);


    useEffect(() => {
        let data = localStorage.getItem(LOCALSTORAGE_CART);
        if(!data){
            return;
        }
            const shoppingCartItemsData = JSON.parse(data);
            if (shoppingCartItemsData) {
                setCartItems(shoppingCartItemsData);
            }
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCALSTORAGE_CART, JSON.stringify(shoppingCartItems))
    }, [shoppingCartItems])

    const updateCartItems = (item: any) => {
        const existingCartItem = shoppingCartItems?.find((shoppingCartItem: any) => shoppingCartItem.productId == item.id);
        if (existingCartItem) {
            let updatedCartItems = shoppingCartItems.map((shoppingCartItem: any) =>
                shoppingCartItem.productId === item.id ? {
                    ...shoppingCartItem, quantity: shoppingCartItem.quantity + 1
                } : shoppingCartItem
            );
            setCartItems(updatedCartItems);
            setIsCartVisible(true);
            window.scrollTo(0, 0)
            return;
        }
        let topId = shoppingCartItems?.length > 0 ? shoppingCartItems[shoppingCartItems.length - 1].id + 1 : 1;
        setCartItems(shoppingCartItems.concat({...item, id: topId,quantity:1 }));
        setIsCartVisible(true);
        window.scrollTo(0, 0)
    }

    const toggleCartVisibility = () => {
        setIsCartVisible((isCartVisible: boolean) => !isCartVisible);
    }

    const closeCart = () => {
        setIsCartVisible(false);
    }


    const clearCart = () => {
         setCartItems([]);
    }

    return <AppContext.Provider
        value={{ shoppingCartItems, isCartVisible, updateCartItems, toggleCartVisibility, closeCart, clearCart }}
    >
        {children}
    </AppContext.Provider>
}

export  {AppContext,AppProvider};