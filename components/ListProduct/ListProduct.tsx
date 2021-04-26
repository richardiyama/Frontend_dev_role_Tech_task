import React from 'react';
import Item from '../Item/Item';
import { ShoppingCart } from '../../interfaces/shoppingCartInterface';

type Props = {
    products: any[],
    updateCartItems:(P:ShoppingCart)=>void
}
const ListProduct = ({ products,updateCartItems }: Props) => (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {products.map((product, index) => (
                <Item product={product} key={index} updateCartItems={updateCartItems} />
         
    ))}
    {!products || products.length == 0 && <div className="text-4xl flex justify-between w-full">No Product to show</div>}
    </div>

)

export default ListProduct;