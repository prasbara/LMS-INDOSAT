import React from 'react';
import { motion } from 'motion/react';
import { Award, Lock, Star, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Badges: React.FC = () => {
  const { badges } = useApp();

  // Simulate earned badges (first 2 badges are earned)
  const earnedBadges = badges.slice(0, 2).map((b) => ({
    ...b,
    earnedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }));

  const lockedBadges = badges.slice(2);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-400 to-gray-600';
      case 'rare':
        return 'from-blue-400 to-blue-600';
      case 'epic':
        return 'from-purple-400 to-purple-600';
      case 'legendary':
        return 'from-[#FFC600] to-[#FF6B00]';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-400';
      case 'rare':
        return 'border-blue-400';
      case 'epic':
        return 'border-purple-400';
      case 'legendary':
        return 'border-[#FFC600]';
      default:
        return 'border-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Badges</h1>
          <p className="text-gray-600 mt-1">
            Earn badges by completing challenges and reaching milestones
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
          <Award className="text-[#DC1F2E]" size={20} />
          <span className="text-gray-700">{earnedBadges.length} / {badges.length} Earned</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-4 shadow-sm text-center"
        >
          <div className="text-3xl font-bold text-[#DC1F2E] mb-1">{earnedBadges.length}</div>
          <div className="text-sm text-gray-600">Earned</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 shadow-sm text-center"
        >
          <div className="text-3xl font-bold text-gray-400 mb-1">{lockedBadges.length}</div>
          <div className="text-sm text-gray-600">Locked</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-sm text-center"
        >
          <div className="text-3xl font-bold text-[#FFC600] mb-1">
            {earnedBadges.filter((b) => b.rarity === 'legendary').length}
          </div>
          <div className="text-sm text-gray-600">Legendary</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 shadow-sm text-center"
        >
          <div className="text-3xl font-bold text-purple-600 mb-1">
            {earnedBadges.filter((b) => b.rarity === 'epic').length}
          </div>
          <div className="text-sm text-gray-600">Epic</div>
        </motion.div>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Star className="text-[#FFC600]" size={24} />
            Earned Badges
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {earnedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`bg-white rounded-xl p-6 shadow-sm border-2 ${getRarityBorder(
                  badge.rarity
                )} hover:shadow-lg transition-all cursor-pointer`}
              >
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${getRarityColor(
                    badge.rarity
                  )} flex items-center justify-center text-4xl shadow-lg`}
                >
                  {badge.icon}
                </div>
                <h4 className="font-semibold text-gray-800 text-center mb-2">{badge.name}</h4>
                <p className="text-sm text-gray-600 text-center mb-3">{badge.description}</p>
                <div className="text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      badge.rarity === 'legendary'
                        ? 'bg-gradient-to-r from-[#FFC600] to-[#FF6B00] text-white'
                        : badge.rarity === 'epic'
                        ? 'bg-purple-100 text-purple-700'
                        : badge.rarity === 'rare'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {badge.rarity}
                  </span>
                </div>
                {badge.earnedAt && (
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Earned {new Date(badge.earnedAt).toLocaleDateString()}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Locked Badges */}
      {lockedBadges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Lock className="text-gray-400" size={24} />
            Locked Badges
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {lockedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200 opacity-60 hover:opacity-80 transition-all"
              >
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div
                    className={`w-full h-full rounded-full bg-gradient-to-br ${getRarityColor(
                      badge.rarity
                    )} flex items-center justify-center text-4xl shadow-lg grayscale`}
                  >
                    {badge.icon}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                    <Lock className="text-white" size={24} />
                  </div>
                </div>
                <h4 className="font-semibold text-gray-800 text-center mb-2">{badge.name}</h4>
                <p className="text-sm text-gray-600 text-center mb-3">{badge.description}</p>
                <div className="text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize bg-gray-100 text-gray-500`}
                  >
                    {badge.rarity}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Achievement Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-[#DC1F2E] to-[#FF6B00] rounded-xl p-6 text-white"
      >
        <div className="flex items-start gap-4">
          <Zap size={32} className="flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold mb-2">How to Earn More Badges</h3>
            <ul className="space-y-2 text-white/90">
              <li>• Complete courses and achieve high quiz scores</li>
              <li>• Maintain learning streaks by studying every day</li>
              <li>• Help other learners and participate in discussions</li>
              <li>• Achieve top rankings on the leaderboard</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
