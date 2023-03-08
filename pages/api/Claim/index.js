// PUT /api/publish/:id
// export default async function handle(req, res) {
//   const postId = req.query.tagUid
//   const post = await prisma.Post.update({
//     where: { id: postId },
//     data: { claimed: true },
//   })
//   res.json(post)
// }
 
// Claim Service 
const { deleteNftById, getNfts, updateNftById } = require('@/nftModel')
const  { ethers }=require( "ethers"); // from hardhat throws error "Can't resolve 'console'"

// import { ethers } from 'ethers';
const { Link, ImmutableXClient,MintableERC721TokenType} = require('@imtbl/imx-sdk');
const AppSetup = require("@appSetupServer") 

const handler = async (req, res) => {
  if (req.method === 'PUT') {
    try {
      console.log('yay PUT req to claim nft!')
      const tagUid = req.body.tagUid
      const owner = req.body.owner 
      const claimed = req.body.claimed
      const metadataUrl = req.body.metadataUrl
      const mintIdReference = Date.now();

      console.log(req.body,'req.body......')
      

          // try{ 
          //   console.log('minting web3 from server')
          //   await Mint(mintIdReference,owner,metadataUrl)
          // }catch(e){
          //   console.log(e)
          //   return  res.status(500).json({ error: error.message })
          // }

      const { nfts, error } = await updateNftById(tagUid, {update:{owner,claimed}})
      if (error) throw new Error(error)
      return res.status(200).json({ nfts })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  res.status(425).end(`Method ${req.method} is not allowed.`)

}

export default handler



async function Mint(mintIdReference,owner,metadataUrl) {
  // initialise a client with the minter for your NFT smart contract
  const provider = new ethers.providers.JsonRpcProvider(AppSetup.rpcProviderServer);
  const minter = new ethers.Wallet(AppSetup.minterPkServer).connect(provider);
  const minterClient = await ImmutableXClient.build({
      publicApiUrl:AppSetup.publicProviderUrlServer,
      signer: minter,
      starkContractAddress:AppSetup.starkContractAddressServer,
      registrationContractAddress:AppSetup.registrationContractAddressServer,
  });
  // mint any number of NFTs to specified wallet address (must be registered on Immutable X first)
  const token_address = "0xf6877fA137BE8Dc0874afe5A199a39D83D1e41D1"; // contract registered by Immutable
  const result = await minterClient.mint({
      mints: [{
              etherKey: owner&&owner ,  //current wallet in session
              tokens: [{
                      type: MintableERC721TokenType.MINTABLE_ERC721,
                      data: {
                      id: mintIdReference.toString(),  //this should come from the database instead
                      blueprint: metadataUrl,
                      tokenAddress: token_address.toLowerCase(),
                      }
                  }],
              nonce: (Math.floor(Math.random() * (1000000000 - 1 + 1)) + 1).toString(10),
              authSignature: ''
          }]
  });
  console.log(`Token minted: ${result.results[0].token_id}`);
  return 
}