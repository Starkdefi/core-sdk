import invariant from 'tiny-invariant';

import { BigNumberish } from '../../constants';

export class Fraction {
  public readonly numerator: bigint;
  public readonly denominator: bigint;

  public constructor(
    numerator: BigNumberish,
    denominator: BigNumberish = BigInt(1)
  ) {
    this.numerator = BigInt(numerator);
    this.denominator = BigInt(denominator);
  }

  private static tryParseFraction(
    fractionish: BigNumberish | Fraction
  ): Fraction {
    if (
      typeof fractionish === 'bigint' ||
      typeof fractionish === 'number' ||
      typeof fractionish === 'string'
    )
      return new Fraction(fractionish);

    if ('numerator' in fractionish && 'denominator' in fractionish)
      return fractionish;
    throw new Error('Could not parse fraction');
  }

  // performs floor division
  public get quotient(): bigint {
    return this.numerator / this.denominator;
  }

  // remainder after floor division
  public get remainder(): Fraction {
    return new Fraction(this.numerator % this.denominator, this.denominator);
  }

  public invert(): Fraction {
    return new Fraction(this.denominator, this.numerator);
  }

  public add(other: Fraction | BigNumberish): Fraction {
    const otherParsed = Fraction.tryParseFraction(other);
    if (this.denominator === otherParsed.denominator) {
      return new Fraction(
        this.numerator + otherParsed.numerator,
        this.denominator
      );
    }
    return new Fraction(
      this.numerator * otherParsed.denominator +
        otherParsed.numerator * this.denominator,
      this.denominator * otherParsed.denominator
    );
  }

  public subtract(other: Fraction | BigNumberish): Fraction {
    const otherParsed = Fraction.tryParseFraction(other);
    if (this.denominator === otherParsed.denominator) {
      return new Fraction(
        this.numerator - otherParsed.numerator,
        this.denominator
      );
    }
    return new Fraction(
      this.numerator * otherParsed.denominator -
        otherParsed.numerator * this.denominator,
      this.denominator * otherParsed.denominator
    );
  }

  public lessThan(other: Fraction | BigNumberish): boolean {
    const otherParsed = Fraction.tryParseFraction(other);
    return (
      this.numerator * otherParsed.denominator <
      otherParsed.numerator * this.denominator
    );
  }

  public equalTo(other: Fraction | BigNumberish): boolean {
    const otherParsed = Fraction.tryParseFraction(other);
    return (
      this.numerator * otherParsed.denominator ===
      otherParsed.numerator * this.denominator
    );
  }

  public greaterThan(other: Fraction | BigNumberish): boolean {
    const otherParsed = Fraction.tryParseFraction(other);
    return (
      this.numerator * otherParsed.denominator >
      otherParsed.numerator * this.denominator
    );
  }

  public multiply(other: Fraction | BigNumberish): Fraction {
    const otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(
      this.numerator * otherParsed.numerator,
      this.denominator * otherParsed.denominator
    );
  }

  public divide(other: Fraction | BigNumberish): Fraction {
    const otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(
      this.numerator * otherParsed.denominator,
      this.denominator * otherParsed.numerator
    );
  }

  public toSignificant(significantDigits: number): string {
    invariant(
      Number.isInteger(significantDigits),
      `${significantDigits} is not an integer.`
    );
    invariant(significantDigits > 0, `${significantDigits} is not positive.`);

    const quotient = Number(this.numerator) / Number(this.denominator);

    if (quotient === 0) return '0';

    // Calculate the magnitude of the number
    const magnitude = Math.floor(Math.log10(Math.abs(quotient)));

    // For numbers >= 1, round to maintain significant digits
    if (quotient >= 1) {
      const factor = Math.pow(10, significantDigits - magnitude - 1);
      const rounded = Math.floor(quotient * factor) / factor;
      return rounded.toString();
    }

    // For numbers < 1, handle decimal places more carefully
    const decimalPlaces = Math.max(0, significantDigits - magnitude - 1);
    let result = quotient.toFixed(decimalPlaces);

    // Remove trailing zeros after decimal point but keep significant figures
    if (result.includes('.')) {
      // Count significant digits in the result
      const digits = result.replace(/^0*\.?0*/, '').replace('.', '');
      if (digits.length > significantDigits) {
        // Truncate to significant digits
        const truncated = digits.substring(0, significantDigits);
        const leadingZeros = result.match(/^0*\.?(0*)/)?.[1]?.length || 0;
        result = '0.' + '0'.repeat(leadingZeros) + truncated;
      }
      // Remove trailing zeros
      result = result.replace(/0+$/, '').replace(/\.$/, '');
    }

    return result;
  }

  public toFixed(decimalPlaces: number): string {
    invariant(
      Number.isInteger(decimalPlaces),
      `${decimalPlaces} is not an integer.`
    );
    invariant(decimalPlaces >= 0, `${decimalPlaces} is negative.`);

    const quotient = Number(this.numerator) / Number(this.denominator);
    return quotient.toFixed(decimalPlaces);
  }

  /**
   * Helper method for converting any super class back to a fraction
   */
  public get asFraction(): Fraction {
    return new Fraction(this.numerator, this.denominator);
  }
}
