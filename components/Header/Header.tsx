import React from 'react';
import { ShoppingCart as IshoppingCart } from '../../interfaces/shoppingCartInterface';
import styles from './Header.module.scss';
import ShoppingCart from '../ShoppingCart/ShoppingCart';


type Props={
    isCartVisible:boolean,
    toggleCartVisibility:()=>void,
    closeCart:()=>void,
    shoppingCartLength:number,
    shoppingCartItems:IshoppingCart[],
    clearCart:()=>void
}
const Header = ({ isCartVisible, toggleCartVisibility, closeCart, shoppingCartLength, shoppingCartItems,clearCart }: Props) => {

    return (
        <div className={`${styles.header} flex justify-between py-3 cursor-pointer`}>
            <img src='/logo.svg' alt="Bejamas Logo" />
            <div className={styles.header__shopping_cart} onClick={() =>{ toggleCartVisibility()}}>
                <img src='/shopping-cart.svg' alt="shopping cart" />
                {shoppingCartLength > 0 && <div className={styles['header__cart--length']}>
                    {shoppingCartLength}
                </div>}
            </div>
            {isCartVisible && <ShoppingCart shoppingCartItems={shoppingCartItems} closeCart={closeCart} clearCart={clearCart} />}
        </div>
    )
}

export default Header;