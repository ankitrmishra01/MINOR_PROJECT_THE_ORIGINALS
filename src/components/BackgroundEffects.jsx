import React, { useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

const BackgroundEffects = () => {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className="fixed inset-0 z-0 overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* 1. Base Grid Layer */}
            <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15]">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#0891b2_1px,transparent_1px),linear-gradient(to_bottom,#0891b2_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
                />
            </div>

            {/* 2. Mouse Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(34, 211, 238, 0.15),
              transparent 80%
            )
          `,
                }}
            />

            {/* 3. Global Ambient Spotlight (Always visible) */}
            <motion.div
                className="pointer-events-none absolute inset-0 transition duration-300"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(34, 211, 238, 0.05),
              transparent 40%
            )
          `,
                }}
            />

            {/* 4. Animated Pulse Lines (Simulating Data Flow) */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Horizontal Pulse */}
                <motion.div
                    className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
                    animate={{
                        top: ['0%', '100%'],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 8,
                        ease: "linear",
                        repeat: Infinity,
                        repeatDelay: 2
                    }}
                />

                {/* Vertical Pulse */}
                <motion.div
                    className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
                    animate={{
                        left: ['0%', '100%'],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 12,
                        ease: "linear",
                        repeat: Infinity,
                        repeatDelay: 0
                    }}
                />
            </div>
        </div>
    );
};

export default BackgroundEffects;
