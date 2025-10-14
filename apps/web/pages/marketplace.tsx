const items = [
  { tokenId: 101, price: '1.0 EGLD' },
  { tokenId: 102, price: '1.2 EGLD' }
];

export default function Marketplace() {
  async function buy(tokenId: number) {
    // TODO: call marketplace SC
    alert(`Cumpărat token ${tokenId} (mock)`);
  }
  return (
    <main className="p-10 space-y-4">
      <h2 className="text-2xl font-semibold">Marketplace</h2>
      <ul className="space-y-2">
        {items.map(i => (
          <li key={i.tokenId} className="flex items-center justify-between border p-3 rounded">
            <span>Token #{i.tokenId} — {i.price}</span>
            <button onClick={() => buy(i.tokenId)} className="px-3 py-1 bg-emerald-700 text-white rounded">Buy</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
