import React from 'react';
import './GlitchText.css';

const GlitchText = ({ text, className = '' }) => {
    return (
        <div className={`glitch-wrapper ${className}`}>
            <h1
                className="glitch font-cyber text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white to-cyan"
                data-text={text}
            >
                {text}
            </h1>
        </div>
    );
};

export default GlitchText;
