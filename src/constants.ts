import { constants, BigNumberish as _bigNumberis } from 'starknet';

export function isSupportedChainId(
  chainId: string
): chainId is constants.StarknetChainId {
  return Object.values(constants.StarknetChainId).includes(chainId as constants.StarknetChainId);
}

export declare type BigNumberish = _bigNumberis;

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}

export const MaxUint256 = BigInt(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
);
