import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExtensionLoginButton, WalletConnectLoginButton, LedgerLoginButton } from '@multiversx/sdk-dapp/UI';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks/account/useGetAccount';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { CpuChipIcon, UserIcon, ShoppingBagIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: CpuChipIcon,
    title: 'Mint Heroes',
    description: 'Create unique NFT heroes with 5 different classes and upgrade them.',
    href: '/mint'
  },
  {
    icon: UserIcon,
    title: 'Complete Quests',
    description: 'Embark on adventures and earn XP to level up your heroes.',
    href: '/quests'
  },
  {
    icon: ShoppingBagIcon,
    title: 'Marketplace',
    description: 'Trade heroes and items with other players in the ecosystem.',
    href: '/marketplace'
  },
  {
    icon: ChartBarIcon,
    title: 'Analytics',
    description: 'Track your progress and view detailed statistics.',
    href: '/stats'
  }
];

export default function Home() {
  const { address } = useGetAccount();
  const [connected, setConnected] = useState(false);
  useEffect(() => setConnected(!!address), [address]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="cosmic-gradient">
            <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Welcome to <span className="text-yellow-300">CosmicQuest</span>
                </h1>
                <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                  The ultimate blockchain gaming platform where you mint heroes, complete quests, 
                  and build your cosmic legend on MultiversX.
                </p>
                
                {!connected ? (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <ExtensionLoginButton 
                      loginButtonText="Connect xPortal Extension" 
                      className="bg-white text-cosmic-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium"
                    />
                    <WalletConnectLoginButton 
                      loginButtonText="Connect Mobile Wallet" 
                      className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-cosmic-700 px-6 py-3 rounded-lg font-medium"
                    />
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 inline-block"
                  >
                    <p className="text-white mb-4">🎉 Wallet connected! Ready to start your cosmic journey?</p>
                    <Link 
                      href="/mint" 
                      className="bg-yellow-400 text-cosmic-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                    >
                      Start Playing →
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Game Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore the cosmic universe with these powerful features designed for the ultimate gaming experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className="h-full text-center group cursor-pointer" hover>
                      <Link href={connected ? feature.href : '/'}>
                        <Icon className="h-12 w-12 text-cosmic-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </Link>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-cosmic-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            >
              <div>
                <div className="text-4xl font-bold text-yellow-400 mb-2">1,234</div>
                <div className="text-cosmic-200">Heroes Minted</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-400 mb-2">5,678</div>
                <div className="text-cosmic-200">Quests Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-400 mb-2">890</div>
                <div className="text-cosmic-200">Active Players</div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
