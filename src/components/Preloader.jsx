import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState('INITIALIZING');

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.floor(Math.random() * 5) + 1;
                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return next;
            });
        }, 50);

        const textInterval = setInterval(() => {
            const texts = ['INITIALIZING', 'LOADING', 'CONNECTING...'];
            setText(texts[Math.floor(Math.random() * texts.length)]);
        }, 800);

        return () => {
            clearInterval(interval);
            clearInterval(textInterval);
        };
    }, []);

    useEffect(() => {
        if (progress === 100) {
            setTimeout(() => {
                onComplete();
            }, 500);
        }
    }, [progress, onComplete]);

    return (
        <div className="preloader-container">
            <div className="loader-content">
                <div className="cyber-glitch" data-text={text}>{text}</div>
                <div className="progress-bar-wrapper">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="progress-text">{progress}%</div>
            </div>
            {/* Background Grid/Effect */}
            <div className="grid-background"></div>
        </div>
    );
};

export default Preloader;
