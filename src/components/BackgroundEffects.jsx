import React from 'react';
import { motion } from 'framer-motion';

const BackgroundEffects = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* 1. Moving Grid Layer */}
            {/* We'll use a mask to fade out the grid at the edges for a smoother look */}
            <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.2]">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#0891b2_1px,transparent_1px),linear-gradient(to_bottom,#0891b2_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
                    style={{
                        // Optional: Add a subtle movement animation via CSS if desired, 
                        // but a static perspective-like grid often looks better for modern tech sites.
                    }}
                />
            </div>
        </div>
    );
};

export default BackgroundEffects;
