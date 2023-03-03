//import Link from 'next/navigation'
import { getNfts } from '@/lib/prisma/Nfts'
import { Link, ImmutableXClient } from '@imtbl/imx-sdk';
import { useEffect, useState } from 'react';

//require('dotenv').config();

const Nfts = (props) => {
  
  // initialise Immutable X Link SDK
  const link = new Link(process.env.REACT_APP_SANDBOX_LINK_URL);
  
   const [wallet, setWallet] = useState('undefined');
     const [balance, setBalance] = useState(Object);
    const [client, setClient] = useState(Object);

    //build imx Client on load
    useEffect(() => {
        buildIMX();
    }, []);

    // initialise an Immutable X Client to interact with apis more easily
    async function buildIMX() {
      const publicApiUrl = process.env.REACT_APP_SANDBOX_ENV_URL ?? '';
      setClient(await ImmutableXClient.build({ publicApiUrl }));
  }

   // register and/or setup a user
   async function linkSetup() {
    const res = await link.setup({});
    setWallet(res.address);
    setBalance(await client.getBalance({ user: res.address, tokenAddress: 'eth' }));
}
;
  console.log(client)
  return (
    <section >
      <div >
      <button onClick={linkSetup}>Setup</button>
      <div>
        Active wallet: {wallet}
      </div>
        <h2 >
            Digital Collectibles
        </h2>
        <ul >
          {props.nfts?.map(nft => (
            <li key={nft.id} >
              <a href={`claim/${nft.tagUid}`}>{nft.issuer}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
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