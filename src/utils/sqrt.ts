import BN from 'bn.js';
import invariant from 'tiny-invariant';

export const MAX_SAFE_INTEGER = new BN(Number.MAX_SAFE_INTEGER);

const ZERO = new BN(0);
const ONE = new BN(1);
const TWO = new BN(2);

/**
 * Computes floor(sqrt(value))
 * @param value the value for which to compute the square root, rounded down
 */
export function sqrt(value: BN): BN {
  invariant(value.gte(ZERO), 'NEGATIVE');

  // rely on built in sqrt if possible
  if (value.lt(MAX_SAFE_INTEGER)) {
    return new BN(Math.floor(Math.sqrt(value.toNumber())));
  }

  let z: BN;
  let x: BN;
  z = value;
  x = value.div(TWO).add(ONE);
  while (x.lt(z)) {
    z = x;
    x = value
      .div(x)
      .add(x)
      .div(TWO);
  }
  return z;
}
