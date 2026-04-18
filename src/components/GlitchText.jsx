import React from 'react';
import './GlitchText.css';

const GlitchText = ({ text, className = '' }) => {
    return (
        <div className={`glitch-wrapper ${className}`}>
            <h1
                className="font-cyber text-5xl md:text-7xl lg:text-8xl font-black text-neon drop-shadow-[0_0_15px_rgba(255,0,60,0.4)]"
            >
                {text}
            </h1>
        </div>
    );
};

export default GlitchText;
