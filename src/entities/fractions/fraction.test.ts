import BN from 'bn.js';
import { Fraction } from './fraction';

describe('Fraction', () => {
  describe('#quotient', () => {
    it('floor division', () => {
      expect(new Fraction(new BN(8), new BN(3)).quotient).toEqual(new BN(2)); // one below
      expect(new Fraction(new BN(12), new BN(4)).quotient).toEqual(new BN(3)); // exact
      expect(new Fraction(new BN(16), new BN(5)).quotient).toEqual(new BN(3)); // one above
    });
  });
  describe('#remainder', () => {
    it('returns fraction after divison', () => {
      expect(new Fraction(new BN(8), new BN(3)).remainder).toEqual(
        new Fraction(new BN(2), new BN(3))
      );
      expect(new Fraction(new BN(12), new BN(4)).remainder).toEqual(
        new Fraction(new BN(0), new BN(4))
      );
      expect(new Fraction(new BN(16), new BN(5)).remainder).toEqual(
        new Fraction(new BN(1), new BN(5))
      );
    });
  });
  describe('#invert', () => {
    it('flips num and denom', () => {
      expect(new Fraction(new BN(5), new BN(10)).invert().numerator).toEqual(
        new BN(10)
      );
      expect(new Fraction(new BN(5), new BN(10)).invert().denominator).toEqual(
        new BN(5)
      );
    });
  });
  describe('#add', () => {
    it('multiples denoms and adds nums', () => {
      const sum = new Fraction(new BN(1), new BN(10)).add(
        new Fraction(new BN(4), new BN(12))
      );
      expect(sum.equalTo(new Fraction(new BN(52), new BN(120)))).toBeTruthy();
    });

    it('same denom', () => {
      expect(
        new Fraction(new BN(1), new BN(5)).add(
          new Fraction(new BN(2), new BN(5))
        )
      ).toEqual(new Fraction(new BN(3), new BN(5)));
    });
  });
  describe('#subtract', () => {
    it('multiples denoms and subtracts nums', () => {
      expect(
        new Fraction(new BN(1), new BN(10))
          .subtract(new Fraction(new BN(4), new BN(12)))
          .equalTo(new Fraction(new BN(-28), new BN(120)))
      ).toBeTruthy();
    });
    it('same denom', () => {
      expect(
        new Fraction(new BN(3), new BN(5)).subtract(
          new Fraction(new BN(2), new BN(5))
        )
      ).toEqual(new Fraction(new BN(1), new BN(5)));
    });
  });
  describe('#lessThan', () => {
    it('correct', () => {
      expect(
        new Fraction(new BN(1), new BN(10)).lessThan(
          new Fraction(new BN(4), new BN(12))
        )
      ).toBe(true);
      expect(
        new Fraction(new BN(1), new BN(3)).lessThan(
          new Fraction(new BN(4), new BN(12))
        )
      ).toBe(false);
      expect(
        new Fraction(new BN(5), new BN(12)).lessThan(
          new Fraction(new BN(4), new BN(12))
        )
      ).toBe(false);
    });
  });
  describe('#equalTo', () => {
    it('correct', () => {
      expect(
        new Fraction(new BN(1), new BN(10)).equalTo(
          new Fraction(new BN(4), new BN(12))
        )
      ).toBe(false);
      expect(
        new Fraction(new BN(1), new BN(3)).equalTo(
          new Fraction(new BN(4), new BN(12))
        )
      ).toBe(true);
      expect(
        new Fraction(new BN(5), new BN(12)).equalTo(
          new Fraction(new BN(4), new BN(12))
        )
      ).toBe(false);
    });
  });
  describe('#greaterThan', () => {
    it('correct', () => {
      expect(
        new Fraction(new BN(1), new BN(10)).greaterThan(
          new Fraction(new BN(4), new BN(12))
        )
      ).toBe(false);
      expect(
        new Fraction(new BN(1), new BN(3)).greaterThan(
          new Fraction(new BN(4), new BN(12))
        )
      ).toBe(false);
      expect(
        new Fraction(new BN(5), new BN(12)).greaterThan(
          new Fraction(new BN(4), new BN(12))
        )
      ).toBe(true);
    });
  });
  describe('#multiplty', () => {
    it('correct', () => {
      expect(
        new Fraction(new BN(1), new BN(10))
          .multiply(new Fraction(new BN(4), new BN(12)))
          .equalTo(new Fraction(new BN(4), new BN(120)))
      ).toBeTruthy();
      expect(
        new Fraction(new BN(1), new BN(3))
          .multiply(new Fraction(new BN(4), new BN(12)))
          .equalTo(new Fraction(new BN(4), new BN(36)))
      ).toBeTruthy();
      expect(
        new Fraction(new BN(5), new BN(12))
          .multiply(new Fraction(new BN(4), new BN(12)))
          .equalTo(new Fraction(new BN(20), new BN(144)))
      ).toBeTruthy();
    });
  });
  describe('#divide', () => {
    it('correct', () => {
      expect(
        new Fraction(new BN(1), new BN(10))
          .divide(new Fraction(new BN(4), new BN(12)))
          .equalTo(new Fraction(new BN(12), new BN(40)))
      ).toBeTruthy();
      expect(
        new Fraction(new BN(1), new BN(3))
          .divide(new Fraction(new BN(4), new BN(12)))
          .equalTo(new Fraction(new BN(12), new BN(12)))
      ).toBeTruthy();
      expect(
        new Fraction(new BN(5), new BN(12))
          .divide(new Fraction(new BN(4), new BN(12)))
          .equalTo(new Fraction(new BN(60), new BN(48)))
      ).toBeTruthy();
    });
  });
  describe('#asFraction', () => {
    it('returns an equivalent but not the same reference fraction', () => {
      const f = new Fraction(1, 2);
      expect(f.asFraction).toEqual(f);
      expect(f === f.asFraction).toEqual(false);
    });
  });
});
