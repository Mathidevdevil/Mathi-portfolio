import React from 'react';
import './GlitchText.css';

const GlitchText = ({ text, className = '' }) => {
    return (
        <div className={`glitch-wrapper ${className}`}>
            <h1
                className="font-cyber text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-cyan dark:via-white dark:to-cyan"
            >
                {text}
            </h1>
        </div>
    );
};

export default GlitchText;
