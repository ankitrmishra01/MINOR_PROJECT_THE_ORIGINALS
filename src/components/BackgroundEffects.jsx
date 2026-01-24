import React, { useEffect, useState, useRef } from 'react';

const BackgroundEffects = () => {
    const [columns, setColumns] = useState(0);
    const [rows, setRows] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const calculateGrid = () => {
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current;
                const size = 50; // tile size in px
                setColumns(Math.ceil(clientWidth / size));
                setRows(Math.ceil(clientHeight / size));
            }
        };

        calculateGrid();
        window.addEventListener('resize', calculateGrid);
        return () => window.removeEventListener('resize', calculateGrid);
    }, []);

    const tiles = Array.from({ length: columns * rows });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 overflow-hidden bg-gray-50 dark:bg-fintech-bg pointer-events-none"
        >
            <div
                className="grid h-full w-full"
                style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                }}
            >
                {tiles.map((_, i) => (
                    <div
                        key={i}
                        className="relative border-[0.5px] border-gray-200/50 dark:border-white/5 transition-colors duration-500 hover:duration-0 hover:bg-cyan-500/20 dark:hover:bg-neon-cyan/20 pointer-events-auto"
                    />
                ))}
            </div>

            {/* Ambient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50/80 via-transparent to-gray-50/80 dark:from-fintech-bg/80 dark:via-transparent dark:to-fintech-bg/80 pointer-events-none" />
        </div>
    );
};

export default BackgroundEffects;
