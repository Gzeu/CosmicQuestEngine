import { useGetAccount } from '@multiversx/sdk-dapp/hooks/account/useGetAccount';
import { signTransactions } from '@multiversx/sdk-dapp/services/transactions/sendTransactions';
import { completeQuest } from '@cqe/sdk';

const quests = [
  { id: 1, name: 'Slay 3 goblins', xp: 10 },
  { id: 2, name: 'Find the lost ring', xp: 15 },
  { id: 3, name: 'Escort the caravan', xp: 20 }
];

export default function Quests() {
  const { address } = useGetAccount();

  async function complete(id: number) {
    if (!address) return alert('Conectează wallet.');
    try {
      const tx = await completeQuest(address, 1, id); // heroId=1 demo
      const { sessionId } = await signTransactions({ transactions: [tx] });
      alert(`Tranzacție trimisă. Session: ${sessionId}`);
    } catch (e: any) {
      alert(`Eroare: ${e.message}`);
    }
  }
  return (
    <main className="p-10 space-y-4">
      <h2 className="text-2xl font-semibold">Quests</h2>
      <ul className="space-y-2">
        {quests.map(q => (
          <li key={q.id} className="flex items-center justify-between border p-3 rounded">
            <span>{q.name} — {q.xp} XP</span>
            <button onClick={() => complete(q.id)} className="px-3 py-1 bg-slate-700 text-white rounded">Complete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
