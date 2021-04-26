import AppLayout from '../components/AppLayout'
import Product from '../components/Product/Product'
import FeaturedProduct from '../components/FeaturedProduct/FeaturedProduct'
import { product } from '../utils/product'
import { useContext } from 'react'
import { AppContext } from '../reactcontext/App'

const IndexPage = () => {
  const { updateCartItems }: any = useContext(AppContext);
  const getFeaturedProduct=()=>{
      let result = product.find(product=>product.featured);
      if(!result){
        return product[0]
      }

      return result;
  }
  return(
  <AppLayout title="Home">
    <FeaturedProduct product={getFeaturedProduct()} updateCartItems={updateCartItems}/>
   <Product />
  </AppLayout>
)}

export default IndexPage
