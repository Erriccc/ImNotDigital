//import Link from 'next/navigation'
import * as React from "react";
import { getNfts } from '@/nftModel'
import { Link, ImmutableXClient, MintableERC721TokenType } from '@imtbl/imx-sdk';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import * as ph from "@plasmicapp/host";
import { useRouter } from "next/router";
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
  //  setBalance(await client.getBalance({ user: res.address, tokenAddress: 'eth' }));
};

   // helper function to generate random ids
   function random() {
    const min = 1;
    const max = 1000000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
    // minting
    const [mintTokenId, setMintTokenId] = useState('');
    const [mintBlueprint, setMintBlueprint] = useState('');
    const [mintTokenIdv2, setMintTokenIdv2] = useState('');
    const [mintBlueprintv2, setMintBlueprintv2] = useState('');

    // the minting function should be on your backend
    async function mint() {
      // initialise a client with the minter for your NFT smart contract
      const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/zgWQvQ8ya-dSrtnxKZYZuO-IWmoqc9hZ");
    console.log(provider)
      //const minterPrivateKey = process.env.REACT_APP_MINTER_PK ?? '';
      const minter = new ethers.Wallet("88d8da3d60d39c715581e31f37e387ca5d3fdfad6e1054af1eec9ea6e2e5e848").connect(provider);
      const publicApiUrl ="https://api.sandbox.x.immutable.com/v1" ?? '';
      const starkContractAddress = "0x7917eDb51ecD6CdB3F9854c3cc593F33de10c623" ?? '';
      const registrationContractAddress = "0x1C97Ada273C9A52253f463042f29117090Cd7D83" ?? '';
      const minterClient = await ImmutableXClient.build({
          publicApiUrl,
          signer: minter,
          starkContractAddress,
          registrationContractAddress,
      });
      console.log(minterClient)
      // mint any number of NFTs to specified wallet address (must be registered on Immutable X first)
      const token_address = "0xf6877fA137BE8Dc0874afe5A199a39D83D1e41D1" ?? ''; // contract registered by Immutable
      const result = await minterClient.mint({
          mints: [{
                  etherKey: "0x4CdEEa3f6e3555D07106910F0cf13e495eD0F0E3",
                  tokens: [{
                          type: MintableERC721TokenType.MINTABLE_ERC721,
                          data: {
                              id: mintTokenId,
                              blueprint: mintBlueprint,
                              tokenAddress: token_address.toLowerCase(),
                          }
                      }],
                  nonce: random().toString(10),
                  authSignature: ''
              }]
      });
      console.log(`Token minted: ${result.results[0].token_id}`);
    }
  console.log(client)

  const Clicked = async () => {
    await mint()
  };

  return (
    <ph.PageParamsProvider
      params={useRouter()?.query}
      query={useRouter()?.query}
    >
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
      <label>
          Token ID:
          <input type="text" value={mintTokenId} onChange={e => setMintTokenId(e.target.value)}/>
        </label>
        <label>
          Blueprint:
          <input type="text" value={mintBlueprint} onChange={e => setMintBlueprint(e.target.value)}/>
        </label>
        <button onClick = {Clicked}>Mint</button>
    </section>
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