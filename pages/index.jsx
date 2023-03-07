//import Link from 'next/navigation'
import * as React from "react";
import { getNfts } from '@/nftModel'
import { PlasmicLandingPageAssets } from "@plasmic/PlasmicLandingPageAssets";
import { PlasmicLandingPage } from "@plasmic/PlasmicLandingPage";

import {useReducer } from 'react';
import * as ph from "@plasmicapp/host";
import { useRouter } from "next/router";
const Nfts = (props) => {
  
    const [listOfNft, dispatchather] = useReducer(reducer,{showClaimedNfts: false, showUnclaimedNfts: false, allNfts: true });
  
    function reducer(listOfNft, action){
      
        switch (action.type) {
          case "CLAIMED":
            return {showClaimedNfts: true, showUnclaimedNfts: false, allNfts: false}
          case "UNCLAIMED":
            return { showClaimedNfts: false, showUnclaimedNfts: true, allNfts: false}
          case "HIDE":
              return {showClaimedNfts: false, showUnclaimedNfts: false, allNfts: false}
          default:
            return listOfNft
    
        }
    }

  return (
    <ph.PageParamsProvider
      params={useRouter()?.query}
      query={useRouter()?.query}
    >
      <PlasmicLandingPage 
        landingPageListBox={props.nfts.map((nft) => 
        
          listOfNft.allNfts ? (
          <PlasmicLandingPageAssets  href={`claim/${nft?.tagUid}`} onClick={() => {console.log(nft.tagUid)}} key={nft.id} landingUId={ nft.tagUid } unclaimedAssets={ nft.claimed==false}  />
          )
          
          :  (listOfNft.showClaimedNfts) ?  nft.claimed&&(<PlasmicLandingPageAssets  href={`claim/${nft?.tagUid}`} onClick={() => {console.log(nft.tagUid)}} key={nft.id} landingUId={ nft.tagUid } unclaimedAssets={ nft.claimed==false}  /> )
          
          : !nft.claimed &&(<PlasmicLandingPageAssets  href={`claim/${nft?.tagUid}`} onClick={() => {console.log(nft.tagUid)}} key={nft.id} landingUId={ nft.tagUid } unclaimedAssets={ nft.claimed==false}  />)
      )}
        claimedButton={{
          onClick:() => {
            dispatchather({type:"CLAIMED"})
            console.log('CLAIMED')
          },
          baseActive:listOfNft.showClaimedNfts,
        }}
        unclaimedButton={{
          onClick:() => {
            dispatchather({type:"UNCLAIMED"})
            console.log('UNCLAIMED')
          
          },
          baseActive:listOfNft.showUnclaimedNfts,
        }}

        
      />

    </ph.PageParamsProvider>
  )
}

export const getServerSideProps = async () => {

    async function getData() {
        const { nfts } = await getNfts()
        if (!nfts) {
          throw new Error('Failed to fetch data')
        }
        return nfts
      }

    const nfts = await getData()

    return {
      props: { nfts },
      
    }
  }
  export default Nfts