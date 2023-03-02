'use client';

import { deleteNftById } from "@/lib/prisma/Nfts";
import React, {useState, useEffect} from 'react';




    const DeleteAction =  ({ nftId }) => {

        const [deleted,setDeleted] = useState(false)
        // const nfts = await getData()

        
    const webRoute = `http://localhost:3000/`
    const delteApiRoute = `${webRoute}/api/DeleteNft`;

    const handleDeleteCall = async() =>{
    // e.preventDefault()
    const response = await fetch(delteApiRoute, {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify({nftId:nftId})
    })

    const jsonRes = await response.json()
    
}


        return (

    <button
    //   type="button"
        className="rw-button rw-button-red"
        onClick={() => handleDeleteCall()}
    >
        Delete
    </button> 
            
        )
        }
        
    export default DeleteAction




  
// import Router from 'next/router'

        
//     const webRoute = `http://localhost:3000/`
//     const claimApiRoute = `${webRoute}/api/Claim`;

// async function ClaimNow(id,owner) {
//   await fetch(`${claimApiRoute}/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify({tagUid:nftId, claimed:true, owner})
//   })
//   await Router.push('/')
// }

// async function destroy(id) {
//   await fetch(`${delteApiRoute}/${id}`, {
//     method: 'DELETE',
//   })
//   await Router.push('/')
// }


// export default  function DeleteAction({nftId, claimed}) {
//   return (
//     <>
//       <div className="page">
//         <div className="actions">
//           {!claimed && (
//             <button onClick={() => ClaimNow(nftId)}>Claim</button>
//           )}
//           <button onClick={() => destroy(nftId)}>Delete</button>
//         </div>
//       </div>
//       <style jsx>{`
//         .page {
//           background: white;
//           padding: 2rem;
//         }

//         .actions {
//           margin-top: 2rem;
//         }
//       `}</style>
//       </>
//   )
// }
