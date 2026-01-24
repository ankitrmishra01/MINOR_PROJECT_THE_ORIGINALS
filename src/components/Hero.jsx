import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import Typewriter from './Typewriter';
import MarketScreen from './MarketScreen';
import BSEBuilding from '../assets/bse-building.png';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background handled by BackgroundEffects.jsx */}
            <div className="absolute inset-0 z-0 pointer-events-none"></div>

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">

                <div className="text-left space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/30 dark:border-neon-cyan/30 bg-cyan-50 dark:bg-neon-cyan/10 text-cyan-600 dark:text-neon-cyan text-sm mb-6">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            <span>Next Gen Investing</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4 min-h-[160px] md:min-h-[220px]">
                            Your Wealth, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-neon-cyan dark:to-neon-blue text-glow block mt-2">
                                <Typewriter text="Powered by Intelligence" delay={50} />
                            </span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">
                            Experience the future of asset management with our AI-driven robo-advisory system. Real-time analysis, automated rebalancing, and personalized growth strategies.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <button className="glass-btn px-8 py-4 rounded-xl font-semibold text-cyan-900 dark:text-white flex items-center justify-center group">
                            Get Started
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 rounded-xl font-semibold text-gray-600 dark:text-gray-300 hover:text-cyan-900 dark:hover:text-white border border-transparent hover:border-cyan-900/20 dark:hover:border-white/20 transition-all">
                            View Demo
                        </button>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[500px] w-full flex items-center justify-center pointer-events-none"
                >
                    {/* 3D Building Image */}
                    <motion.img
                        src={BSEBuilding}
                        alt="Stock Exchange"
                        className="w-full max-w-md object-contain drop-shadow-2xl relative z-10"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Live Market Screen Overlay */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="absolute bottom-10 -right-4 md:right-10 z-20"
                    >
                        <MarketScreen />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
