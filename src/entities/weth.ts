import { constants } from 'starknet';
import { Token } from './token';

/**
 * Known Starknet ETH implementation addresses
 */
export const ETH: { [chainId: string]: Token } = {
  [constants.StarknetChainId.SN_MAIN]: new Token(
    constants.StarknetChainId.SN_MAIN,
    '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    18,
    'ETH',
    'Ether'
  ),
  [constants.StarknetChainId.SN_GOERLI]: new Token(
    constants.StarknetChainId.SN_GOERLI,
    '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    18,
    'ETH',
    'Ether'
  )
};
