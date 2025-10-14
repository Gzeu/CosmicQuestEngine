import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { motion } from 'framer-motion';

export default function Stats() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Analytics</h1>
          <p className="text-lg text-gray-600">Track your cosmic journey progress and achievements.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        <Card className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-600">
            Advanced analytics with charts, leaderboards, and detailed progress tracking are coming in the next update!
          </p>
        </Card>
      </main>
    </div>
  );
}
