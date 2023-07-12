import { BaseToken } from './baseToken';

/**
 * Represents the native token of the chain on which it resides, e.g. eth/stark
 */
export abstract class NativeToken extends BaseToken {
  public readonly isNative = true as const;
  public readonly isToken = false as const;
}
