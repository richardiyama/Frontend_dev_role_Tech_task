export type Product = {
    id: number
    name: string,
    category: string,
    price: number,
    currency: string,
    bestseller: boolean,
    details?:{
      dimensions:{width:number,height:number},
      size:number,
      description:string,
      recommendations:Product[]
    },
  
    image: { src: string, alt: string }
  }