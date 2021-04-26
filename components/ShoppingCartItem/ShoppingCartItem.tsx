import React from 'react';
import styles from './ShoppingCartItem.module.scss';
import { ShoppingCart } from '../../interfaces/shoppingCartInterface';
import { currencyFormatter } from '../../utils/utils';

type Props = {
    shoppingCartItem: ShoppingCart
}
const ShoppingCartItem = ({ shoppingCartItem }: Props) => (
    <div className={styles.shoppingCartItem}>
        <div className="product-bag-info">
            <div className={styles.shoppingCartItem__name}>
                {shoppingCartItem.name} {`X ${shoppingCartItem.quantity}`}
            </div>
            <div className={styles.shoppingCartItem__price}>
                {currencyFormatter(shoppingCartItem.price, shoppingCartItem.currency)}
            </div>
        </div>
        <div className={styles.shoppingCartItem__image}>
            <img src={shoppingCartItem.image?.src} alt={shoppingCartItem.image?.alt} />
        </div>
    </div>
)

export default ShoppingCartItem;