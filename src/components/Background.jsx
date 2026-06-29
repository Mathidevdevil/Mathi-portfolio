import React, { useEffect, useRef } from 'react';

const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let timeOffset = 0;

        // Elements arrays
        let cells = [];
        let gates = [];
        let transistors = [];
        let buses = [];
        let clockTreeBranches = [];

        const getColors = (isDark) => ({
            metal1: isDark ? 'rgba(0, 229, 255, 0.16)' : 'rgba(0, 100, 220, 0.14)', // Cyan-ish for metal interconnects
            poly: isDark ? 'rgba(255, 0, 60, 0.15)' : 'rgba(200, 0, 40, 0.12)', // Red for gate poly-silicon
            diffusion: isDark ? 'rgba(0, 255, 100, 0.12)' : 'rgba(0, 150, 50, 0.10)', // Green for active source/drains
            signal: isDark ? '#00ffff' : '#0284c7', // Bright signal pulses
            clkSignal: isDark ? '#ff003c' : '#dc2626', // Clock signals
            text: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.22)',
            cellBg: isDark ? 'rgba(12, 12, 12, 0.35)' : 'rgba(240, 240, 240, 0.45)',
            cellBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
        });

        // Initialize all elements based on window size
        const initVLSI = () => {
            const w = canvas.width;
            const h = canvas.height;

            cells = [];
            gates = [];
            transistors = [];
            buses = [];
            clockTreeBranches = [];

            // 1. Generate Standard Cells (SoC Functional Blocks)
            const cellLabels = ['ALU_32B', 'REG_FILE', 'MUX_8to1', 'D_FF_x8', 'SRAM_1K', 'PLL_CTRL', 'DEC_3to8', 'SPI_MAST'];
            const cellCount = w < 768 ? 4 : 8;

            for (let i = 0; i < cellCount; i++) {
                const cellW = w < 768 ? 100 : 140;
                const cellH = w < 768 ? 60 : 80;
                
                // Spread out cells across screen quadrants
                const col = i % 4;
                const row = Math.floor(i / 4);
                
                const baseX = (w / 4) * col + (w / 8) - (cellW / 2);
                const baseY = (h / 3) * (row + 0.5) - (cellH / 2);

                const x = baseX + (Math.random() * 40 - 20);
                const y = baseY + (Math.random() * 40 - 20);
                const label = cellLabels[i % cellLabels.length];

                cells.push({ x, y, w: cellW, h: cellH, label });
            }

            // 2. Generate Logic Gate Schematics
            const gateTypes = ['AND', 'OR', 'NOT'];
            const gateCount = w < 768 ? 5 : 12;
            for (let i = 0; i < gateCount; i++) {
                const x = Math.random() * (w - 100) + 50;
                const y = Math.random() * (h - 100) + 50;
                const type = gateTypes[Math.floor(Math.random() * gateTypes.length)];

                // Check if overlapping standard cells, if so skip or adjust
                const isOverlapping = cells.some(c => 
                    x > c.x - 30 && x < c.x + c.w + 30 &&
                    y > c.y - 30 && y < c.y + c.h + 30
                );
                if (!isOverlapping) {
                    gates.push({ x, y, type });
                }
            }

            // 3. Generate MOSFET Transistors (nMOS & pMOS)
            const transCount = w < 768 ? 6 : 15;
            for (let i = 0; i < transCount; i++) {
                const x = Math.random() * (w - 100) + 50;
                const y = Math.random() * (h - 100) + 50;
                const type = Math.random() > 0.5 ? 'nMOS' : 'pMOS';

                const isOverlapping = cells.some(c => 
                    x > c.x - 20 && x < c.x + c.w + 20 &&
                    y > c.y - 20 && y < c.y + c.h + 20
                ) || gates.some(g =>
                    x > g.x - 30 && x < g.x + 30 &&
                    y > g.y - 30 && y < g.y + 30
                );

                if (!isOverlapping) {
                    transistors.push({ x, y, type });
                }
            }

            // 4. Generate Parallel Data Buses
            const busCount = w < 768 ? 2 : 5;
            for (let i = 0; i < busCount; i++) {
                const y = (h / (busCount + 1)) * (i + 1) + (Math.random() * 30 - 15);
                const x1 = Math.random() * (w * 0.1);
                const x2 = w - Math.random() * (w * 0.1);
                const speed = Math.random() * 1.5 + 1.2;
                const offset = Math.random() * 600;

                buses.push({ x1, x2, y, length: x2 - x1, speed, offset });
            }

            // 5. Generate Clock Tree Distribution (H-Tree Clock Distribution)
            // A clean central tree branching out
            const rootX = w / 2;
            const rootY = h;
            const level1Y = h - 80;
            
            // Main stem
            clockTreeBranches.push({ x1: rootX, y1: rootY, x2: rootX, y2: level1Y });

            // Branch level 1 (splits left and right)
            const l1Width = w * 0.35;
            clockTreeBranches.push({ x1: rootX, y1: level1Y, x2: rootX - l1Width, y2: level1Y });
            clockTreeBranches.push({ x1: rootX, y1: level1Y, x2: rootX + l1Width, y2: level1Y });

            // Level 2 stems (going vertical)
            const level2Y = level1Y - 120;
            clockTreeBranches.push({ x1: rootX - l1Width, y1: level1Y, x2: rootX - l1Width, y2: level2Y });
            clockTreeBranches.push({ x1: rootX + l1Width, y1: level1Y, x2: rootX + l1Width, y2: level2Y });

            // Level 2 splits (splits left and right again)
            const l2Width = w * 0.15;
            clockTreeBranches.push({ x1: rootX - l1Width, y1: level2Y, x2: rootX - l1Width - l2Width, y2: level2Y });
            clockTreeBranches.push({ x1: rootX - l1Width, y1: level2Y, x2: rootX - l1Width + l2Width, y2: level2Y });
            clockTreeBranches.push({ x1: rootX + l1Width, y1: level2Y, x2: rootX + l1Width - l2Width, y2: level2Y });
            clockTreeBranches.push({ x1: rootX + l1Width, y1: level2Y, x2: rootX + l1Width + l2Width, y2: level2Y });

            // Level 3 endpoints (going up vertical)
            const level3Y = level2Y - 100;
            const endpoints = [
                rootX - l1Width - l2Width,
                rootX - l1Width + l2Width,
                rootX + l1Width - l2Width,
                rootX + l1Width + l2Width
            ];
            endpoints.forEach(epX => {
                clockTreeBranches.push({ x1: epX, y1: level2Y, x2: epX, y2: level3Y });
                
                // Small sub-branches for a real clock network feel
                clockTreeBranches.push({ x1: epX, y1: level3Y, x2: epX - 15, y2: level3Y });
                clockTreeBranches.push({ x1: epX, y1: level3Y, x2: epX + 15, y2: level3Y });
            });
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initVLSI();
        };

        const drawGate = (g, colors) => {
            const { x, y, type } = g;
            ctx.strokeStyle = colors.poly;
            ctx.lineWidth = 1.5;

            if (type === 'AND') {
                // Drawing AND Gate schematic symbol
                ctx.beginPath();
                ctx.moveTo(x - 12, y - 10);
                ctx.lineTo(x - 2, y - 10);
                ctx.arc(x - 2, y, 10, -Math.PI / 2, Math.PI / 2);
                ctx.lineTo(x - 12, y + 10);
                ctx.closePath();
                ctx.stroke();

                // Input Lines
                ctx.beginPath();
                ctx.moveTo(x - 20, y - 5); ctx.lineTo(x - 12, y - 5);
                ctx.moveTo(x - 20, y + 5); ctx.lineTo(x - 12, y + 5);
                // Output Line
                ctx.moveTo(x + 8, y); ctx.lineTo(x + 16, y);
                ctx.stroke();
            } else if (type === 'OR') {
                // Drawing OR Gate schematic symbol
                ctx.beginPath();
                ctx.moveTo(x - 14, y - 10);
                ctx.quadraticCurveTo(x - 4, y - 10, x + 8, y);
                ctx.quadraticCurveTo(x - 4, y + 10, x - 14, y + 10);
                ctx.quadraticCurveTo(x - 9, y, x - 14, y - 10);
                ctx.stroke();

                // Input Lines
                ctx.beginPath();
                ctx.moveTo(x - 20, y - 5); ctx.lineTo(x - 11, y - 5);
                ctx.moveTo(x - 20, y + 5); ctx.lineTo(x - 11, y + 5);
                // Output Line
                ctx.moveTo(x + 8, y); ctx.lineTo(x + 16, y);
                ctx.stroke();
            } else if (type === 'NOT') {
                // Drawing NOT Gate schematic symbol
                ctx.beginPath();
                ctx.moveTo(x - 10, y - 9);
                ctx.lineTo(x + 4, y);
                ctx.lineTo(x - 10, y + 9);
                ctx.closePath();
                ctx.stroke();

                // Inversion bubble
                ctx.beginPath();
                ctx.arc(x + 7, y, 3, 0, Math.PI * 2);
                ctx.stroke();

                // Inputs and Outputs
                ctx.beginPath();
                ctx.moveTo(x - 18, y); ctx.lineTo(x - 10, y);
                ctx.moveTo(x + 10, y); ctx.lineTo(x + 17, y);
                ctx.stroke();
            }
        };

        const drawTransistor = (t, colors) => {
            const { x, y, type } = t;

            // 1. Channel and Source/Drain lines (Active/Diffusion Layer - green)
            ctx.strokeStyle = colors.diffusion;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(x - 4, y - 10);
            ctx.lineTo(x - 4, y + 10);
            ctx.stroke();

            // Contacts
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x - 4, y - 10); ctx.lineTo(x - 12, y - 10); // Source contact
            ctx.moveTo(x - 4, y + 10); ctx.lineTo(x - 12, y + 10); // Drain contact
            ctx.stroke();

            // 2. Gate line (Polysilicon Layer - red/pink)
            ctx.strokeStyle = colors.poly;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(x + 2, y - 9);
            ctx.lineTo(x + 2, y + 9);
            ctx.stroke();

            // Gate contact
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x + 2, y);
            ctx.lineTo(x + 10, y);
            ctx.stroke();

            // Bubble for PMOS gate
            if (type === 'pMOS') {
                ctx.beginPath();
                ctx.arc(x - 1, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = colors.cellBg;
                ctx.fill();
                ctx.strokeStyle = colors.poly;
                ctx.stroke();
            }
            
            // Substrate node / label
            ctx.fillStyle = colors.text;
            ctx.font = '7px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(type === 'pMOS' ? 'PMOS' : 'NMOS', x - 2, y + 18);
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const isDark = document.documentElement.classList.contains('dark');
            const colors = getColors(isDark);
            
            timeOffset += 1.5;

            // --- 1. Draw Parallel Data Buses & Signals ---
            buses.forEach(bus => {
                ctx.strokeStyle = colors.metal1;
                ctx.lineWidth = 1.0;
                
                // Draw 4 parallel bus lines
                for (let i = 0; i < 4; i++) {
                    ctx.beginPath();
                    ctx.moveTo(bus.x1, bus.y + i * 5);
                    ctx.lineTo(bus.x2, bus.y + i * 5);
                    ctx.stroke();
                }

                // Render moving logic packets (pulses) on the bus
                const pulseProg = (timeOffset * bus.speed + bus.offset) % (bus.length + 150);
                if (pulseProg < bus.length + 30) {
                    ctx.strokeStyle = colors.signal;
                    const wireIdx = Math.floor(bus.offset) % 4;
                    const py = bus.y + wireIdx * 5;

                    // Simulated Glow: thick low opacity stroke
                    ctx.beginPath();
                    ctx.moveTo(Math.max(bus.x1, bus.x1 + pulseProg - 30), py);
                    ctx.lineTo(Math.min(bus.x2, bus.x1 + pulseProg), py);
                    ctx.lineWidth = 5.0;
                    const originalAlpha = ctx.globalAlpha;
                    ctx.globalAlpha = isDark ? 0.35 : 0.2;
                    ctx.stroke();

                    // Core Signal: thin stroke
                    ctx.lineWidth = 2.0;
                    ctx.globalAlpha = originalAlpha;
                    ctx.stroke();
                }
            });

            // --- 2. Draw Clock Distribution Tree (H-Tree) ---
            ctx.strokeStyle = colors.metal1;
            ctx.lineWidth = 1.5;
            clockTreeBranches.forEach(branch => {
                ctx.beginPath();
                ctx.moveTo(branch.x1, branch.y1);
                ctx.lineTo(branch.x2, branch.y2);
                ctx.stroke();
            });

            // Synchronous Clock Signals (blinking waves moving up the clock tree)
            const clkCycle = (timeOffset * 0.4) % 100;
            clockTreeBranches.forEach(branch => {
                // Render pulsing clock wave
                ctx.strokeStyle = colors.clkSignal;
                
                // Simulated Glow
                ctx.beginPath();
                ctx.moveTo(branch.x1, branch.y1);
                ctx.lineTo(branch.x2, branch.y2);
                ctx.lineWidth = 4.5;
                const originalAlpha = ctx.globalAlpha;
                ctx.globalAlpha = (clkCycle > 20 && clkCycle < 80) ? (isDark ? 0.25 : 0.18) : 0.05;
                ctx.stroke();

                // Core Wave
                ctx.lineWidth = 1.5;
                ctx.globalAlpha = originalAlpha;
                ctx.stroke();
            });

            // --- 3. Draw Integrated Circuit (IC) Standard Cells ---
            cells.forEach(cell => {
                // Cell Body
                ctx.fillStyle = colors.cellBg;
                ctx.fillRect(cell.x, cell.y, cell.w, cell.h);
                ctx.strokeStyle = colors.cellBorder;
                ctx.lineWidth = 1.5;
                ctx.strokeRect(cell.x, cell.y, cell.w, cell.h);

                // VDD Power Rail (thick cyan rail at top of cell)
                ctx.strokeStyle = colors.metal1;
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(cell.x, cell.y);
                ctx.lineTo(cell.x + cell.w, cell.y);
                ctx.stroke();

                // VSS Ground Rail (gray rail at bottom of cell)
                ctx.strokeStyle = isDark ? 'rgba(50, 50, 50, 0.4)' : 'rgba(200, 200, 200, 0.5)';
                ctx.beginPath();
                ctx.moveTo(cell.x, cell.y + cell.h);
                ctx.lineTo(cell.x + cell.w, cell.y + cell.h);
                ctx.stroke();

                // Standard Cell Label
                ctx.fillStyle = colors.text;
                ctx.font = 'bold 11px "Fira Code", monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(cell.label, cell.x + cell.w / 2, cell.y + cell.h / 2);

                // Draw cell internal gates/vias decoration (tiny squares)
                ctx.fillStyle = colors.poly;
                ctx.fillRect(cell.x + 8, cell.y + 10, 4, 4);
                ctx.fillStyle = colors.diffusion;
                ctx.fillRect(cell.x + cell.w - 12, cell.y + 10, 4, 4);
            });

            // --- 4. Draw Logic Gate Symbols ---
            gates.forEach(g => drawGate(g, colors));

            // --- 5. Draw CMOS Transistors ---
            transistors.forEach(t => drawTransistor(t, colors));

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
            {/* Very faint background Grid */}
            <div className="absolute inset-0 opacity-[0.12] dark:opacity-[0.04]"
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

            {/* VLSI Chip Layout & Schematic Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-[0.38] dark:opacity-[0.24]"
            />
        </div>
    );
};

export default Background;
