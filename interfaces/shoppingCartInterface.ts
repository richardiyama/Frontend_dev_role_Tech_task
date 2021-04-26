export type ShoppingCart = {
    id: number
    name: string,
    category: string,
    price: number,
    currency: string,
    image: { src: string, alt: string },
    productId: number,
    quantity?: number
  }