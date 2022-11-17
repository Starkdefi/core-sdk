import invariant from 'tiny-invariant';
import { SupportedChainId } from '../constants';
import { Currency } from './currency';
import { NativeToken } from './nativeToken';
import { Token } from './token';
import { WETH } from './weth';

/**
 * Ether is the main usage of a 'native' token, i.e. for Ethereum mainnet and all testnets
 */
export class Ether extends NativeToken {
  protected constructor(chainId: SupportedChainId) {
    super(chainId, 18, 'ETH', 'Ether');
  }

  public get wrapped(): Token {
    const weth = WETH[this.chainId];
    invariant(!!weth, 'WRAPPED');
    return weth;
  }

  private static _etherCache: { [chainId: string]: Ether } = {};

  public static onChain(chainId: SupportedChainId): Ether {
    return (
      this._etherCache[chainId] ??
      (this._etherCache[chainId] = new Ether(chainId))
    );
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }
}
