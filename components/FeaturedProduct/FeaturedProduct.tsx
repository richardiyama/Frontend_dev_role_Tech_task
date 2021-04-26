import React from 'react';
import { Product} from '../../interfaces/productInterface';
import styles from './FeaturedProduct.module.scss';
import {ShoppingCart} from '../../interfaces/shoppingCartInterface';

type Props={
    product:Product,
    updateCartItems:(P:ShoppingCart)=>void
}
const FeaturedProduct = ({ product, updateCartItems }: Props) => (
    <div className={styles.featured_product}>
        <div className={styles.featured_product__header}>
            <div className={styles['featured_product__product-name']}>
                {product?.name}
            </div>
            <button onClick={()=>{updateCartItems({...product,productId:product.id})}} className={`${styles['featured_product__header--cart-btn']} hidden md:block`}>Add to Cart</button>
        </div>
        <div className={styles['featured_product__image-container']}>
            <img src={product?.image?.src} alt={product?.image?.alt} className={styles.featured_product__image} />
            <div className={styles.featured_product__tag}>
                Photo of The Day
            </div>
        </div>
        <button onClick={()=>{updateCartItems({...product,productId:product.id})}} className={`${styles['featured_product__header--cart-btn']}  md:hidden mb-6`} >Add to Cart</button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap:8">
            <div className="col-span-1 lg:col-span-2 py-3">
                <div className={`${styles['featured_product__about-title']} pb-3`}>
                    About The {product?.name}
                </div>
                <div className={`${styles['featured_product__product-category']} pb-3`}>{product?.category}</div>
                <p className={styles['featured_product__product-desc']}>
                    {product?.details?.description}
                </p>
            </div>

            <div className={`${styles.featured_product__bottom} col-span-1 lg:col-span-1 py-3`}>
                <div>
                    <div className={`${styles['featured_product__about-title']} pb-2`}>
                        People also buy
                    </div>
                    <div className="grid grid-cols-3 justify-self-end gap-2 mt-6">
                        {
                            product?.details?.recommendations.map((recommended: Product, keyId: number) => {
                                return <div key={keyId} className={`${styles['featured_product__recommended-product']}`}><img src={recommended?.image?.src} alt={recommended?.image?.alt} title={recommended?.image?.alt} /></div>
                            })
                        }
                    </div>
                </div>
                <div className="mt-7">
                    <div className={`${styles['featured_product__about-title']} pb-2`}>
                        Details
                    </div>
                    <div className={styles['featured_product__product-details']}>
                        <p className="py-1">
                            Size: {`${product?.details?.dimensions?.width} x ${product?.details?.dimensions?.height}`} pixel
                        </p>
                        {product?.details?.size && <p className="py-1">
                            Size: {(product.details.size) / 1024} MB
                        </p>}
                    </div>
                </div>

            </div>
        </div>
    </div>
)

export default FeaturedProduct;