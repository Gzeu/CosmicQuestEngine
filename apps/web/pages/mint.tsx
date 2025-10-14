import { useState } from 'react';
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
type HeroClass = typeof classes[number];

const classDescriptions: Record<HeroClass, { description: string; stats: string; color: string }> = {
  Warrior: { description: 'Melee fighter with high defense', stats: 'ATK: 8 | DEF: 9 | SPD: 6', color: 'bg-red-500' },
  Mage: { description: 'Magical damage dealer', stats: 'ATK: 9 | DEF: 5 | SPD: 7', color: 'bg-blue-500' },
  Ranger: { description: 'Ranged attacker with high speed', stats: 'ATK: 7 | DEF: 6 | SPD: 9', color: 'bg-green-500' },
  Paladin: { description: 'Tank with healing abilities', stats: 'ATK: 6 | DEF: 10 | SPD: 5', color: 'bg-yellow-500' },
  Rogue: { description: 'Stealthy assassin with critical hits', stats: 'ATK: 8 | DEF: 5 | SPD: 8', color: 'bg-purple-500' }
};

export default function Mint() {
  const { address } = useGetAccount();
  const [selectedClass, setSelectedClass] = useState<HeroClass>('Warrior');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  async function onMint() {
    if (!address) {
      setAlert({ type: 'error', message: 'Please connect your wallet first.' });
      return;
    }
    
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mint Your Hero</h1>
          <p className="text-lg text-gray-600">Choose your class and create a unique NFT hero to start your cosmic journey.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Class Selection */}
          <Card className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Select Hero Class</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {classes.map((cls) => {
                const info = classDescriptions[cls];
                const isSelected = selectedClass === cls;
                return (
                  <motion.div
                    key={cls}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedClass(cls)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-cosmic-500 bg-cosmic-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${info.color}`} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{cls}</h3>
                        <p className="text-sm text-gray-600">{info.description}</p>
                        <p className="text-sm text-gray-500 mt-1">{info.stats}</p>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-cosmic-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          {/* Preview & Mint */}
          <Card className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Hero Preview</h2>
            
            <div className="text-center py-8">
              <motion.div
                key={selectedClass}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-cosmic-400 to-cosmic-600 text-white text-4xl font-bold mb-4"
              >
                {selectedClass.charAt(0)}
              </motion.div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedClass} Hero</h3>
              <p className="text-gray-600 mb-1">{classDescriptions[selectedClass].description}</p>
              <p className="text-sm text-gray-500">{classDescriptions[selectedClass].stats}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onMint}
              disabled={loading || !address}
              className="w-full bg-cosmic-600 text-white py-4 rounded-lg font-semibold hover:bg-cosmic-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="border-white border-t-transparent" />
                  Minting...
                </>
              ) : (
                'Mint Hero NFT'
              )}
            </motion.button>

            {status && (
              <div className="text-center text-sm text-gray-600">
                {status}
              </div>
            )}
          </Card>
        </div>

        {/* Alert */}
        <AnimatePresence>
          {alert && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6"
            >
              <Alert 
                type={alert.type} 
                message={alert.message} 
                onClose={() => setAlert(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <Modal
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          title="Hero Minted Successfully! 🎉"
        >
          <div className="text-center py-4">
            <div className="text-6xl mb-4">🎭</div>
            <p className="text-gray-600 mb-4">
              Your {selectedClass} hero has been successfully minted!
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-cosmic-600 text-white px-6 py-2 rounded-lg hover:bg-cosmic-700"
            >
              Awesome!
            </button>
          </div>
        </Modal>
      </main>
    </div>
  );
}
