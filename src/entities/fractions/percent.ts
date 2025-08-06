import { BigNumberish } from '../../constants';
import { Fraction } from './fraction';

const ONE_HUNDRED = new Fraction(BigInt(100));

/**
 * Converts a fraction to a percent
 * @param fraction the fraction to convert
 */
function toPercent(fraction: Fraction): Percent {
  return new Percent(fraction.numerator, fraction.denominator);
}

export class Percent extends Fraction {
  /**
   * This boolean prevents a fraction from being interpreted as a Percent
   */
  public readonly isPercent = true as const;

  add(other: Fraction | BigNumberish): Percent {
    return toPercent(super.add(other));
  }

  subtract(other: Fraction | BigNumberish): Percent {
    return toPercent(super.subtract(other));
  }

  multiply(other: Fraction | BigNumberish): Percent {
    return toPercent(super.multiply(other));
  }

  divide(other: Fraction | BigNumberish): Percent {
    return toPercent(super.divide(other));
  }

  public toSignificant(
    significantDigits: number = 5,
  ): string {
    return super
      .multiply(ONE_HUNDRED)
      .toSignificant(significantDigits);
  }

  public toFixed(
    decimalPlaces: number = 2,
  ): string {
    return super.multiply(ONE_HUNDRED).toFixed(decimalPlaces);
  }
}
