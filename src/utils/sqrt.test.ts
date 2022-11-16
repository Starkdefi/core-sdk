import BN from 'bn.js';
import { MaxUint256 } from '../constants';
import { sqrt } from './sqrt';

describe('#sqrt', () => {
  it('correct for 0-1000', () => {
    for (let i = 0; i < 1000; i++) {
      expect(sqrt(new BN(i)).eq(new BN(Math.floor(Math.sqrt(i))))).toBeTruthy();
    }
  });

  describe('correct for all even powers of 2', () => {
    for (let i = 0; i < 256; i++) {
      it(`2^${i * 2}`, () => {
        const root = new BN(2).pow(new BN(i));
        const rootSquared = root.mul(root);

        expect(sqrt(rootSquared).eq(root)).toBeTruthy();
      });
    }
  });

  it('correct for MaxUint256', () => {
    console.log(sqrt(MaxUint256))
    expect(sqrt(MaxUint256)).toEqual(
      new BN('340282366920938463463374607431768211455')
    );
  });
});
