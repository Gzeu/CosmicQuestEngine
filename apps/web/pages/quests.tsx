import { useMemo } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';

const quests = [
  { id: 1, name: 'Slay 3 goblins', xp: 10 },
  { id: 2, name: 'Find the lost ring', xp: 15 },
  { id: 3, name: 'Escort the caravan', xp: 20 }
];

export default function Quests() {
  const questSc = (process.env.NEXT_PUBLIC_QUEST_SC || '').trim();
  const isDemo = useMemo(() => !questSc, [questSc]);

  async function complete(id: number) {
    if (isDemo) return alert('Demo mode: set NEXT_PUBLIC_QUEST_SC to enable quest completion.');
    // TODO: call real completeQuest wrapper
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Quests</h1>
        <div className="grid grid-cols-1 gap-4">
          {quests.map(q => (
            <Card key={q.id} className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{q.name}</div>
                <div className="text-sm text-gray-600">Reward: {q.xp} XP</div>
              </div>
              <button onClick={() => complete(q.id)} className="px-4 py-2 bg-slate-700 text-white rounded">{isDemo ? 'Demo Complete' : 'Complete'}</button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
