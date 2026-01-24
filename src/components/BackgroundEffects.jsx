import React, { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const BackgroundEffects = () => {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);
    const { theme } = useTheme();

    useEffect(() => {
        const handleMouseMove = ({ clientX, clientY }) => {
            mouseX.set(clientX);
            mouseY.set(clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Define color values based on theme
    const isDark = theme === 'dark';

    // Light mode: Darker Cyan (Cyan-700 equivalent) for visibility
    // Dark mode: Light Cyan (Cyan-400 equivalent) for glow
    const spotlightColor = isDark ? 'rgba(34, 211, 238, 0.15)' : 'rgba(8, 145, 178, 0.15)';
    const ambientColor = isDark ? 'rgba(34, 211, 238, 0.05)' : 'rgba(8, 145, 178, 0.05)';

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
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
                    opacity: 1,
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
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
              ${ambientColor},
              transparent 40%
            )
          `,
                }}
            />
        </div>
    );
};

export default BackgroundEffects;
