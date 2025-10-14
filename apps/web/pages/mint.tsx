import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks/account/useGetAccount';
import { signTransactions } from '@multiversx/sdk-dapp/services/transactions/sendTransactions';
import { mintHero } from '@cqe/sdk';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Alert } from '../components/Alert';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Modal } from '../components/Modal';

const classes = ['Warrior','Mage','Ranger','Paladin','Rogue'] as const;

export default function Mint() {
  const { address } = useGetAccount();
  const [selectedClass, setSelectedClass] = useState<(typeof classes)[number]>('Warrior');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const heroSc = (process.env.NEXT_PUBLIC_HERO_SC || '').trim();
  const isDemo = useMemo(() => !heroSc, [heroSc]);

  async function onMint() {
    if (!address) return setAlert({ type: 'error', message: 'Please connect your wallet first.' });
    if (isDemo) return setAlert({ type: 'info', message: 'Demo mode: set NEXT_PUBLIC_HERO_SC to enable mint transactions.' });

    setLoading(true);
    setAlert(null);
    try {
      setStatus('Preparing transaction...');
      const tx = await mintHero(address, selectedClass);
      setStatus('Please sign the transaction in your wallet...');
      const { sessionId } = await signTransactions({ transactions: [tx] });
      setStatus('');
      setAlert({ type: 'success', message: `Transaction sent! Session: ${sessionId}` });
      setShowSuccess(true);
    } catch (e: any) {
      setAlert({ type: 'error', message: `Error: ${e.message}` });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mint Your Hero</h1>
          <p className="text-gray-600">{isDemo ? 'Demo mode active — transactions are disabled.' : 'Choose your class and mint on-chain.'}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Select Hero Class</h2>
            <div className="grid grid-cols-1 gap-3">
              {classes.map((cls) => (
                <button key={cls} onClick={() => setSelectedClass(cls)} className={`text-left p-4 border-2 rounded-lg transition-all ${selectedClass===cls?'border-cosmic-500 bg-cosmic-50':'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-cosmic-500" />
                    <div>
                      <div className="font-semibold">{cls}</div>
                      <div className="text-sm text-gray-600">Balanced starter build</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Hero Preview</h2>
            <div className="text-center py-8">
              <motion.div key={selectedClass} initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-cosmic-400 to-cosmic-600 text-white text-4xl font-bold mb-4">
                {selectedClass.charAt(0)}
              </motion.div>
              <div className="text-gray-600">Mint a {selectedClass} to begin your journey.</div>
            </div>
            <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={onMint} disabled={loading || !address} className="w-full bg-cosmic-600 text-white py-4 rounded-lg font-semibold hover:bg-cosmic-700 disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? (<><LoadingSpinner size="sm" className="border-white border-t-transparent" /> Minting...</>) : 'Mint Hero NFT'}
            </motion.button>
            <AnimatePresence>
              {alert && (
                <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
                  <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </main>

      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)} title="Hero Minted Successfully! 🎉">
        <div className="text-center py-4">
          <div className="text-6xl mb-4">🎭</div>
          <p className="text-gray-600 mb-4">Your {selectedClass} hero has been minted (transaction sent)!</p>
          <button onClick={() => setShowSuccess(false)} className="bg-cosmic-600 text-white px-6 py-2 rounded-lg hover:bg-cosmic-700">Awesome!</button>
        </div>
      </Modal>
    </div>
  );
}
