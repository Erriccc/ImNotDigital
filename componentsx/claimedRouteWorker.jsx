
'use client';
import { useRouter } from 'next/navigation';
import React, {useState, useEffect} from 'react';

export default  function ClaimedRouteWorker({children, nftId, claimed}) {
        const [isClaimed,setIsClaimed] = useState(claimed);
        const router = useRouter()
        useEffect(() => {
        
            const pushToFlex = async () => {
                {claimed && (router?.push(`/claim/${nftId}`))}
                return
            }

            {!(typeof window === undefined) && isClaimed  && pushToFlex()}
                return
    

          },[isClaimed]);
    

  return (
    <>
      { children }
      </>
  )
}
