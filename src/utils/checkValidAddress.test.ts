import { checkValidAddress } from './checkValidAddress';

describe('#checkValidAddress', () => {
  it('returns same address if valid', () => {
    expect(
      checkValidAddress(
        '0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9'
      )
    ).toEqual(
      '0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9'
    );
  });

  it('throws if length < 64', () => {
    expect(() =>
      checkValidAddress(
        '0x03e85bfb8e2a42b7bead9e88e9a1b19dbccf66147106180729212046543'
      )
    ).toThrow('Invalid Address Format');
  });

  it('throws if length > 64', () => {
    expect(() =>
      checkValidAddress(
        '0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9A'
      )
    ).toThrow('Invalid Address Format');
  });

  it('throws if it does not start with 0x', () => {
    expect(() =>
      checkValidAddress(
        '03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396543'
      )
    ).toThrow('Invalid Address Format');
  });

  it('throws if it is not a HEX string', () => {
    expect(() =>
      checkValidAddress(
        '0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf66147106180729212046239654x'
      )
    ).toThrow('Invalid Address Format');
  });
});
