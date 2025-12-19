import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Crown, TrendingUp, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Leaderboard: React.FC = () => {
  const { leaderboard, currentUser } = useApp();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-[#FFC600]" size={24} />;
      case 2:
        return <Medal className="text-gray-400" size={24} />;
      case 3:
        return <Medal className="text-orange-600" size={24} />;
      default:
        return <span className="text-gray-600 font-bold">{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-[#FFC600] to-[#FF6B00]';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Leaderboard</h1>
          <p className="text-gray-600 mt-1">See how you rank among other DSE professionals</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
          <Trophy className="text-[#DC1F2E]" size={20} />
          <span className="text-gray-700">Monthly Rankings</span>
        </div>
      </div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-4"
      >
        {/* 2nd Place */}
        {leaderboard[1] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="order-1"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={leaderboard[1].avatar}
                  alt={leaderboard[1].name}
                  className="w-20 h-20 rounded-full border-4 border-gray-300 mx-auto"
                />
                <div className="absolute -bottom-2 -right-2 bg-gray-300 rounded-full p-2">
                  <Medal className="text-gray-600" size={20} />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{leaderboard[1].name}</h3>
              <p className="text-2xl font-bold text-[#DC1F2E] mb-2">{leaderboard[1].points}</p>
              <p className="text-sm text-gray-600">points</p>
            </div>
          </motion.div>
        )}

        {/* 1st Place */}
        {leaderboard[0] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="order-2 -mt-4"
          >
            <div className="bg-gradient-to-br from-[#FFC600] to-[#FF6B00] rounded-xl p-6 shadow-xl text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={leaderboard[0].avatar}
                  alt={leaderboard[0].name}
                  className="w-24 h-24 rounded-full border-4 border-white mx-auto"
                />
                <div className="absolute -top-2 -right-2 bg-white rounded-full p-2">
                  <Crown className="text-[#FFC600]" size={24} />
                </div>
              </div>
              <h3 className="font-semibold text-white mb-1">{leaderboard[0].name}</h3>
              <p className="text-3xl font-bold text-white mb-2">{leaderboard[0].points}</p>
              <p className="text-sm text-white/90">points</p>
            </div>
          </motion.div>
        )}

        {/* 3rd Place */}
        {leaderboard[2] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="order-3"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={leaderboard[2].avatar}
                  alt={leaderboard[2].name}
                  className="w-20 h-20 rounded-full border-4 border-orange-300 mx-auto"
                />
                <div className="absolute -bottom-2 -right-2 bg-orange-500 rounded-full p-2">
                  <Medal className="text-white" size={20} />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{leaderboard[2].name}</h3>
              <p className="text-2xl font-bold text-[#DC1F2E] mb-2">{leaderboard[2].points}</p>
              <p className="text-sm text-gray-600">points</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Full Rankings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">All Rankings</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {leaderboard.map((entry, index) => {
            const isCurrentUser = entry.userId === currentUser?.id;
            return (
              <motion.div
                key={entry.userId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  isCurrentUser ? 'bg-red-50 border-l-4 border-[#DC1F2E]' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    {getRankIcon(entry.rank)}
                  </div>

                  {/* Avatar */}
                  <img
                    src={entry.avatar}
                    alt={entry.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-200"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-800 truncate">{entry.name}</h4>
                      {isCurrentUser && (
                        <span className="text-xs bg-[#DC1F2E] text-white px-2 py-1 rounded">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span>{entry.coursesCompleted} courses</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Award size={14} />
                        {entry.badges} badges
                      </span>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#DC1F2E]">{entry.points}</div>
                    <div className="text-xs text-gray-600">points</div>
                  </div>

                  {/* Trend */}
                  <div className="hidden sm:block">
                    <TrendingUp className="text-green-500" size={20} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm text-center"
        >
          <Trophy className="mx-auto text-[#FFC600] mb-3" size={32} />
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {leaderboard.findIndex((e) => e.userId === currentUser?.id) + 1}
          </div>
          <div className="text-sm text-gray-600">Your Rank</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl p-6 shadow-sm text-center"
        >
          <TrendingUp className="mx-auto text-green-500 mb-3" size={32} />
          <div className="text-2xl font-bold text-gray-800 mb-1">+5</div>
          <div className="text-sm text-gray-600">Rank Change</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl p-6 shadow-sm text-center"
        >
          <Award className="mx-auto text-[#DC1F2E] mb-3" size={32} />
          <div className="text-2xl font-bold text-gray-800 mb-1">250</div>
          <div className="text-sm text-gray-600">Points to Next Rank</div>
        </motion.div>
      </div>
    </div>
  );
};
