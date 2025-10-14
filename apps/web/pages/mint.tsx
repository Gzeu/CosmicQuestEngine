import { useState } from 'react';

export default function Mint() {
  const [cls, setCls] = useState('Warrior');
  const [status, setStatus] = useState('');

  async function onMint() {
    setStatus('Minting (mock)...');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('Mint reușit (mock). Integrarea cu SC urmează.');
  }

  return (
    <main className="p-10 space-y-4">
      <h2 className="text-2xl font-semibold">Mint Hero</h2>
      <select value={cls} onChange={e => setCls(e.target.value)} className="border px-2 py-1">
        {['Warrior','Mage','Ranger','Paladin','Rogue'].map(c => (<option key={c}>{c}</option>))}
      </select>
      <button onClick={onMint} className="px-4 py-2 bg-indigo-600 text-white rounded">Mint</button>
      {status && <p>{status}</p>}
    </main>
  );
}
