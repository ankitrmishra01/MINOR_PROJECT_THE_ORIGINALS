import React from 'react';
import { motion } from 'framer-motion';

const BackgroundEffects = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* 1. Moving Grid Layer */}
            <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.2]">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#0891b2_1px,transparent_1px),linear-gradient(to_bottom,#0891b2_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]"
                />
            </div>

            {/* 2. Ambient Gradient Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 50, 0],
                    y: [0, 30, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px] mix-blend-screen"
            />

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                    x: [0, -30, 0],
                    y: [0, 50, 0]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-cyan-500/30 rounded-full blur-[100px] mix-blend-screen"
            />

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, 40, 0],
                    y: [0, -40, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"
            />

            {/* 3. Floating Particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-cyan-400/30 rounded-full"
                    style={{
                        width: Math.random() * 4 + 2 + 'px',
                        height: Math.random() * 4 + 2 + 'px',
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                    }}
                />
            ))}
        </div>
    );
};

export default BackgroundEffects;
