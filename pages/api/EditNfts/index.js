import { deleteNftById, getNfts, updateNftById } from '@/lib/prisma/Nfts'

const handler = async (req, res) => {
  if (req.method === 'PUT') {

    // TODO: Authenticate User and Validate incoming input!
    try {
      console.log('yay PUT req!')
      const tagUid = req.body.tagUid
      const { nfts, error } = await updateNftById(tagUid, {update:req.body})
      if (error) throw new Error(error)
      return res.status(200).json({ nfts })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
  
  if (req.method === 'DELETE') {

    // TODO: Authenticate User and Validate incoming input!

    try {
      console.log('yay DELETE req!')
      const data = req.body
      const { nft, error } = await deleteNftById(data)
      if (error) throw new Error(error)
      return res.status(200).json({ nft })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

//   res.setHeader('Allow', ['GET', 'POST'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler