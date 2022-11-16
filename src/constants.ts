import BN from 'bn.js';

export enum SupportedChainId {
  MAINNET = '0x534e5f4d41494e',
  GOERLI = '0x534e5f474f45524c49',
}

export function isSupportedChainId(
  chainId: string
): chainId is SupportedChainId {
  return Object.values(SupportedChainId).includes(chainId as SupportedChainId);
}

export declare type BigNumberish = string | number | BN;

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}

export const MaxUint256 = new BN(
  'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  16
);
