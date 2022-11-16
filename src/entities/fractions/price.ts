import BN from 'bn.js';
import invariant from 'tiny-invariant';

import { BigNumberish, Rounding } from '../../constants';
import { Currency } from '../currency';
import { Fraction } from './fraction';
import { TokenAmount } from './tokenAmount';

export class Price<
  TBase extends Currency,
  TQuote extends Currency
> extends Fraction {
  public readonly baseCurrency: TBase; // input i.e. denominator
  public readonly quoteCurrency: TQuote; // output i.e. numerator
  public readonly scalar: Fraction; // used to adjust the raw fraction w/r/t the decimals of the {base,quote}Token

  /**
   * Construct a price, either with the base and quote currency amount, or the
   * @param args
   */
  public constructor(
    ...args:
      | [TBase, TQuote, BigNumberish, BigNumberish]
      | [
          {
            baseAmount: TokenAmount<TBase>;
            quoteAmount: TokenAmount<TQuote>;
          }
        ]
  ) {
    let baseCurrency: TBase,
      quoteCurrency: TQuote,
      denominator: BigNumberish,
      numerator: BigNumberish;

    if (args.length === 4) {
      [baseCurrency, quoteCurrency, denominator, numerator] = args;
    } else {
      const result = args[0].quoteAmount.divide(args[0].baseAmount);
      [baseCurrency, quoteCurrency, denominator, numerator] = [
        args[0].baseAmount.token,
        args[0].quoteAmount.token,
        result.denominator,
        result.numerator,
      ];
    }
    super(numerator, denominator);

    this.baseCurrency = baseCurrency;
    this.quoteCurrency = quoteCurrency;
    this.scalar = new Fraction(
      new BN(10).pow(new BN(baseCurrency.decimals)),
      new BN(10).pow(new BN(quoteCurrency.decimals))
    );
  }

  /**
   * Flip the price, switching the base and quote currency
   */
  public invert(): Price<TQuote, TBase> {
    return new Price(
      this.quoteCurrency,
      this.baseCurrency,
      this.numerator,
      this.denominator
    );
  }

  /**
   * Multiply the price by another price, returning a new price. The other price must have the same base currency as this price's quote currency
   * @param other the other price
   */
  public multiply<TOtherQuote extends Currency>(
    other: Price<TQuote, TOtherQuote>
  ): Price<TBase, TOtherQuote> {
    invariant(this.quoteCurrency.equals(other.baseCurrency), 'TOKEN');
    const fraction = super.multiply(other);
    return new Price(
      this.baseCurrency,
      other.quoteCurrency,
      fraction.denominator,
      fraction.numerator
    );
  }

  /**
   * Return the amount of quote currency corresponding to a given amount of the base currency
   * @param currencyAmount the amount of base currency to quote against the price
   */
  public quote(currencyAmount: TokenAmount<TBase>): TokenAmount<TQuote> {
    invariant(currencyAmount.token.equals(this.baseCurrency), 'TOKEN');
    const result = super.multiply(currencyAmount);
    return TokenAmount.fromFractionalAmount(
      this.quoteCurrency,
      result.numerator,
      result.denominator
    );
  }

  /**
   * Get the value scaled by decimals for formatting
   * @private
   */
  private get adjustedForDecimals(): Fraction {
    return super.multiply(this.scalar);
  }

  public toSignificant(
    significantDigits: number = 6,
    format?: object,
    rounding?: Rounding
  ): string {
    return this.adjustedForDecimals.toSignificant(
      significantDigits,
      format,
      rounding
    );
  }

  public toFixed(
    decimalPlaces: number = 4,
    format?: object,
    rounding?: Rounding
  ): string {
    return this.adjustedForDecimals.toFixed(decimalPlaces, format, rounding);
  }
}