import { BaseToken } from './baseToken';

/**
 * Represents the native token of the chain on which it resides, e.g. eth/stark
 */
export abstract class NativeToken extends BaseToken {
  public readonly isNative: true = true;
  public readonly isToken: false = false;
}
