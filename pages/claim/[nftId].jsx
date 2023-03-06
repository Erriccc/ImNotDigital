import React, {useState, useEffect} from 'react';
import { PlasmicClaimPage } from "../../components/plasmic/im_xbeanies/PlasmicClaimPage";
import { getNftById } from "@/nftModel"
import AppSetup from "@appSetup"
import  ProcessingView from  '/components/ProcessingView';
import { Link, ImmutableXClient} from '@imtbl/imx-sdk';
import { ImmutableOrderStatus } from '@imtbl/imx-sdk';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

 

 function Nfts(props) {
    
    const nft = props.nft
    // const [owner,setOwner] = useState("ImNotArt");
    const [owner,setOwner] = useState(undefined);
    const [isUidVerified,setIsUidVerified] = useState(false);
    // const [ownerInfo,setOwnerInfo] = useState(false);
    const [client, setClient] = useState(Object);
    const [validatingInput, setvalidatingInput] = useState(false);
    const [minting, setMinting] = useState(false);

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
      setvalidatingInput(true)  //update loading state
      let linkRes;
      try{
        linkRes= await link.setup({});
        setOwner(linkRes.address);
        console.log('res.. from metamask login', linkRes)
        setvalidatingInput(false);  //update loading state
        toast.success('wallet detected!')

    }catch(e){
      setvalidatingInput(false);  //update loading state
      toast.error('wallet connection failed!')
    }
    //  setBalance(await client.getBalance({ user: res.address, tokenAddress: 'eth' }));
    };


async function ClaimNow(tagUid) {
  
    setMinting(true)  //update loading state


    const JSONdata = JSON.stringify({tagUid:tagUid,claimed:true,owner:owner})
    const endpoint = `${AppSetup.claimApiEndpoint}` // "api/paymentHandler"
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const flexRoute = `${AppSetup.webRoute}flex/${nft.tagUid}`

      try{
        await fetch(endpoint, options)
        setMinting(false);  //update loading state
        toast.success('asset minted!')
        router.push(flexRoute)
      }catch(e){
        setMinting(false);  //update loading state
        toast.error(`Claim failed! ${e}`)
      }
}


useEffect(() => {
        
  const showClaimButton = async () => {
      if(nft?.claimed) {
        setIsUidVerified(owner)
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


},[isUidVerified,owner]);


    return (
      <main >
        {validatingInput && (<ProcessingView status={"connecting wallet.."} arrayToDisplay={["thank you for trying imNotDigital 🤝","don't forget to flex 🏋️ your Nft after you claim it 🤳🏽😚", "how can we improve?🐵🙈🤔"]}/>)}
        {minting && (<ProcessingView status={"minting"} arrayToDisplay={["thank you for trying imNotDigital 🤝","don't forget to flex 🏋️ your Nft after you claim it 🤳🏽😚","how can we improve?🐵🙈🤔"]}/>)}

        {nft &&
          <PlasmicClaimPage /* The claimpage component that encompasses the entirety of the claim page */
              claimBeanieHeader={{claimText:`Claim Nft ${nft.tagUid} Detail`}} /* Header component, this will not be dynamic, just used as an example at first. claimText is the slot used for dynamic data based on the particular prop used */
              claimButton={{ /* Claim button component */
                canClaim:owner===undefined, // Boolean only sow the claim button if ownerInfo is already populated
                onClick:() => {ClaimNow(nft.tagUid)}
              }}
              commingSoonOrRegisterWallet={{
                connectedAddress:owner&&owner,
                walletConnected:!(owner===undefined),
                registerWalletButton:{
                  ownerInfo:!(owner===undefined),
                  onClick:() => {linkSetup()}
                }
              }}
              uid={{uIdInput:nft.tagUid}}
              // registerWalletButton={{
              //   ownerInfo:!(owner===undefined), //  Boolean change variant to updateWallet if user has registered their wallet
              //   onClick:() => {linkSetup()}
              // }}
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