import React, {useState, useEffect} from 'react';
import { PlasmicClaimPage } from "../../components/plasmic/im_xbeanies/PlasmicClaimPage";
import { getNftById } from "@/nftModel"
import AppSetup from "@appSetup"
import { Link, ImmutableXClient} from '@imtbl/imx-sdk';
import { ImmutableOrderStatus } from '@imtbl/imx-sdk';
import { useRouter } from 'next/navigation';

 

 function Nfts(props) {
    
    const nft = props.nft
    const [owner,setOwner] = useState("ImNotArt");
    const [isUidVerified,setIsUidVerified] = useState(false);
    const [client, setClient] = useState(Object);

    const router = useRouter()

    // initialise Immutable X Link SDK
    const link = new Link(process.env.REACT_APP_SANDBOX_LINK_URL);


      // initialise an Immutable X Client to interact with apis more easily
      async function buildIMX() {
        const publicApiUrl = process.env.REACT_APP_SANDBOX_ENV_URL ?? '';
        setClient(await ImmutableXClient.build({ publicApiUrl }));
    }

    // register and/or setup a user
    async function linkSetup() {
      console.log('setting up')
      const res = await link.setup({});
      // alert(res.address)
      setOwner(res.address);
    //  setBalance(await client.getBalance({ user: res.address, tokenAddress: 'eth' }));
    };


async function ClaimNow(tagUid) {
    const JSONdata = JSON.stringify({tagUid:tagUid,claimed:true,owner:owner})
    const endpoint = `${AppSetup.claimApiEndpoint}` // "api/paymentHandler"
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    const flexRoute = `${AppSetup.webRoute}flex/${nft.tagUid}`
    router.push(flexRoute)

    
}


useEffect(() => {
        
  const showClaimButton = async () => {
      if(nft?.claimed) {
        setIsUidVerified(true)
        const flexRoute = `${AppSetup.webRoute}flex/${nft.tagUid}`
        router.push(flexRoute)
      }else{
        //build imx Client on load
          {nft && buildIMX()};
        console.log('not claimed')

      } 
  }
  showClaimButton()
      return


},[isUidVerified]);


    return (
      <main >
        {nft &&
          <PlasmicClaimPage /* The claimpage component that encompasses the entirety of the claim page */
              claimBeanieHeader={{claimText:`Claim Nft ${nft.tagUid} Detail`}} /* Header component, this will not be dynamic, just used as an example at first. claimText is the slot used for dynamic data based on the particular prop used */
              claimButton={{ /* Claim button component */
                isVerified:nft?.claimed,
                onClick:() => {ClaimNow(nft.tagUid)}
              }}
              RegisterWalletButton={{
                onClick:() => {linkSetup()}
              }}
            />
          }

       {/* select nft */}
      {/* 
              <div>{nft.issuer}</div>
              <div>{nft.tagUid}</div>
              <div>{nft.claimed.toString()}</div>
              <div>{nft.owner}</div>
      
      */}
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