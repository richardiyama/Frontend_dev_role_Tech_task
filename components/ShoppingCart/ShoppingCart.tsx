import React from 'react';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import styles from './ShoppingCart.module.scss';
import { ShoppingCart as IshoppingCart } from '../../interfaces/shoppingCartInterface';

type Props = {
    shoppingCartItems:IshoppingCart[],
    closeCart:()=>void,
    clearCart:()=>void
}
const ShoppingCart=({shoppingCartItems,closeCart,clearCart}:Props)=>(
    <div className={styles.cart}>
        <div className="flex justify-end pb-3 cursor-pointer" onClick={()=>closeCart()}>
            <img src="./close.svg" width={18} height={18}/>
        </div>
        {shoppingCartItems?.map((shoppingCartItem:IshoppingCart,index:number)=>(
            <ShoppingCartItem shoppingCartItem={shoppingCartItem} key={index} />
        ))}
        {shoppingCartItems?.length == 0 && <div>No Item in Cart</div>}
        <button onClick={shoppingCartItems && clearCart} className={`${styles.cart__clearBtn} ${shoppingCartItems?.length == 0 &&styles['cart__clearBtn--disabled']}`}>Clear</button>
    </div>
)

export default ShoppingCart;