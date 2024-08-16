import { constants } from 'starknet';
import { Token } from './index';

describe('Token', () => {
  const ADDRESS_ONE =
    '0x0000000000000000000000000000000000000000000000000000000000000001';
  const ADDRESS_TWO =
    '0x0000000000000000000000000000000000000000000000000000000000000002';

  describe('#constructor', () => {
    it('fails with invalid address', () => {
      expect(
        () =>
          new Token(
            constants.StarknetChainId.SN_SEPOLIA,
            '0xhello00000000000000000000000000000000000000000000000000000000002',
            18
          ).address
      ).toThrow();
    });
    it('fails with negative decimals', () => {
      expect(
        () =>
          new Token(constants.StarknetChainId.SN_SEPOLIA, ADDRESS_ONE, -1)
            .address
      ).toThrow('DECIMALS');
    });
    it('fails with 256 decimals', () => {
      expect(
        () =>
          new Token(constants.StarknetChainId.SN_SEPOLIA, ADDRESS_ONE, 256)
            .address
      ).toThrow('DECIMALS');
    });
    it('fails with non-integer decimals', () => {
      expect(
        () =>
          new Token(constants.StarknetChainId.SN_SEPOLIA, ADDRESS_ONE, 1.5)
            .address
      ).toThrow('DECIMALS');
    });
  });

  describe('#constructor with bypassChecksum = true', () => {
    const bypassChecksum = true;

    it('creates the token with a valid address', () => {
      expect(
        new Token(
          constants.StarknetChainId.SN_SEPOLIA,
          ADDRESS_TWO,
          18,
          undefined,
          undefined,
          bypassChecksum
        ).address
      ).toBe(ADDRESS_TWO);
    });
    it('fails with invalid address', () => {
      expect(
        () =>
          new Token(
            constants.StarknetChainId.SN_SEPOLIA,
            '0xhello00000000000000000000000000000000000000000000000000000000002',
            18,
            undefined,
            undefined,
            bypassChecksum
          ).address
      ).toThrow('Invalid Address Format');
    });
    it('fails with negative decimals', () => {
      expect(
        () =>
          new Token(
            constants.StarknetChainId.SN_SEPOLIA,
            ADDRESS_ONE,
            -1,
            undefined,
            undefined,
            bypassChecksum
          ).address
      ).toThrow('DECIMALS');
    });
    it('fails with 256 decimals', () => {
      expect(
        () =>
          new Token(
            constants.StarknetChainId.SN_SEPOLIA,
            ADDRESS_ONE,
            256,
            undefined,
            undefined,
            bypassChecksum
          ).address
      ).toThrow('DECIMALS');
    });
    it('fails with non-integer decimals', () => {
      expect(
        () =>
          new Token(
            constants.StarknetChainId.SN_SEPOLIA,
            ADDRESS_ONE,
            1.5,
            undefined,
            undefined,
            bypassChecksum
          ).address
      ).toThrow('DECIMALS');
    });
  });

  describe('#equals', () => {
    it('fails if address differs', () => {
      expect(
        new Token(constants.StarknetChainId.SN_SEPOLIA, ADDRESS_ONE, 18).equals(
          new Token(constants.StarknetChainId.SN_MAIN, ADDRESS_TWO, 18)
        )
      ).toBe(false);
    });

    it('false if chain id differs', () => {
      expect(
        new Token(constants.StarknetChainId.SN_SEPOLIA, ADDRESS_ONE, 18).equals(
          new Token(constants.StarknetChainId.SN_MAIN, ADDRESS_ONE, 18)
        )
      ).toBe(false);
    });

    it('true if only decimals differs', () => {
      expect(
        new Token(constants.StarknetChainId.SN_MAIN, ADDRESS_ONE, 9).equals(
          new Token(constants.StarknetChainId.SN_MAIN, ADDRESS_ONE, 18)
        )
      ).toBe(true);
    });

    it('true if address is the same', () => {
      expect(
        new Token(constants.StarknetChainId.SN_MAIN, ADDRESS_ONE, 18).equals(
          new Token(constants.StarknetChainId.SN_MAIN, ADDRESS_ONE, 18)
        )
      ).toBe(true);
    });

    it('true on reference equality', () => {
      const token = new Token(
        constants.StarknetChainId.SN_MAIN,
        ADDRESS_ONE,
        18
      );
      expect(token.equals(token)).toBe(true);
    });

    it('true even if name/symbol/decimals differ', () => {
      const tokenA = new Token(
        constants.StarknetChainId.SN_MAIN,
        ADDRESS_ONE,
        9,
        'abc',
        'def'
      );
      const tokenB = new Token(
        constants.StarknetChainId.SN_MAIN,
        ADDRESS_ONE,
        18,
        'ghi',
        'jkl'
      );
      expect(tokenA.equals(tokenB)).toBe(true);
    });
  });
});
