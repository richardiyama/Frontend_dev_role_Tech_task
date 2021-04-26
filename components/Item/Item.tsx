import React from 'react';
import styles from './Item.module.scss';
import { currencyFormatter } from '../../utils/utils';
import {Product} from '../../interfaces/productInterface';
import { ShoppingCart } from '../../interfaces/shoppingCartInterface';


type Props={
    product:Product,
    updateCartItems:(P:ShoppingCart)=>void
}
const Item = ({ product, updateCartItems }: Props) => (
    <div className={styles.product_item}>
        <div className={styles.product_item__top}>
            <img src={product?.image?.src} alt={product?.image?.alt} className={styles.product_item__image} />
            {(product.bestseller) ? (
                <div className={styles.product__best}>Best Seller</div>
            ) : ('')}
            <button onClick={()=>{updateCartItems({...product,productId:product.id,quantity:1})}} className={styles['product__cart-btn']}>Add to Cart</button>
        </div>
        <div className={styles.product_item__category}>{product.category}</div>
        <div className={styles.product_item__name}>{product.name}</div>
        <div className={styles.product_item__price}>
            {currencyFormatter(product.price,product.currency)}
        </div>

    </div>
)

export default Item