'use strict'

    const webRouteServer = process.env.WEB_URL
    const claimApiEndpointServer = `/api/Claim`;
    const delteApiEndpointServer = `/api/EditNfts`;
    const publicProviderUrlServer =process.env.SANDBOX_ENV_URL;
    const starkContractAddressServer = process.env.SANDBOX_STARK_CONTRACT_ADDRESS;
    const registrationContractAddressServer = process.env.SANDBOX_REGISTRATION_ADDRESS;
    const minterPkServer = MINTER_PK;

module.exports = {
    webRouteServer,
    claimApiEndpointServer,
    delteApiEndpointServer,
    publicProviderUrlServer,
    starkContractAddressServer,
    registrationContractAddressServer,
    minterPkServer
    
};