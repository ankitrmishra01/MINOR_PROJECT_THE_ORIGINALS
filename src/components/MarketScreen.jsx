import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const MarketScreen = () => {
    const [price, setPrice] = useState(24560.85);
    const [change, setChange] = useState(125.40);

    // Simulate live price updates
    useEffect(() => {
        const interval = setInterval(() => {
            const delta = (Math.random() - 0.4) * 15; // Random fluctuation
            setPrice(p => p + delta);
            setChange(c => c + delta);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Mock chart path data - creates a simple line chart feel
    const chartPath = "M0,50 Q20,40 40,60 T80,30 T120,50 T160,20 T200,40";

    return (
        <div className="bg-white dark:bg-fintech-card rounded-xl shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden w-64 md:w-72">
            {/* Header */}
            <div className="bg-gray-50 dark:bg-white/5 p-3 flex justify-between items-center border-b border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">LIVE MARKET</span>
                </div>
                <Activity className="w-4 h-4 text-cyan-500" />
            </div>

            {/* Main Content */}
            <div className="p-4">
                <div className="mb-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">NIFTY 50</div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {price.toFixed(2)}
                        </span>
                        <div className={`flex items-center text-xs font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                            {Math.abs(change).toFixed(2)} ({change >= 0 ? '+' : '-'}{(Math.abs(change) / price * 100).toFixed(2)}%)
                        </div>
                    </div>
                </div>

                {/* Animated Chart */}
                <div className="h-24 relative bg-gray-50 dark:bg-white/5 rounded-lg overflow-hidden flex items-end px-0">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 200 80" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <motion.path
                            d={`M0,80 L0,50 Q20,40 40,60 T80,30 T120,50 T160,20 T200,40 L200,80 Z`}
                            fill="url(#chartGradient)"
                            initial={{ d: "M0,80 L0,80 L200,80 L200,80 Z" }}
                            animate={{ d: "M0,80 L0,50 Q20,40 40,60 T80,30 T120,50 T160,20 T200,40 L200,80 Z" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        <motion.path
                            d={chartPath}
                            fill="none"
                            stroke="#06b6d4"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                    </svg>
                </div>

                {/* Bottom stats */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
                    <div>
                        <div className="text-[10px] text-gray-400">Vol</div>
                        <div className="text-xs font-semibold dark:text-gray-300">2.4M</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-400 text-right">High</div>
                        <div className="text-xs font-semibold dark:text-gray-300 text-right">24,610</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketScreen;
