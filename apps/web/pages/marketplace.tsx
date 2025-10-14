import { useMemo, useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';

const mockItems = [
  { tokenId: 101, price: '1.0 EGLD', class: 'Warrior' },
  { tokenId: 102, price: '1.2 EGLD', class: 'Mage' },
  { tokenId: 103, price: '0.8 EGLD', class: 'Rogue' },
];

export default function Marketplace() {
  const [filter, setFilter] = useState('All');
  const items = useMemo(() => filter==='All'?mockItems:mockItems.filter(i=>i.class===filter), [filter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="border px-3 py-2 rounded">
            {['All','Warrior','Mage','Rogue'].map(o=> <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(i => (
            <Card key={i.tokenId}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Token #{i.tokenId}</div>
                  <div className="text-sm text-gray-600">Class: {i.class}</div>
                </div>
                <div className="text-cosmic-700 font-semibold">{i.price}</div>
              </div>
              <button className="mt-4 w-full px-4 py-2 bg-emerald-700 text-white rounded">{(process.env.NEXT_PUBLIC_HERO_SC||'').trim()? 'Buy' : 'Demo Buy'}</button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
