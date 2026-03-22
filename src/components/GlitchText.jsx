import React from 'react';
import './GlitchText.css';

const GlitchText = ({ text, className = '' }) => {
    return (
        <div className={`glitch-wrapper ${className}`}>
            <h1
                className="font-cyber text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-neon"
            >
                {text}
            </h1>
        </div>
    );
};

export default GlitchText;
