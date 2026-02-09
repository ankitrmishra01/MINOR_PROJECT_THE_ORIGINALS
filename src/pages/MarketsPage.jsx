import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, Clock, Filter } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data Generators
const generateChartData = (points = 50) => {
    let data = [];
    let value = 1500;
    for (let i = 0; i < points; i++) {
        value = value + (Math.random() - 0.5) * 50;
        data.push({ time: `${i}:00`, value: Math.abs(value) });
    }
    return data;
};

const topGainers = [
    { id: 1, symbol: 'ADANIENT', name: 'Adani Enterprises', price: 2450.60, change: 5.4, volume: '12M' },
    { id: 2, symbol: 'TATASTEEL', name: 'Tata Steel', price: 145.20, change: 3.2, volume: '45M' },
    { id: 3, symbol: 'INFY', name: 'Infosys Ltd', price: 1650.00, change: 2.8, volume: '8M' },
];

const topLosers = [
    { id: 1, symbol: 'WIPRO', name: 'Wipro Ltd', price: 450.30, change: -2.1, volume: '5M' },
    { id: 2, symbol: 'ONGC', name: 'ONGC', price: 180.50, change: -1.5, volume: '18M' },
    { id: 3, symbol: 'ITC', name: 'ITC Ltd', price: 410.20, change: -0.8, volume: '22M' },
];

const MarketsPage = () => {
    const [selectedTab, setSelectedTab] = useState('overview');
    const [chartData, setChartData] = useState(generateChartData());

    // Simulate live chart updates
    useEffect(() => {
        const interval = setInterval(() => {
            setChartData(prev => {
                const lastValue = prev[prev.length - 1].value;
                const newValue = lastValue + (Math.random() - 0.5) * 30;
                return [...prev.slice(1), { time: 'Now', value: newValue }];
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Market Watch</h1>
                        <p className="text-gray-500 dark:text-gray-400">Live global market updates and stock analysis</p>
                    </div>
                </div>

                {/* Market Indices Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['NIFTY 50', 'SENSEX', 'BANK NIFTY'].map((index, i) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-fintech-card/50 backdrop-blur-xl"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-gray-500 dark:text-gray-400 font-medium">{index}</h3>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                        {(24000 + i * 5000).toLocaleString()}
                                    </div>
                                </div>
                                <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${i !== 2 ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                                    {i !== 2 ? '+0.8%' : '-0.4%'}
                                </div>
                            </div>
                            <div className="h-16">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id={`grad${i}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={i !== 2 ? "#10B981" : "#EF4444"} stopOpacity={0.2} />
                                                <stop offset="100%" stopColor={i !== 2 ? "#10B981" : "#EF4444"} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke={i !== 2 ? "#10B981" : "#EF4444"}
                                            strokeWidth={2}
                                            fill={`url(#grad${i})`}
                                            isAnimationActive={false}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Gainers/Losers Lists */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-panel rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden bg-white/50 dark:bg-fintech-card/50">
                            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex gap-6">
                                <button
                                    onClick={() => setSelectedTab('gainers')}
                                    className={`pb-2 text-sm font-semibold transition-colors border-b-2 ${selectedTab === 'gainers' || selectedTab === 'overview' ? 'text-cyan-600 dark:text-neon-cyan border-cyan-600 dark:border-neon-cyan' : 'text-gray-500 border-transparent hover:text-gray-700 dark:hover:text-gray-300'}`}
                                >
                                    Top Gainers
                                </button>
                                <button
                                    onClick={() => setSelectedTab('losers')}
                                    className={`pb-2 text-sm font-semibold transition-colors border-b-2 ${selectedTab === 'losers' ? 'text-cyan-600 dark:text-neon-cyan border-cyan-600 dark:border-neon-cyan' : 'text-gray-500 border-transparent hover:text-gray-700 dark:hover:text-gray-300'}`}
                                >
                                    Top Losers
                                </button>
                            </div>

                            <div className="p-4">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            <th className="pb-4">Company</th>
                                            <th className="pb-4 text-right">Price</th>
                                            <th className="pb-4 text-right">Change</th>
                                            <th className="pb-4 text-right hidden sm:table-cell">Volume</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                                        {(selectedTab === 'losers' ? topLosers : topGainers).map((stock) => (
                                            <tr key={stock.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                                                <td className="py-4">
                                                    <div>
                                                        <div className="font-bold text-gray-900 dark:text-white">{stock.symbol}</div>
                                                        <div className="text-xs text-gray-500">{stock.name}</div>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-right font-medium text-gray-900 dark:text-white">₹{stock.price.toFixed(2)}</td>
                                                <td className={`py-4 text-right font-bold ${stock.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                                    {stock.change > 0 ? '+' : ''}{stock.change}%
                                                </td>
                                                <td className="py-4 text-right text-gray-500 hidden sm:table-cell">{stock.volume}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Trending News or Mini Watchlist */}
                    <div className="space-y-6">
                        <div className="glass-panel p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-fintech-card/50">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-cyan-500" /> Market News
                            </h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <div className="text-xs text-gray-400 mb-1">2 hours ago</div>
                                        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors">
                                            RBI expected to hold rates steady in upcoming monetary policy meeting.
                                        </h4>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 py-2 text-sm text-cyan-600 dark:text-neon-cyan font-medium border border-cyan-600/30 dark:border-neon-cyan/30 rounded-lg hover:bg-cyan-50 dark:hover:bg-neon-cyan/10 transition-colors">
                                Read More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MarketsPage;
