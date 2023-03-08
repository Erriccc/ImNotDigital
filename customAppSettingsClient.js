'use strict'

    const webRoute = process.env.NEXT_PUBLIC_WEB_URL
    const claimApiEndpoint = `/api/Claim`;
    const deleteApiEndpoint = `/api/EditNfts`;
    const publicProviderUrl =process.env.NEXT_PUBLIC_SANDBOX_ENV_URL;
    const rpcProviderClient = process.env.NEXT_PUBLIC_RPC_PROVIDER_ENV_URL;
    const LinkUrlClient =process.env.NEXT_PUBLIC_SANDBOX_LINK_URL;
    const starkContractAddressClient = process.env.NEXT_PUBLIC_SANDBOX_STARK_CONTRACT_ADDRESS;
    const registrationContractAddressClient = process.env.NEXT_PUBLIC_SANDBOX_REGISTRATION_ADDRESS;

 
module.exports = {
    webRoute,
    claimApiEndpoint,
    deleteApiEndpoint,
    publicProviderUrl,
    LinkUrlClient,
    starkContractAddressClient,
    registrationContractAddressClient,
    rpcProviderClient
    
};