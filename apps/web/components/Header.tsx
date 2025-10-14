import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks/account/useGetAccount';
import { logout } from '@multiversx/sdk-dapp/utils';
import { UserIcon, CpuChipIcon, ShoppingBagIcon, HomeIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Mint Hero', href: '/mint', icon: CpuChipIcon },
  { name: 'Quests', href: '/quests', icon: UserIcon },
  { name: 'Marketplace', href: '/marketplace', icon: ShoppingBagIcon },
];

export function Header() {
  const { address } = useGetAccount();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold cosmic-gradient bg-clip-text text-transparent">
              CosmicQuest
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-cosmic-100 text-cosmic-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center">
            {address ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/" className="text-sm text-cosmic-600 hover:text-cosmic-800">
                Connect Wallet
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
