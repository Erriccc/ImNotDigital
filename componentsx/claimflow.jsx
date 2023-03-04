
'use client';
import { useRouter } from 'next/navigation';

import React, {useState, useEffect} from 'react';

export default  function ClaimAction({nftId, claimed}) {
        const [owner,setOwner] = useState("yo");
        const router = useRouter()
        // const webRoute = `http://localhost:3000/`
        const claimApiRoute = `/api/Claim`;
        // const delteApiRoute = `/api/EditNfts`;

    
    async function ClaimNow(tagUid) {
        const JSONdata = JSON.stringify({tagUid:tagUid,claimed:true,owner:owner})
        const endpoint = `${claimApiRoute}` // "api/paymentHandler"
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        // {!(typeof window === undefined) && router.push(`/nfts/${tagUid}`)}
        {router.push(`/claim/${tagUid}`)}

        
    }
    
    async function destroy(id) {
      await fetch(`${delteApiRoute}`, {
        method: 'DELETE',
      })
      router.push('/')
    }
    

  return (
    <>
      <div className="page">
        <div className="actions">
          {!claimed && (
            <>
                <label forhtml="name">ENS or EMAIL:</label>
                <input type="text" id="name" name="wallet" onChange={(e)=> setOwner(e.target.value)} />
                <button onClick={() => ClaimNow(nftId)}>Claim</button>
            </>
          )}
        </div>
      </div>
      </>
  )
}
