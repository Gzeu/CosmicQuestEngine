import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExtensionLoginButton, WalletConnectLoginButton } from '@multiversx/sdk-dapp/UI';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks/account/useGetAccount';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { CpuChipIcon, UserIcon, ShoppingBagIcon, ChartBarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const features = [
  { icon: CpuChipIcon, title: 'Mint Heroes', description: 'Create NFT heroes with 5 classes.', href: '/mint' },
  { icon: UserIcon, title: 'Complete Quests', description: 'Earn XP and level up.', href: '/quests' },
  { icon: ShoppingBagIcon, title: 'Marketplace', description: 'Trade heroes and items.', href: '/marketplace' },
  { icon: ChartBarIcon, title: 'Analytics', description: 'Track your progress.', href: '/stats' }
];

export default function Home() {
  const { address } = useGetAccount();
  const [connected, setConnected] = useState(false);
  const WC_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID || '';
  const isDemo = useMemo(() => !WC_ID, [WC_ID]);
  useEffect(() => setConnected(!!address), [address]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="cosmic-gradient">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-4xl md:text-5xl font-bold text-white">
                  CosmicQuest
                </motion.h1>
                {isDemo && (
                  <div className="flex items-center gap-2 bg-yellow-400 text-cosmic-900 px-3 py-1 rounded-md text-sm font-semibold">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    Demo Mode
                  </div>
                )}
              </div>

              <p className="text-blue-100 mt-4 max-w-2xl">
                Mint heroes, complete quests, and trade on MultiversX. This build runs in demo mode until keys are set.
              </p>

              <div className="mt-8">
                {!connected ? (
                  <div className="flex flex-wrap gap-4 items-center">
                    <ExtensionLoginButton loginButtonText="Connect xPortal Extension" className="bg-white text-cosmic-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium" />
                    {!isDemo && (
                      <WalletConnectLoginButton loginButtonText="Connect Mobile Wallet" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-cosmic-700 px-6 py-3 rounded-lg font-medium" />
                    )}
                    {isDemo && (
                      <span className="text-white/80 text-sm">Mobile Wallet disabled in demo mode</span>
                    )}
                  </div>
                ) : (
                  <Link href="/mint" className="inline-block bg-yellow-400 text-cosmic-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300">Start Playing →</Link>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.05 * i}}>
                  <Card className="h-full text-center group cursor-pointer" hover>
                    <Link href={connected ? f.href : '/'}>
                      <Icon className="h-10 w-10 text-cosmic-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{f.title}</h3>
                      <p className="text-gray-600 text-sm">{f.description}</p>
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
