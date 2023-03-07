import React, {useState, useEffect,useLayoutEffect} from 'react';
import AppSetup from "@appSetupClient"
import { getNftById } from "@/nftModel"
import { useRouter } from 'next/navigation';
import { PlasmicFlexPage } from "../../components/plasmic/im_xbeanies/PlasmicFlexPage";

 

 function Nfts(props) {
    
    const nft = props.nft

    const [isUidVerified,setIsUidVerified] = useState(false);
    const router = useRouter()


    useLayoutEffect(() => {
        
      const routeToClaim = async () => {
        if(!nft?.claimed){
          const claimRoute = `${AppSetup.webRoute}claim/${nft.tagUid}`
            router.push(claimRoute)
        }else{
          setIsUidVerified(true)
          }
          return
      }

      routeToClaim()
          return


},[isUidVerified]);

    return (
      <>
       {/* select nft */}
      {nft?.claimed &&
      <PlasmicFlexPage /* The flexpage component that encompasses the entirety of the flex page */
            uIdInput={nft.tagUid}
            ownerAddress={nft.owner}
      />
      }
      </>
    )
  }
  


export const getServerSideProps = async (context) => { /* This function retrieves the data from the database about the NFTs */
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