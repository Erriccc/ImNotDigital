// PUT /api/publish/:id
// export default async function handle(req, res) {
//   const postId = req.query.tagUid
//   const post = await prisma.Post.update({
//     where: { id: postId },
//     data: { claimed: true },
//   })
//   res.json(post)
// }

// Claim Service 
import { deleteNftById, getNfts, updateNftById } from '@/lib/prisma/Nfts'

const handler = async (req, res) => {
  if (req.method === 'PUT') {
    try {
      console.log('yay PUT req to claim nft!')
      const tagUid = req.body.tagUid
      const owner = req.body.owner
      const claimed = req.body.claimed
      const { nfts, error } = await updateNftById(tagUid, {update:{owner,claimed}})
      if (error) throw new Error(error)
      return res.status(200).json({ nfts })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  res.status(425).end(`Method ${req.method} is not allowed.`)

}

export default handler
