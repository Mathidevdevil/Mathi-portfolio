import React, { useRef, useEffect } from 'react';

const ParticleText = ({ text = "Mathiyarasu", colors = ["#ffffff", "#00f3ff"], fontSize = 100, fontFamily = "Arial" }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        let mouse = {
            x: null,
            y: null,
            radius: 100
        };

        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        };

        const handleTouchMove = (event) => {
            if (event.touches.length > 0) {
                const rect = canvas.getBoundingClientRect();
                mouse.x = event.touches[0].clientX - rect.left;
                mouse.y = event.touches[0].clientY - rect.top;
            }
        };

        const handleTouchEnd = () => {
            mouse.x = null;
            mouse.y = null;
        }

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd);

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = 2;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }
        }

        const init = () => {
            particles = [];
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            ctx.fillStyle = 'white';

            // Dynamic font scaling
            // Estimate font size to fit width
            // Approx width of text ~= fontSize * 0.6 * charCount
            // We want width to be ~90% of canvas

            const estimatedCharCount = text.length || 10;
            const maxFontSizeForWidth = (canvas.width * 0.9) / (estimatedCharCount * 0.6);

            let calculatedFontSize = Math.min(fontSize, maxFontSizeForWidth);
            if (calculatedFontSize < 30) calculatedFontSize = 30; // Minimum readable size

            ctx.font = `bold ${calculatedFontSize}px ${fontFamily}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.fillText(text, canvas.width / 2, canvas.height / 2);

            const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // Adjust gap based on screen size/pixel density
            // Mobile (small width) might need fewer particles for perf
            const gap = canvas.width < 600 ? 2 : 3;

            for (let y = 0, y2 = textCoordinates.height; y < y2; y += gap) {
                for (let x = 0, x2 = textCoordinates.width; x < x2; x += gap) {
                    if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                        let positionX = x;
                        let positionY = y;
                        particles.push(new Particle(positionX, positionY));
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            init();
        };

        const resizeObserver = new ResizeObserver(() => {
            init();
        });

        if (canvasRef.current.parentElement) {
            resizeObserver.observe(canvasRef.current.parentElement);
        }

        init();
        animate();

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
        };
    }, [text, colors, fontSize, fontFamily]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full cursor-pointer touch-none"
            style={{ touchAction: 'none' }}
        />
    );
};

export default ParticleText;
