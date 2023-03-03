import { getNftById } from "@/lib/prisma/Nfts"
import ClaimedRouteWorker from '../../components/claimedRouteWorker'
import ClaimAction from "../../components/claimflow"
import { ImmutableOrderStatus } from '@imtbl/imx-sdk';



 function Nfts(props) {
    
    const nft = props.nft
    return (
      <main >
       {/* select nft */}
      <div >
        <header >
          <h2 > Claim Nft {nft.id} Detail</h2>
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
      <ClaimAction nftId={nft.tagUid} claimed={nft.claimed}/>
       </main>
       
    )
  }
  


export const getServerSideProps = async (context) => {
    const {params} = context;
    const id = params.nftId;

    async function getNft() {
        const {nft} = await getNftById(id)
        if (!nft) {
          throw new Error('Failed to fetch data')
        }
        return nft
      }
    const nft = await getNft()
    return {props:{nft}}
  }

  export default Nfts