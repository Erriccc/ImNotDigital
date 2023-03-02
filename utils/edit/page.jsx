


// export async function generateStaticParams() {
//   const { users } = await getUsers()

import { getNftById } from "@/lib/prisma/Nfts"

//   return users.map(user => ({
//     userId: user.id
//   }))
// }

async function getNft(nftId) {
    const { nft } = await getNftById(nftId)
    if (!nft) {
      throw new Error('Failed to fetch data')
    }
  
    return nft
  }
  




export default async function Nfts({params}) {

    const nft = await getNft(params.nftId)
    return (
      <main >
       {/* select nft */}
       <>
      <div >
        <header >
          <h2 >
            Edit Nft {nft.id} Detail
          </h2>
        </header>
        <div >
          <div>
            <div>
           
              <div>UId</div>
              <div>{nft.tagUid}</div>
            </div>
            <div>
              <div>Issuer</div>
              <div>{nft.issuer}</div>
            </div>
            <div>
              <div>Claimed</div>
              <div>{nft.claimed.toString()}</div>
            </div>
            <div>
              <div>Owner</div>
              <div>{nft.owner}</div>
            </div>
          </div>
        </div>
      </div>
    </>
       </main>
    )
  }
  