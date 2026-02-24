import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageSquare, Trophy, Flame, Heart, ArrowUp, Gamepad2, Star, Zap, Shield } from 'lucide-react';

/* ── Mock Data ── */
const LEADERBOARD = [
  { rank: 1, name: 'PHANTOM_X', xp: 42850, avatar: '🟡', badge: 'Legend', wins: 312, streak: 28 },
  { rank: 2, name: 'NOVA_STRIKE', xp: 38720, avatar: '🔵', badge: 'Master', wins: 287, streak: 19 },
  { rank: 3, name: 'CIPHER_9', xp: 35100, avatar: '🟣', badge: 'Master', wins: 265, streak: 15 },
  { rank: 4, name: 'BLITZ_CORE', xp: 31400, avatar: '🔴', badge: 'Diamond', wins: 241, streak: 12 },
  { rank: 5, name: 'ZERO_DAY', xp: 28900, avatar: '🟢', badge: 'Diamond', wins: 220, streak: 9 },
  { rank: 6, name: 'VORTEX_7', xp: 25600, avatar: '⚪', badge: 'Platinum', wins: 198, streak: 7 },
];

const FEED_POSTS = [
  {
    id: 1,
    author: 'PHANTOM_X',
    avatar: '🟡',
    content: 'Just hit a 28-game win streak on ranked! Who wants to squad up tonight? 🔥',
    likes: 142,
    comments: 38,
    time: '2h ago',
    tag: 'Victory',
  },
  {
    id: 2,
    author: 'NOVA_STRIKE',
    avatar: '🔵',
    content: 'New Nexus Elite keyboard just arrived — the tactile feedback is insane. Full review dropping this weekend.',
    likes: 97,
    comments: 24,
    time: '4h ago',
    tag: 'Gear Review',
  },
  {
    id: 3,
    author: 'CIPHER_9',
    avatar: '🟣',
    content: 'Looking for duo partner for the upcoming Nexus Invitational. Diamond+ only. DM me.',
    likes: 63,
    comments: 45,
    time: '6h ago',
    tag: 'LFG',
  },
  {
    id: 4,
    author: 'BLITZ_CORE',
    avatar: '🔴',
    content: 'Dropped a 40-bomb in arena mode. Clip coming soon — you won\'t believe the final kill. 💀',
    likes: 210,
    comments: 67,
    time: '8h ago',
    tag: 'Highlight',
  },
];

const STATS = [
  { label: 'Active Players', value: '12.4K', icon: Users, color: 'text-yellow-400' },
  { label: 'Messages Today', value: '8.7K', icon: MessageSquare, color: 'text-blue-400' },
  { label: 'Tournaments', value: '24', icon: Trophy, color: 'text-pink-400' },
  { label: 'Win Streaks', value: '1.2K', icon: Flame, color: 'text-orange-400' },
];

/* ── Components ── */
const StatCard = ({ stat, index }: { stat: typeof STATS[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="glass rounded-2xl p-6 border border-white/5 hover:border-yellow-400/20 transition-all group"
  >
    <stat.icon className={`${stat.color} mb-3 group-hover:scale-110 transition-transform`} size={28} />
    <div className="text-3xl md:text-4xl font-black font-orbitron tracking-tighter">{stat.value}</div>
    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mt-1">{stat.label}</div>
  </motion.div>
);

const FeedPost = ({ post, index }: { post: typeof FEED_POSTS[0]; index: number }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const tagColors: Record<string, string> = {
    Victory: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    'Gear Review': 'bg-blue-400/10 text-blue-400 border-blue-400/20',
    LFG: 'bg-green-400/10 text-green-400 border-green-400/20',
    Highlight: 'bg-pink-400/10 text-pink-400 border-pink-400/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-2xl p-6 border border-white/5 hover:border-yellow-400/10 transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0">{post.avatar}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="font-black font-orbitron text-sm tracking-tight">{post.author}</span>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${tagColors[post.tag] || 'bg-white/5 text-gray-400 border-white/10'}`}>
              {post.tag}
            </span>
            <span className="text-gray-600 text-xs ml-auto flex-shrink-0">{post.time}</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">{post.content}</p>
          <div className="flex items-center gap-6">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${liked ? 'text-pink-400' : 'text-gray-600 hover:text-pink-400'}`}
            >
              <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
              {likeCount}
            </motion.button>
            <button className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-blue-400 transition-colors">
              <MessageSquare size={16} />
              {post.comments}
            </button>
            <button className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-yellow-400 transition-colors ml-auto">
              <ArrowUp size={16} />
              Boost
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LeaderboardRow = ({ player, index }: { player: typeof LEADERBOARD[0]; index: number }) => {
  const rankColors = ['text-yellow-400', 'text-blue-400', 'text-pink-400'];
  const rankBg = ['bg-yellow-400/10 border-yellow-400/20', 'bg-blue-400/10 border-blue-400/20', 'bg-pink-400/10 border-pink-400/20'];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.02, x: 4 }}
      className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${index < 3 ? rankBg[index] : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
    >
      <div className={`w-8 text-center font-black font-orbitron text-lg ${index < 3 ? rankColors[index] : 'text-gray-600'}`}>
        {player.rank}
      </div>
      <div className="text-2xl">{player.avatar}</div>
      <div className="flex-1 min-w-0">
        <div className="font-black font-orbitron text-sm tracking-tight truncate">{player.name}</div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500">{player.badge}</div>
      </div>
      <div className="text-right hidden sm:block">
        <div className="text-xs font-bold text-gray-500">{player.wins} W</div>
        <div className="flex items-center gap-1 text-orange-400 text-[10px] font-bold">
          <Flame size={10} /> {player.streak}
        </div>
      </div>
      <div className="text-right">
        <div className="font-black font-orbitron text-sm text-yellow-400">{player.xp.toLocaleString()}</div>
        <div className="text-[9px] font-bold uppercase tracking-wider text-gray-600">XP</div>
      </div>
    </motion.div>
  );
};

/* ── Main Page ── */
const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'leaderboard'>('feed');

  const tabs = [
    { id: 'feed' as const, label: 'Live Feed', icon: MessageSquare },
    { id: 'leaderboard' as const, label: 'Leaderboard', icon: Trophy },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Hero Header */}
      <header className="mb-12 md:mb-20 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-1.5 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
            {LEADERBOARD.length * 2}K+ Players Online
          </span>
        </motion.div>

        <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl font-black font-orbitron mb-4 tracking-tighter italic">
          THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-pink-400">GRID</span>
        </h1>
        <p className="text-gray-500 font-bold tracking-[0.2em] md:tracking-[0.5em] uppercase text-[10px] md:text-sm max-w-xl mx-auto">
          Connect · Compete · Dominate
        </p>
      </header>

      {/* Live Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-12 md:mb-20">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </section>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 md:mb-12">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 md:px-8 py-3 md:py-4 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider transition-all border ${activeTab === tab.id
                ? 'bg-yellow-400 text-black border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.25)]'
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
              }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'feed' ? (
          <motion.div
            key="feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10"
          >
            {/* Feed */}
            <div className="lg:col-span-3 space-y-4">
              <h2 className="text-xl md:text-2xl font-black font-orbitron tracking-tighter italic mb-4 flex items-center gap-3">
                <Zap size={20} className="text-yellow-400" /> Community Feed
              </h2>
              {FEED_POSTS.map((post, i) => (
                <FeedPost key={post.id} post={post} index={i} />
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trending Topics */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="text-sm font-black font-orbitron tracking-tight italic mb-4 flex items-center gap-2">
                  <Flame size={16} className="text-orange-400" /> Trending
                </h3>
                {['#NexusInvitational', '#GearReview', '#ProSetups', '#ClutchPlays', '#NewDrop'].map((tag, i) => (
                  <motion.button
                    key={tag}
                    whileHover={{ x: 4 }}
                    className="block w-full text-left py-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors font-medium border-b border-white/5 last:border-0"
                  >
                    {tag}
                    <span className="text-[10px] text-gray-600 ml-2">{Math.floor(Math.random() * 500 + 100)} posts</span>
                  </motion.button>
                ))}
              </div>

              {/* Quick Squads */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="text-sm font-black font-orbitron tracking-tight italic mb-4 flex items-center gap-2">
                  <Gamepad2 size={16} className="text-blue-400" /> Active Squads
                </h3>
                {[
                  { name: 'Night Ops', members: 4, game: 'Ranked Arena' },
                  { name: 'Zero Gravity', members: 3, game: 'Battle Royale' },
                  { name: 'Phantom Unit', members: 5, game: 'Tactical Ops' },
                ].map((squad, i) => (
                  <motion.div
                    key={squad.name}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 cursor-pointer group"
                  >
                    <div>
                      <div className="text-sm font-bold group-hover:text-yellow-400 transition-colors">{squad.name}</div>
                      <div className="text-[10px] text-gray-600">{squad.game}</div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold">
                      <Users size={12} /> {squad.members}/5
                    </div>
                  </motion.div>
                ))}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4 py-3 rounded-xl bg-blue-400/10 border border-blue-400/20 text-blue-400 text-xs font-bold uppercase tracking-wider hover:bg-blue-400/20 transition-all"
                >
                  Create Squad
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10">
              {/* Leaderboard List */}
              <div className="lg:col-span-3 space-y-3">
                <h2 className="text-xl md:text-2xl font-black font-orbitron tracking-tighter italic mb-4 flex items-center gap-3">
                  <Trophy size={20} className="text-yellow-400" /> Season Rankings
                </h2>
                {LEADERBOARD.map((player, i) => (
                  <LeaderboardRow key={player.name} player={player} index={i} />
                ))}
              </div>

              {/* Top Player Spotlight */}
              <div className="lg:col-span-2">
                <div className="glass rounded-3xl p-8 border border-yellow-400/20 shadow-[0_0_60px_rgba(250,204,21,0.08)] text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400" />
                  <div className="text-6xl mb-4">{LEADERBOARD[0].avatar}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400 mb-2">
                    <Star size={12} className="inline mr-1" /> #1 Player
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black font-orbitron tracking-tighter italic mb-2">
                    {LEADERBOARD[0].name}
                  </h3>
                  <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-wider text-yellow-400 mb-6">
                    {LEADERBOARD[0].badge}
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-white/5 rounded-xl p-3">
                      <div className="text-lg font-black font-orbitron text-yellow-400">{LEADERBOARD[0].xp.toLocaleString()}</div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-gray-600">Total XP</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <div className="text-lg font-black font-orbitron text-green-400">{LEADERBOARD[0].wins}</div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-gray-600">Wins</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <div className="text-lg font-black font-orbitron text-orange-400 flex items-center justify-center gap-1">
                        <Flame size={14} /> {LEADERBOARD[0].streak}
                      </div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-gray-600">Streak</div>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-6 py-3 rounded-xl bg-yellow-400 text-black text-xs font-black uppercase tracking-wider hover:bg-white transition-all"
                  >
                    <Shield size={14} className="inline mr-2" />
                    View Full Profile
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Banner */}
      <section className="mt-20 md:mt-32 p-8 md:p-16 rounded-[32px] md:rounded-[60px] bg-gradient-to-br from-yellow-400 via-blue-400 to-pink-500 relative overflow-hidden group shadow-[0_0_80px_rgba(250,204,21,0.15)]">
        <div className="relative z-10 text-black flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-orbitron tracking-tighter leading-none mb-4 italic">
              JOIN THE<br />NEXUS GRID
            </h2>
            <p className="text-black/70 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
              Create your profile, find your squad, and climb the ranks.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 md:px-14 py-4 md:py-6 bg-black text-yellow-400 font-black font-orbitron rounded-full shadow-2xl text-sm md:text-base hover:bg-white hover:text-black transition-all"
          >
            ENLIST NOW
          </motion.button>
        </div>
        <div className="absolute top-0 right-0 text-[16rem] font-black text-white/10 select-none -translate-y-1/4 font-orbitron italic pointer-events-none">
          GRID
        </div>
      </section>
    </div>
  );
};

export default Community;
