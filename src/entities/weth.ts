import { SupportedChainId } from '../constants'
import { Token } from './token'

/**
 * Known StarkNet ETH implementation addresses, used in our implementation of Ether#wrapped
 */
export const WETH: { [chainId: string]: Token } = {
  [SupportedChainId.MAINNET]: new Token(
    SupportedChainId.MAINNET,
    '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.GOERLI]: new Token(
    SupportedChainId.GOERLI,
    '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    18,
    'WETH',
    'Wrapped Ether'
  ),
}
