import { mainnet, sepolia } from '@starknet-react/chains';
import { Ether } from './ether';

describe('Ether', () => {
  // it('static constructor uses cache', () => {
  //   expect(
  //     Ether.onChain(constants.StarknetChainId.SN_MAIN) ===
  //       Ether.onChain(constants.StarknetChainId.SN_MAIN)
  //   ).toEqual(true);
  // });
  it('static constructor uses cache', () => {
    const etherMain = Ether.onChain(mainnet);
    expect(
      Number.isNaN(etherMain)
        ? false
        : etherMain === Ether.onChain(mainnet)
    ).toEqual(true);
  });
  it('caches once per chain ID', () => {
    expect(
      Ether.onChain(mainnet) !==
        Ether.onChain(sepolia)
    ).toEqual(true);
  });
  it('#equals returns false for diff chains', () => {
    expect(
      Ether.onChain(mainnet).equals(
        Ether.onChain(sepolia)
      )
    ).toEqual(false);
  });
  it('#equals returns true for same chains', () => {
    expect(
      Ether.onChain(mainnet).equals(
        Ether.onChain(mainnet)
      )
    ).toEqual(true);
  });
});
