'use strict'

    const webRouteServer = process.env.WEB_URL
    const claimApiEndpointServer = `/api/Claim`;
    const delteApiEndpointServer = `/api/EditNfts`;
    const publicProviderUrlServer =process.env.SANDBOX_ENV_URL;
    const LinkUrlServer =process.env.SANDBOX_LINK_URL;
    const rpcProviderServer = process.env.RPC_PROVIDER_ENV_URL;
    const starkContractAddressServer = process.env.SANDBOX_STARK_CONTRACT_ADDRESS;
    const registrationContractAddressServer = process.env.SANDBOX_REGISTRATION_ADDRESS;
    const minterPkServer = process.env.MINTER_PK;
 
module.exports = {
    webRouteServer,
    claimApiEndpointServer,
    delteApiEndpointServer,
    publicProviderUrlServer,
    starkContractAddressServer,
    registrationContractAddressServer,
    minterPkServer,
    rpcProviderServer,
    LinkUrlServer
    
};