import React, { useEffect, useRef } from 'react';

const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const starsCount = 150; // Number of stars
        const stars = [];

        // Resize handler
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars.length = 0;
            for (let i = 0; i < starsCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5,
                    vx: Math.floor(Math.random() * 50) - 25,
                    vy: Math.floor(Math.random() * 50) - 25,
                    opacity: Math.random()
                });
            }
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Star color

            for (let i = 0; i < starsCount; i++) {
                const star = stars[i];

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();

                // Move
                star.x += star.vx / 100;
                star.y += star.vy / 100;

                // Opacity pulse
                star.opacity += (Math.random() - 0.5) * 0.05;
                if (star.opacity < 0.1) star.opacity = 0.1;
                if (star.opacity > 1) star.opacity = 1;

                // Loop around edges
                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;
                if (star.y < 0) star.y = canvas.height;
                if (star.y > canvas.height) star.y = 0;
            }

            animationFrameId = requestAnimationFrame(drawStars);
        };

        // Initialize setup
        window.addEventListener('resize', handleResize);
        handleResize();
        drawStars();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gray-50 dark:bg-[#050505] transition-colors duration-300">
            {/* Base Background Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-50 dark:opacity-70"
            />

            {/* Radial Glow - Static */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 0, 60, 0.05) 0%, transparent 50%)'
                }}
            />

            {/* Top Light Accent */}
            <div
                className="absolute top-0 left-0 right-0 h-[500px] opacity-20 dark:opacity-10"
                style={{
                    background: 'linear-gradient(to bottom, rgba(255, 0, 60, 0.2), transparent)'
                }}
            />
        </div>
    );
};

export default Background;
