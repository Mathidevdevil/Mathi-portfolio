import React, { useEffect, useRef } from 'react';

const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let pads = [];
        let ics = [];
        let routes = [];
        let timeOffset = 0;

        const getColors = (isDark) => ({
            trace1: isDark ? 'rgba(0, 255, 255, 0.25)' : 'rgba(20, 30, 80, 0.25)',
            trace2: isDark ? 'rgba(255, 0, 60, 0.25)' : 'rgba(150, 0, 40, 0.25)',
            signal1: isDark ? '#00ffff' : '#141e50',
            signal2: isDark ? '#ff003c' : '#ff003c',
            padOuter: isDark ? 'rgba(255, 204, 0, 0.8)' : 'rgba(200, 150, 0, 0.8)', // Gold
            padInner: isDark ? '#050505' : '#f9fafb', // matches bg
            icBody: isDark ? '#111111' : '#333333',
            icPin: isDark ? '#cccccc' : '#aaaaaa',
            icText: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.4)'
        });

        const initPCB = () => {
            pads = [];
            ics = [];
            routes = [];
            
            const cell = 20;

            // 1. Generate Integrated Circuits (ICs)
            const icCount = window.innerWidth < 768 ? 5 : 12;
            const labels = ['MCU', 'RAM', 'FPGA', 'DAC', 'ADC', 'PWR', 'ETH', 'USB'];

            for (let i = 0; i < icCount; i++) {
                const w = (Math.floor(Math.random() * 3) + 2) * cell * 2; 
                const h = (Math.floor(Math.random() * 3) + 2) * cell * 2;
                
                const x = Math.floor(Math.random() * (canvas.width / cell)) * cell;
                const y = Math.floor(Math.random() * (canvas.height / cell)) * cell;
                
                const label = labels[Math.floor(Math.random() * labels.length)];
                
                const pins = [];
                const pinSpacing = cell;
                
                // Generate surface mount pins along the edges
                // Top & Bottom edges
                for (let px = x + pinSpacing; px <= x + w - pinSpacing; px += pinSpacing) {
                    pins.push({x: px, y: y});
                    pins.push({x: px, y: y + h});
                }
                // Left & Right edges
                for (let py = y + pinSpacing; py <= y + h - pinSpacing; py += pinSpacing) {
                    pins.push({x: x, y: py});
                    pins.push({x: x + w, y: py});
                }
                
                ics.push({x, y, w, h, pins, label});
            }
            
            // 2. Generate Through-hole Pads 
            const padCount = window.innerWidth < 768 ? 40 : 100;
            for(let i = 0; i < padCount; i++) {
                const x = Math.floor(Math.random() * (canvas.width / cell)) * cell;
                const y = Math.floor(Math.random() * (canvas.height / cell)) * cell;
                
                // Ensure pad isn't hidden underneath an IC
                const insideIC = ics.some(ic => x > ic.x - cell && x < ic.x + ic.w + cell && y > ic.y - cell && y < ic.y + ic.h + cell);
                if (!insideIC) {
                    pads.push({x, y});
                }
            }

            // 3. PCB Routing (45-degree angle traces)
            let connectablePoints = [...pads];
            ics.forEach(ic => {
                 // Randomly select 2-6 active pins per IC to route traces from
                 const activePinsCount = Math.floor(Math.random() * 5) + 2;
                 const activePins = ic.pins.sort(() => Math.random() - 0.5).slice(0, activePinsCount);
                 connectablePoints.push(...activePins);
            });

            // Iterate over points to draw minimal distance traces
            for (let i = 0; i < connectablePoints.length; i++) {
                const p1 = connectablePoints[i];
                
                let minDist = 400; // Search radius for neighbors
                let nearest = null;
                
                for(let j = i + 1; j < connectablePoints.length; j++) {
                    const p2 = connectablePoints[j];
                    // Manhattan approximation
                    const d = Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
                    if (d > 0 && d < minDist) {
                        minDist = d;
                        nearest = p2;
                    }
                }
                
                // Draw 45-degree PCB trace
                if (nearest) {
                    const dx = nearest.x - p1.x;
                    const dy = nearest.y - p1.y;
                    const adx = Math.abs(dx);
                    const ady = Math.abs(dy);
                    
                    let midX, midY;
                    const path = [];
                    
                    // Algorithm to construct perfect octagonal / 45-deg routing segments
                    if (adx > ady) {
                        const sx = Math.sign(dx);
                        const sy = Math.sign(dy);
                        midX = p1.x + ady * sx; // Move diagonally by dy
                        midY = p1.y + ady * sy;
                        path.push({x1: p1.x, y1: p1.y, x2: midX, y2: midY});
                        path.push({x1: midX, y1: midY, x2: nearest.x, y2: nearest.y}); // Move horizontally rest
                    } else {
                        const sx = Math.sign(dx);
                        const sy = Math.sign(dy);
                        midX = p1.x + adx * sx; // Move diagonally by dx
                        midY = p1.y + adx * sy;
                        path.push({x1: p1.x, y1: p1.y, x2: midX, y2: midY});
                        path.push({x1: midX, y1: midY, x2: nearest.x, y2: nearest.y}); // Move vertically rest
                    }
                    
                    // Push the route
                    routes.push({
                        path,
                        dist: Math.sqrt(dx*dx + dy*dy), // true distance approximation for flow
                        layer: Math.random() > 0.5 ? 'T1' : 'T2', 
                        offset: Math.random() * 1000,
                        speed: Math.random() * 0.5 + 0.5
                    });
                }
            }
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initPCB();
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const isDark = document.documentElement.classList.contains('dark');
            const colors = getColors(isDark);
            
            timeOffset += 1.5;

            // --- 1. Draw PCB Traces ---
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            routes.forEach((route, idx) => {
                const traceColor = route.layer === 'T1' ? colors.trace1 : colors.trace2;
                const signalColor = route.layer === 'T1' ? colors.signal1 : colors.signal2;

                const currentProg = ((timeOffset * route.speed + route.offset) % (route.dist + 150));
                let accumulatedDist = 0;

                route.path.forEach(seg => {
                    const segLen = Math.sqrt(Math.pow(seg.x2 - seg.x1, 2) + Math.pow(seg.y2 - seg.y1, 2));
                    if (segLen === 0) return;

                    // Draw etched copper trace
                    ctx.beginPath();
                    ctx.moveTo(seg.x1, seg.y1);
                    ctx.lineTo(seg.x2, seg.y2);
                    ctx.strokeStyle = traceColor;
                    ctx.lineWidth = 2.5;
                    ctx.stroke();

                    // Logic signals over traces
                    const pulseLength = 25;
                    const isSignalPresent = currentProg > accumulatedDist && currentProg < accumulatedDist + segLen + pulseLength;
                    
                    if (isSignalPresent) {
                        ctx.beginPath();
                        ctx.moveTo(seg.x1, seg.y1);
                        ctx.lineTo(seg.x2, seg.y2);
                        
                        const progOnLine = currentProg - accumulatedDist;
                        ctx.setLineDash([pulseLength, 2000]); 
                        ctx.lineDashOffset = -progOnLine;

                        ctx.strokeStyle = signalColor;
                        ctx.lineWidth = 3.0; // Slightly thicker
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = signalColor;
                        ctx.stroke();
                        
                        ctx.shadowBlur = 0;
                        ctx.setLineDash([]);
                    }
                    
                    accumulatedDist += segLen;
                });
            });

            // --- 2. Draw IC Footprints ---
            ics.forEach(ic => {
                // IC Body
                ctx.fillStyle = colors.icBody;
                ctx.fillRect(ic.x, ic.y, ic.w, ic.h);
                
                // IC Label
                ctx.fillStyle = colors.icText;
                ctx.font = 'bold 14px "Fira Code", monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(ic.label, ic.x + ic.w / 2, ic.y + ic.h / 2);

                // IC Pins
                ctx.fillStyle = colors.icPin;
                ic.pins.forEach(pin => {
                    // Detect if pin is horizontal or vertical based on boundary
                    const isTopBottom = pin.y === ic.y || pin.y === ic.y + ic.h;
                    ctx.fillRect(
                        pin.x - (isTopBottom ? 3 : 5), 
                        pin.y - (isTopBottom ? 5 : 3), 
                        isTopBottom ? 6 : 10, 
                        isTopBottom ? 10 : 6
                    );
                });
                
                // Orientation dot (Pin 1 indicator)
                ctx.fillStyle = colors.icText;
                ctx.beginPath();
                ctx.arc(ic.x + 12, ic.y + 12, 3, 0, Math.PI * 2);
                ctx.fill();
            });

            // --- 3. Draw Plated Through-holes (Vias/Pads) ---
            pads.forEach(pad => {
                // Outer ring (Copper/Gold)
                ctx.beginPath();
                ctx.arc(pad.x, pad.y, 4.5, 0, Math.PI * 2);
                ctx.fillStyle = colors.padOuter;
                ctx.fill();
                
                // Inner hole (Drill)
                ctx.beginPath();
                ctx.arc(pad.x, pad.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = colors.padInner;
                ctx.fill();
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
            {/* Very faint Grid indicating PCB grid-snap */}
            <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]"
                 style={{
                     backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                     backgroundSize: '20px 20px',
                     color: 'rgba(128, 128, 128, 1)' 
                 }}
            />

            {/* Subtle Gradient Overlays */}
            <div
                className="absolute top-0 left-0 right-0 h-[50vh] opacity-10 dark:opacity-[0.06] pointer-events-none transition-colors duration-500"
                style={{
                    background: 'linear-gradient(to bottom, #ff003c, transparent)',
                }}
            />

            {/* Main PCB Animation Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
        </div>
    );
};

export default Background;
