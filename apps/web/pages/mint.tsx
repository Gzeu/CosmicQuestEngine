import { useGetAccount } from '@multiversx/sdk-dapp/hooks/account/useGetAccount';
import { signTransactions } from '@multiversx/sdk-dapp/services/transactions/sendTransactions';
import { mintHero } from '@cqe/sdk';
import { useState } from 'react';

const classes = ['Warrior','Mage','Ranger','Paladin','Rogue'] as const;

export default function Mint() {
  const { address } = useGetAccount();
  const [cls, setCls] = useState<typeof classes[number]>('Warrior');
  const [status, setStatus] = useState('');

  async function onMint() {
    if (!address) { setStatus('Conectează wallet.'); return; }
    try {
      setStatus('Pregătesc tranzacția...');
      const tx = await mintHero(address, cls);
      const { sessionId } = await signTransactions({ transactions: [tx] });
      setStatus(`Tranzacție trimisă. Session: ${sessionId}`);
    } catch (e: any) {
      setStatus(`Eroare: ${e.message}`);
    }
  }

  return (
    <main className="p-10 space-y-4">
      <h2 className="text-2xl font-semibold">Mint Hero</h2>
      <select value={cls} onChange={e => setCls(e.target.value as any)} className="border px-2 py-1">
        {classes.map(c => (<option key={c}>{c}</option>))}
      </select>
      <button onClick={onMint} className="px-4 py-2 bg-indigo-600 text-white rounded">Mint</button>
      {status && <p>{status}</p>}
    </main>
  );
}
