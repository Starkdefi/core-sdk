// Mock for @starknet-react/chains
module.exports = {
  mainnet: {
    id: '0x534e5f4d41494e',
    name: 'Starknet Mainnet',
    network: 'mainnet',
    nativeCurrency: {
      address:
        '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://starknet-mainnet.public.blastapi.io'],
      },
      public: {
        http: ['https://starknet-mainnet.public.blastapi.io'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Starkscan',
        url: 'https://starkscan.co',
      },
    },
    testnet: false,
  },
  sepolia: {
    id: '0x534e5f5345504f4c4941',
    name: 'Starknet Sepolia Testnet',
    network: 'sepolia',
    nativeCurrency: {
      address:
        '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://starknet-sepolia.public.blastapi.io'],
      },
      public: {
        http: ['https://starknet-sepolia.public.blastapi.io'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Starkscan',
        url: 'https://sepolia.starkscan.co',
      },
    },
    testnet: true,
  },
  Chain: {},
  devnet: {
    id: '0x534e5f474f45524c49',
    name: 'Starknet Devnet',
    network: 'devnet',
    nativeCurrency: {
      address:
        '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['http://127.0.0.1:5050'],
      },
      public: {
        http: ['http://127.0.0.1:5050'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Starkscan',
        url: 'https://devnet.starkscan.co',
      },
    },
    testnet: true,
  },
  getSlotChain: () => null,
};
