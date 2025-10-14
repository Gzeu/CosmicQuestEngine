import { Header } from '../components/Header';
import { Card } from '../components/Card';

export default function Stats() {
  const wc = (process.env.NEXT_PUBLIC_WC_PROJECT_ID || '').trim();
  const hero = (process.env.NEXT_PUBLIC_HERO_SC || '').trim();
  const quest = (process.env.NEXT_PUBLIC_QUEST_SC || '').trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Environment</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <div className="text-3xl font-bold text-cosmic-600 mb-2">0</div>
            <div className="text-gray-600">Heroes Owned</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">0</div>
            <div className="text-gray-600">Quests Completed</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
            <div className="text-gray-600">Total XP</div>
          </Card>
        </div>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Contracts & Env Status</h2>
          <ul className="space-y-2 text-sm">
            <li><strong>WalletConnect Project ID:</strong> {wc ? 'SET' : 'NOT SET (demo mode)'} </li>
            <li><strong>Hero Contract (NEXT_PUBLIC_HERO_SC):</strong> {hero || 'NOT SET'} </li>
            <li><strong>Quest Contract (NEXT_PUBLIC_QUEST_SC):</strong> {quest || 'NOT SET'} </li>
          </ul>
          <p className="text-gray-600 mt-3">Set these in Vercel → Project Settings → Environment Variables, then redeploy.</p>
        </Card>
      </main>
    </div>
  );
}
