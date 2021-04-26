import { NextApiRequest, NextApiResponse } from 'next'
import { product } from '../../../utils/product'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(product)) {
      throw new Error('Cannot find product data')
    }

    res.status(200).json(product)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
