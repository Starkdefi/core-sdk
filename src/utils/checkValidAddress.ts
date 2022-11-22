export function checkValidAddress(address: string): string {
  if (/^0x[0-9a-fA-F]{63,64}$/.test(address)) {
    return address;
  }
  throw new Error('Invalid Address Format');
}
