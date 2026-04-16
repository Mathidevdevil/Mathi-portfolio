import React, { useEffect, useRef } from 'react';

const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const gateTypes = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'EXOR'];
        let gates = [];
        let connections = [];
        let timeOffset = 0; // Defines the flow of the electrical signals

        const getStrokeColorType = (type, isDark, opacity) => {
            if (!isDark) {
                // Light mode: Navy and Crimson
                return (type === 'AND' || type === 'NAND' || type === 'NOT') 
                   ? `rgba(20, 30, 80, ${opacity+0.2})`  
                   : `rgba(255, 0, 60, ${opacity+0.1})`;  
            } else {
                // Dark mode: Neon Cyan and Neon Crimson
                return (type === 'AND' || type === 'NAND' || type === 'NOT') 
                   ? `rgba(0, 255, 255, ${opacity})` 
                   : `rgba(255, 0, 60, ${opacity})`;
            }
        };

        const initCircuit = () => {
            gates = [];
            connections = [];
            const count = window.innerWidth < 768 ? 15 : 35;
            
            // 1. Place static gates
            for (let i = 0; i < count; i++) {
                gates.push({
                    x: Math.floor(Math.random() * (canvas.width / 40)) * 40,  // snapped to grid
                    y: Math.floor(Math.random() * (canvas.height / 40)) * 40,
                    type: gateTypes[Math.floor(Math.random() * gateTypes.length)],
                    size: 25, 
                    opacity: Math.random() * 0.4 + 0.3
                });
            }

            // 2. Establish fixed connections
            for (let i = 0; i < gates.length; i++) {
                for (let j = i + 1; j < gates.length; j++) {
                    const dx = gates[i].x - gates[j].x;
                    const dy = gates[i].y - gates[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const threshold = 250;
                    if (dist > 0 && dist < threshold) {
                         // Decide connection probability based on distance to avoid mess
                         if (Math.random() < (1 - dist / threshold) * 0.8) {
                             connections.push({ a: gates[i], b: gates[j], dist });
                         }
                    }
                }
            }
        };

        const drawGateShape = (ctx, type, isDark, opacity) => {
             const color = getStrokeColorType(type, isDark, opacity);
             ctx.strokeStyle = color;
             ctx.fillStyle = getStrokeColorType(type, isDark, opacity * 0.15); 
             ctx.lineWidth = 1.5;

             ctx.beginPath();
             const R = 15;
             switch (type) {
                 case 'AND':
                     ctx.moveTo(-R, -R);
                     ctx.lineTo(0, -R);
                     ctx.arc(0, 0, R, -Math.PI/2, Math.PI/2);
                     ctx.lineTo(-R, R);
                     ctx.closePath();
                     ctx.stroke();
                     ctx.fill();
                     break;
                 case 'NAND':
                     ctx.moveTo(-R, -R);
                     ctx.lineTo(0, -R);
                     ctx.arc(0, 0, R, -Math.PI/2, Math.PI/2);
                     ctx.lineTo(-R, R);
                     ctx.closePath();
                     ctx.stroke();
                     ctx.fill();
                     ctx.beginPath();
                     ctx.arc(R + 4, 0, 4, 0, Math.PI*2);
                     ctx.stroke();
                     break;
                 case 'OR':
                     ctx.moveTo(-R*1.2, -R);
                     ctx.quadraticCurveTo(0, -R*1.2, R, 0);
                     ctx.quadraticCurveTo(0, R*1.2, -R*1.2, R);
                     ctx.quadraticCurveTo(-R*0.5, 0, -R*1.2, -R);
                     ctx.stroke();
                     ctx.fill();
                     break;
                 case 'NOR':
                     ctx.moveTo(-R*1.2, -R);
                     ctx.quadraticCurveTo(0, -R*1.2, R, 0);
                     ctx.quadraticCurveTo(0, R*1.2, -R*1.2, R);
                     ctx.quadraticCurveTo(-R*0.5, 0, -R*1.2, -R);
                     ctx.stroke();
                     ctx.fill();
                     ctx.beginPath();
                     ctx.arc(R + 4, 0, 4, 0, Math.PI*2);
                     ctx.stroke();
                     break;
                 case 'EXOR':
                     ctx.moveTo(-R, -R);
                     ctx.quadraticCurveTo(R*0.2, -R*1.2, R*1.2, 0);
                     ctx.quadraticCurveTo(R*0.2, R*1.2, -R, R);
                     ctx.quadraticCurveTo(-R*0.3, 0, -R, -R);
                     ctx.stroke();
                     ctx.fill();
                     ctx.beginPath();
                     ctx.moveTo(-R*1.4, -R);
                     ctx.quadraticCurveTo(-R*0.7, 0, -R*1.4, R);
                     ctx.stroke();
                     break;
                 case 'NOT':
                     ctx.moveTo(-R, -R + 5);
                     ctx.lineTo(R, 0);
                     ctx.lineTo(-R, R - 5);
                     ctx.closePath();
                     ctx.stroke();
                     ctx.fill();
                     ctx.beginPath();
                     ctx.arc(R + 4, 0, 4, 0, Math.PI*2);
                     ctx.stroke();
                     break;
             }
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initCircuit();
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const isDark = document.documentElement.classList.contains('dark');
            timeOffset += 1.5; // Flow speed

            // First pass: Draw connections with animated signals (marching ants effect)
            connections.forEach(conn => {
                const { a, b, dist } = conn;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                const midX = a.x + (b.x - a.x) / 2;
                ctx.lineTo(midX, a.y);
                ctx.lineTo(midX, b.y);
                ctx.lineTo(b.x, b.y);

                let opacity = (1 - dist / 250) * 0.2;
                const lineColor = isDark ? `rgba(0, 255, 255, ${opacity})` : `rgba(100, 100, 100, ${opacity+0.1})`;
                const signalColor = getStrokeColorType(a.type, isDark, opacity + 0.5);

                // Draw solid base wire
                ctx.setLineDash([]);
                ctx.strokeStyle = lineColor;
                ctx.lineWidth = 1;
                ctx.stroke();

                // Draw moving electron signal pulses over the wire
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(midX, a.y);
                ctx.lineTo(midX, b.y);
                ctx.lineTo(b.x, b.y);
                
                ctx.setLineDash([5, 30]); // Short pulse, long gap
                ctx.lineDashOffset = -timeOffset; // Move forward
                ctx.strokeStyle = signalColor;
                ctx.lineWidth = 1.5;
                
                // Add cyber glow to the running signal
                ctx.shadowBlur = 8;
                ctx.shadowColor = signalColor;
                ctx.stroke();
                
                ctx.shadowBlur = 0; // reset
            });

            // Reset Line Dash for gates
            ctx.setLineDash([]);

            // Second pass: Draw perfectly static upright gates
            gates.forEach(g => {
                ctx.save();
                ctx.translate(g.x, g.y);
                const scale = g.size / 30; // normalized scale
                ctx.scale(scale, scale);

                drawGateShape(ctx, g.type, isDark, g.opacity);
                
                // Add tiny label text centered on the gate
                const textColor = getStrokeColorType(g.type, isDark, g.opacity + 0.3);
                ctx.fillStyle = textColor;
                ctx.font = 'bold 10px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(g.type, 0, 24);

                ctx.restore();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gray-50 dark:bg-darker transition-colors duration-500">
            {/* Grid dot background layer that adapts naturally */}
            <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.05]"
                 style={{
                     backgroundImage: 'radial-gradient(circle at center, currentColor 1.5px, transparent 1px)',
                     backgroundSize: '40px 40px',
                     color: 'rgba(128, 128, 128, 1)' 
                 }}
            />

            {/* Glowing Top Accent Overlay */}
            <div
                className="absolute top-0 left-0 right-0 h-[300px] opacity-10 dark:opacity-[0.08] pointer-events-none transition-colors duration-500"
                style={{
                    background: 'linear-gradient(to bottom, #ff003c, transparent)',
                }}
            />

            {/* Main Gates Animation Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
        </div>
    );
};

export default Background;
