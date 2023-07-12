import { MaxUint256 } from '../constants';
import { sqrt } from './sqrt';

describe('#sqrt', () => {
  it('correct for 0-1000', () => {
    for (let i = 0; i < 1000; i++) {
      expect(sqrt(BigInt(i)) === BigInt(Math.floor(Math.sqrt(i)))).toBeTruthy();
    }
  });

  describe('correct for all even powers of 2', () => {
    for (let i = 0; i < 256; i++) {
      it(`2^${i * 2}`, () => {
        const root = BigInt(2 ** i);
        const rootSquared = root * root;

        expect(sqrt(rootSquared) === root).toBeTruthy();
      });
    }
  });

  it('correct for MaxUint256', () => {
    expect(sqrt(MaxUint256)).toEqual(
      BigInt('340282366920938463463374607431768211455')
    );
  });
});
