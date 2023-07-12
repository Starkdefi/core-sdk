import { constants } from 'starknet';
import { Ether } from './ether';

describe('Ether', () => {
  it('static constructor uses cache', () => {
    expect(
      Ether.onChain(constants.StarknetChainId.SN_MAIN) ===
        Ether.onChain(constants.StarknetChainId.SN_MAIN)
    ).toEqual(true);
  });
  it('caches once per chain ID', () => {
    expect(
      Ether.onChain(constants.StarknetChainId.SN_MAIN) !==
        Ether.onChain(constants.StarknetChainId.SN_GOERLI)
    ).toEqual(true);
  });
  it('#equals returns false for diff chains', () => {
    expect(
      Ether.onChain(constants.StarknetChainId.SN_MAIN).equals(
        Ether.onChain(constants.StarknetChainId.SN_GOERLI2)
      )
    ).toEqual(false);
  });
  it('#equals returns true for same chains', () => {
    expect(
      Ether.onChain(constants.StarknetChainId.SN_MAIN).equals(
        Ether.onChain(constants.StarknetChainId.SN_MAIN)
      )
    ).toEqual(true);
  });
});
