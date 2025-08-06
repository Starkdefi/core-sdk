import invariant from 'tiny-invariant';
import { Currency } from './currency';
import { NativeToken } from './nativeToken';
import { Token } from './token';
import { Chain } from '@starknet-react/chains';
/**
 * Ether is the main usage of a 'native' token, i.e. for Ethereum mainnet and all testnets
 */
export class Ether extends NativeToken {
  protected constructor(chain: Chain) {
    const nativeCurrency = chain.nativeCurrency;
    super(chain, nativeCurrency.decimals, nativeCurrency.symbol, nativeCurrency.name);
  }

  public get wrapped(): Token {
    const eth = new Token(this.chain, this.chain.nativeCurrency.address, this.chain.nativeCurrency.decimals, this.chain.nativeCurrency.symbol, this.chain.nativeCurrency.name);
    invariant(!!eth, 'WRAPPED');
    return eth;
  }

  private static _etherCache: { [chain: string]: Ether } = {};

  public static onChain(chain: Chain): Ether {
    return (
      this._etherCache[chain.name] ??
      (this._etherCache[chain.name] = new Ether(chain))
    );
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chain === this.chain;
  }
}
