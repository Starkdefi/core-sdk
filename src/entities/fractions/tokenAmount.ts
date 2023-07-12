import invariant from 'tiny-invariant';
import { Token } from '../token';
import { Fraction } from './fraction';
import _Big from 'big.js';
import toFormat from 'toformat';
import { BigNumberish, Rounding, MaxUint256 } from '../../constants';
import { Currency } from '../currency';

const Big = toFormat(_Big);

export class TokenAmount<T extends Currency> extends Fraction {
  public readonly token: T;
  public readonly decimalScale: bigint;

  /**
   * Returns a new token amount instance from the unitless amount of token, i.e. the raw amount
   * @param token the token in the amount
   * @param rawAmount the raw token or ether amount
   */
  public static fromRawAmount<T extends Currency>(
    token: T,
    rawAmount: BigNumberish
  ): TokenAmount<T> {
    return new TokenAmount(token, rawAmount);
  }

  /**
   * Construct a token amount with a denominator that is not equal to 1
   * @param token the token
   * @param numerator the numerator of the fractional token amount
   * @param denominator the denominator of the fractional token amount
   */
  public static fromFractionalAmount<T extends Currency>(
    token: T,
    numerator: BigNumberish,
    denominator: BigNumberish
  ): TokenAmount<T> {
    return new TokenAmount(token, numerator, denominator);
  }

  protected constructor(
    token: T,
    numerator: BigNumberish,
    denominator?: BigNumberish
  ) {
    super(numerator, denominator);
    invariant(this.quotient <= MaxUint256, 'AMOUNT');
    this.token = token;
    this.decimalScale = BigInt(10 ** token.decimals);
  }

  public add(other: TokenAmount<T>): TokenAmount<T> {
    invariant(this.token.equals(other.token), 'CURRENCY');
    const added = super.add(other);
    return TokenAmount.fromFractionalAmount(
      this.token,
      added.numerator,
      added.denominator
    );
  }

  public subtract(other: TokenAmount<T>): TokenAmount<T> {
    invariant(this.token.equals(other.token), 'CURRENCY');
    const subtracted = super.subtract(other);
    return TokenAmount.fromFractionalAmount(
      this.token,
      subtracted.numerator,
      subtracted.denominator
    );
  }

  public multiply(other: Fraction | BigNumberish): TokenAmount<T> {
    const multiplied = super.multiply(other);
    return TokenAmount.fromFractionalAmount(
      this.token,
      multiplied.numerator,
      multiplied.denominator
    );
  }

  public divide(other: Fraction | BigNumberish): TokenAmount<T> {
    const divided = super.divide(other);
    return TokenAmount.fromFractionalAmount(
      this.token,
      divided.numerator,
      divided.denominator
    );
  }

  public toSignificant(
    significantDigits: number = 6,
    format?: object,
    rounding: Rounding = Rounding.ROUND_DOWN
  ): string {
    return super
      .divide(this.decimalScale)
      .toSignificant(significantDigits, format, rounding);
  }

  public toFixed(
    decimalPlaces: number = this.token.decimals,
    format?: object,
    rounding: Rounding = Rounding.ROUND_DOWN
  ): string {
    invariant(decimalPlaces <= this.token.decimals, 'DECIMALS');
    return super
      .divide(this.decimalScale)
      .toFixed(decimalPlaces, format, rounding);
  }

  public toExact(format: object = { groupSeparator: '' }): string {
    Big.DP = this.token.decimals;
    return new Big(this.quotient.toString())
      .div(this.decimalScale.toString())
      .toFormat(format);
  }

  public get wrapped(): TokenAmount<Token> {
    if (this.token.isToken) return this as TokenAmount<Token>;
    return TokenAmount.fromFractionalAmount(
      this.token.wrapped,
      this.numerator,
      this.denominator
    );
  }
}
