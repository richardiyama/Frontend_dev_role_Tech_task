import React, { ReactNode, useContext } from 'react'
import Head from 'next/head'
import Header from '../components/Header/Header'
import { AppContext } from '../reactcontext/App'
import styles from './AppLayout.module.scss';

type Props = {
  children?: ReactNode
  title?: string
}

const AppLayout = ({ children, title = 'This is the default title' }: Props) => {
  const { isCartVisible, closeCart, clearCart, toggleCartVisibility, shoppingCartItems }: any = useContext(AppContext);

  return (
    <div className={styles.app}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header shoppingCartLength={shoppingCartItems?.length > 0 ? shoppingCartItems.length : 0} isCartVisible={isCartVisible} closeCart={closeCart} toggleCartVisibility={toggleCartVisibility} shoppingCartItems={shoppingCartItems} clearCart={clearCart} />
      {children}
    </div>
  )

}

export default AppLayout
