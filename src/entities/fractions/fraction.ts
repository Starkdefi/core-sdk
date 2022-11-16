import BN from 'bn.js';
import invariant from 'tiny-invariant';
import _Decimal from 'decimal.js-light';
import _Big from 'big.js';
import toFormat from 'toformat';

import { BigNumberish, Rounding } from '../../constants';

const Decimal = toFormat(_Decimal);
const Big = toFormat(_Big);

const toSignificantRounding = {
  [Rounding.ROUND_DOWN]: Decimal.ROUND_DOWN,
  [Rounding.ROUND_HALF_UP]: Decimal.ROUND_HALF_UP,
  [Rounding.ROUND_UP]: Decimal.ROUND_UP,
};

const toFixedRounding = {
  [Rounding.ROUND_DOWN]: _Big.roundDown,
  [Rounding.ROUND_HALF_UP]: _Big.roundHalfUp,
  [Rounding.ROUND_UP]: _Big.roundUp,
};

export class Fraction {
  public readonly numerator: BN;
  public readonly denominator: BN;

  public constructor(
    numerator: BigNumberish,
    denominator: BigNumberish = new BN(1)
  ) {
    this.numerator = new BN(numerator);
    this.denominator = new BN(denominator);
  }

  private static tryParseFraction(
    fractionish: BigNumberish | Fraction
  ): Fraction {
    if (
      fractionish instanceof BN ||
      typeof fractionish === 'number' ||
      typeof fractionish === 'string'
    )
      return new Fraction(fractionish);

    if ('numerator' in fractionish && 'denominator' in fractionish)
      return fractionish;
    throw new Error('Could not parse fraction');
  }

  // performs floor division
  public get quotient(): BN {
    return this.numerator.div(this.denominator);
  }

  // remainder after floor division
  public get remainder(): Fraction {
    return new Fraction(this.numerator.mod(this.denominator), this.denominator);
  }

  public invert(): Fraction {
    return new Fraction(this.denominator, this.numerator);
  }

  public add(other: Fraction | BigNumberish): Fraction {
    const otherParsed = Fraction.tryParseFraction(other);
    if (this.denominator.eq(otherParsed.denominator)) {
      return new Fraction(
        this.numerator.add(otherParsed.numerator),
        this.denominator
      );
    }
    return new Fraction(
      this.numerator
        .mul(otherParsed.denominator)
        .add(otherParsed.numerator.mul(this.denominator)),
      this.denominator.mul(otherParsed.denominator)
    );
  }

  public subtract(other: Fraction | BigNumberish): Fraction {
    const otherParsed = Fraction.tryParseFraction(other);
    if (this.denominator.eq(otherParsed.denominator)) {
      return new Fraction(
        this.numerator.sub(otherParsed.numerator),
        this.denominator
      );
    }
    return new Fraction(
      this.numerator
        .mul(otherParsed.denominator)
        .sub(otherParsed.numerator.mul(this.denominator)),
      this.denominator.mul(otherParsed.denominator)
    );
  }

  public lessThan(other: Fraction | BigNumberish): boolean {
    const otherParsed = Fraction.tryParseFraction(other);
    return this.numerator
      .mul(otherParsed.denominator)
      .lt(otherParsed.numerator.mul(this.denominator));
  }

  public equalTo(other: Fraction | BigNumberish): boolean {
    const otherParsed = Fraction.tryParseFraction(other);
    return this.numerator
      .mul(otherParsed.denominator)
      .eq(otherParsed.numerator.mul(this.denominator));
  }

  public greaterThan(other: Fraction | BigNumberish): boolean {
    const otherParsed = Fraction.tryParseFraction(other);
    return this.numerator
      .mul(otherParsed.denominator)
      .gt(otherParsed.numerator.mul(this.denominator));
  }

  public multiply(other: Fraction | BigNumberish): Fraction {
    const otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(
      this.numerator.mul(otherParsed.numerator),
      this.denominator.mul(otherParsed.denominator)
    );
  }

  public divide(other: Fraction | BigNumberish): Fraction {
    const otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(
      this.numerator.mul(otherParsed.denominator),
      this.denominator.mul(otherParsed.numerator)
    );
  }

  public toSignificant(
    significantDigits: number,
    format: object = { groupSeparator: '' },
    rounding: Rounding = Rounding.ROUND_HALF_UP
  ): string {
    invariant(
      Number.isInteger(significantDigits),
      `${significantDigits} is not an integer.`
    );
    invariant(significantDigits > 0, `${significantDigits} is not positive.`);

    Decimal.set({
      precision: significantDigits + 1,
      rounding: toSignificantRounding[rounding],
    });
    const quotient = new Decimal(this.numerator.toString())
      .div(this.denominator.toString())
      .toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  }

  public toFixed(
    decimalPlaces: number,
    format: object = { groupSeparator: '' },
    rounding: Rounding = Rounding.ROUND_HALF_UP
  ): string {
    invariant(
      Number.isInteger(decimalPlaces),
      `${decimalPlaces} is not an integer.`
    );
    invariant(decimalPlaces >= 0, `${decimalPlaces} is negative.`);

    Big.DP = decimalPlaces;
    Big.RM = toFixedRounding[rounding];
    return new Big(this.numerator.toString())
      .div(this.denominator.toString())
      .toFormat(decimalPlaces, format);
  }

  /**
   * Helper method for converting any super class back to a fraction
   */
  public get asFraction(): Fraction {
    return new Fraction(this.numerator, this.denominator);
  }
}
