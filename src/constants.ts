import { BigNumberish as _bigNumberis } from 'starknet';
import { Chain, mainnet, sepolia } from '@starknet-react/chains';

export function isSupportedChainId(chain: Chain) {
  return [mainnet, sepolia].some(c => c.id === chain.id);
}

export declare type BigNumberish = _bigNumberis;

export const MaxUint256 = BigInt(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
);
