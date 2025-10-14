import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ExtensionLoginButton, WalletConnectLoginButton, LedgerLoginButton } from '@multiversx/sdk-dapp/UI';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks/account/useGetAccount';

export default function Home() {
  const { address } = useGetAccount();
  const [connected, setConnected] = useState(false);
  useEffect(() => setConnected(!!address), [address]);

  return (
    <main className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">CosmicQuestEngine</h1>
      <p>🚀 MVP: Connect Wallet → Mint Hero → Complete Quest</p>

      {!connected ? (
        <div className="flex gap-3">
          <ExtensionLoginButton loginButtonText="xPortal Extension" />
          <WalletConnectLoginButton loginButtonText="xPortal Mobile" />
          <LedgerLoginButton loginButtonText="Ledger" />
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-green-600">Wallet conectat: {address}</p>
          <div className="flex gap-3">
            <Link href="/mint" className="px-4 py-2 bg-indigo-600 text-white rounded">Mint Hero</Link>
            <Link href="/quests" className="px-4 py-2 bg-slate-700 text-white rounded">Quests</Link>
            <Link href="/marketplace" className="px-4 py-2 bg-emerald-700 text-white rounded">Marketplace</Link>
          </div>
        </div>
      )}
    </main>
  );
}
