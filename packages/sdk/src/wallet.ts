import { Address, Balance } from '@multiversx/sdk-core';

export function getAddressBalance(addr: string) {
  const address = new Address(addr);
  // TODO: add provider call
  return Balance.zero();
}
