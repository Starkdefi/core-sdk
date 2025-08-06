import { TokenAmount, Ether, Percent, Price, Token } from '../entities';
import { computePriceImpact } from './computePriceImpact';
import { mainnet } from '@starknet-react/chains';

describe('#computePriceImpact', () => {
  const ADDRESS_ZERO =
    '0x0000000000000000000000000000000000000000000000000000000000000000';
  const ADDRESS_ONE =
    '0x0000000000000000000000000000000000000000000000000000000000000001';

  const t0 = new Token(mainnet, ADDRESS_ZERO, 18);
  const t1 = new Token(mainnet, ADDRESS_ONE, 18);

  it('is correct for zero', () => {
    expect(
      computePriceImpact(
        new Price(
          Ether.onChain(mainnet),
          t0,
          10,
          100
        ),
        TokenAmount.fromRawAmount(
          Ether.onChain(mainnet),
          10
        ),
        TokenAmount.fromRawAmount(t0, 100)
      ).equalTo(new Percent(0, 10000))
    ).toBeTruthy();
  });
  it('is correct for half output', () => {
    expect(
      computePriceImpact(
        new Price(t0, t1, 10, 100),
        TokenAmount.fromRawAmount(t0, 10),
        TokenAmount.fromRawAmount(t1, 50)
      ).equalTo(new Percent(5000, 10000))
    ).toBeTruthy();
  });
  it('is negative for more output', () => {
    expect(
      computePriceImpact(
        new Price(t0, t1, 10, 100),
        TokenAmount.fromRawAmount(t0, 10),
        TokenAmount.fromRawAmount(t1, 200)
      ).equalTo(new Percent(-10000, 10000))
    ).toBeTruthy();
  });
});
