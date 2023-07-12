import invariant from 'tiny-invariant';
import { Currency } from './currency';
import { NativeToken } from './nativeToken';
import { Token } from './token';
import { ETH } from './weth';
import { constants } from 'starknet';

/**
 * Ether is the main usage of a 'native' token, i.e. for Ethereum mainnet and all testnets
 */
export class Ether extends NativeToken {
  protected constructor(chainId: constants.StarknetChainId) {
    super(chainId, 18, 'ETH', 'Ether');
  }

  public get wrapped(): Token {
    const eth = ETH[this.chainId];
    invariant(!!eth, 'WRAPPED');
    return eth;
  }

  private static _etherCache: { [chainId: string]: Ether } = {};

  public static onChain(chainId: constants.StarknetChainId): Ether {
    return (
      this._etherCache[chainId] ??
      (this._etherCache[chainId] = new Ether(chainId))
    );
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }
}
