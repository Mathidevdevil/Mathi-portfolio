import React from 'react';

const Background = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Base Background Color */}
            <div className="absolute inset-0 bg-gray-50 dark:bg-[#050505] transition-colors duration-300" />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
                style={{
                    backgroundImage: `linear-gradient(#00f3ff 1px, transparent 1px), linear-gradient(90deg, #00f3ff 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Radial Glow - Static */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(0, 243, 255, 0.05) 0%, transparent 50%)'
                }}
            />

            {/* Top Light Accent */}
            <div
                className="absolute top-0 left-0 right-0 h-[500px] opacity-20 dark:opacity-10"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0, 243, 255, 0.2), transparent)'
                }}
            />
        </div>
    );
};

export default Background;
