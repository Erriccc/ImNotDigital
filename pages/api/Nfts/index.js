import { createNft, getNfts } from '@/lib/prisma/Nfts'
const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
    // TODO: Authenticate User and Validate incoming input!
      console.log('yay get req!')
      const { nfts, error } = await getNfts()
      if (error) throw new Error(error)
      return res.status(200).json({ nfts })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'POST') {
    try {
    // TODO: Authenticate User and Validate incoming input!

      console.log('yay Post req!')
      const data = req.body
      const { nft, error } = await createNft(data)
      if (error) throw new Error(error)
      return res.status(200).json({ nft })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler