import { ApiNetworkProvider } from '@multiversx/sdk-network-providers';
import { Address, Balance, TokenTransfer, Transaction, TransactionPayload } from '@multiversx/sdk-core';

const DEFAULT_API = process.env.NEXT_PUBLIC_MVX_API || 'https://testnet-api.multiversx.com';
export const provider = new ApiNetworkProvider(DEFAULT_API);

export async function getAddressBalance(addr: string) {
  const address = new Address(addr);
  const account = await provider.getAccount(address);
  return Balance.fromString(account.balance.toString());
}

export type TxOptions = {
  receiver: string;
  data?: string;
  value?: string; // in EGLD (e.g. '0.01')
  gasLimit?: number;
};

export async function sendTransaction(sender: string, opts: TxOptions) {
  const senderAddr = new Address(sender);
  const receiverAddr = new Address(opts.receiver);

  const payload = opts.data ? new TransactionPayload(opts.data) : new TransactionPayload();
  const value = opts.value ? TokenTransfer.egldFromAmount(opts.value) : TokenTransfer.egldFromAmount('0');

  const { nonce } = await provider.getAccount(senderAddr);

  const tx = new Transaction({
    nonce,
    sender: senderAddr,
    receiver: receiverAddr,
    value: value.toTokenPayment(),
    gasLimit: opts.gasLimit ?? 10_000_000,
    data: payload,
    chainID: 'T',
  });

  // NOTE: semnarea se face în dApp, aici doar returnăm payload-ul de semnat
  return tx;
}
