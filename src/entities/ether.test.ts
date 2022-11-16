import { SupportedChainId } from '../constants';
import { Ether } from './ether';

describe('Ether', () => {
  it('static constructor uses cache', () => {
    expect(
      Ether.onChain(SupportedChainId.MAINNET) ===
        Ether.onChain(SupportedChainId.MAINNET)
    ).toEqual(true);
  });
  it('caches once per chain ID', () => {
    expect(
      Ether.onChain(SupportedChainId.MAINNET) !==
        Ether.onChain(SupportedChainId.GOERLI)
    ).toEqual(true);
  });
  it('#equals returns false for diff chains', () => {
    expect(
      Ether.onChain(SupportedChainId.MAINNET).equals(
        Ether.onChain(SupportedChainId.GOERLI)
      )
    ).toEqual(false);
  });
  it('#equals returns true for same chains', () => {
    expect(
      Ether.onChain(SupportedChainId.MAINNET).equals(
        Ether.onChain(SupportedChainId.MAINNET)
      )
    ).toEqual(true);
  });
});
