import React, { useState, useEffect } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';

export default function DecryptedText({
    text,
    className = '',
    parentClassName = '',
    speed = 40,
    ...props
}) {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((letter, index) => {
                        // Keep spaces as spaces
                        if (letter === ' ') return ' ';
                        
                        if (index < iterations) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join('')
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }

            iterations += 1 / 2; // Adjust for smoother or longer animation
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return (
        <span className={parentClassName} {...props}>
            <span className={className}>
                {displayText}
            </span>
        </span>
    );
}
