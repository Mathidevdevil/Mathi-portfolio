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
        let CMOSmTransistors = [];
        let buses = [];
        let clockTreeBranches = [];

        // Discrete Electronic Components & Connected Circuits
        let discreteCircuits = [];

        // Waveform Display screens (Oscilloscope & Logic Analyzer)
        let waveformDisplays = [];

        const getColors = (isDark) => ({
            metal1: isDark ? 'rgba(0, 229, 255, 0.65)' : 'rgba(0, 100, 220, 0.58)', // Cyan-ish for metal interconnects
            poly: isDark ? 'rgba(255, 0, 60, 0.60)' : 'rgba(200, 0, 40, 0.52)', // Red for gate poly-silicon
            diffusion: isDark ? 'rgba(0, 255, 100, 0.55)' : 'rgba(0, 150, 50, 0.48)', // Green for active active source/drains
            signal: isDark ? '#00ffff' : '#0284c7', // Bright signal pulses
            clkSignal: isDark ? '#ff003c' : '#dc2626', // Clock signals
            text: isDark ? 'rgba(255, 255, 255, 0.60)' : 'rgba(0, 0, 0, 0.68)',
            cellBg: isDark ? 'rgba(20, 20, 20, 0.65)' : 'rgba(240, 240, 240, 0.75)',
            cellBorder: isDark ? 'rgba(255, 255, 255, 0.32)' : 'rgba(0, 0, 0, 0.28)',
            schematicWire: isDark ? 'rgba(255, 255, 255, 0.55)' : 'rgba(50, 50, 50, 0.52)',
            schematicComponent: isDark ? 'rgba(0, 229, 255, 0.88)' : 'rgba(0, 100, 220, 0.78)'
        });

        // Initialize all elements based on window size
        const initVLSIAndElectronics = () => {
            const w = canvas.width;
            const h = canvas.height;

            cells = [];
            gates = [];
            CMOSmTransistors = [];
            buses = [];
            clockTreeBranches = [];
            discreteCircuits = [];
            waveformDisplays = [];

            // --- A. VLSI & SoC LAYOUT GENERATION ---
            // 1. Generate Standard Cells
            const cellLabels = ['ALU_32B', 'REG_FILE', 'MUX_8to1', 'D_FF_x8', 'SRAM_1K', 'PLL_CTRL'];
            const cellCount = w < 768 ? 2 : 4;
            for (let i = 0; i < cellCount; i++) {
                const cellW = w < 768 ? 100 : 130;
                const cellH = w < 768 ? 55 : 75;
                const col = i % 2;
                const row = Math.floor(i / 2);
                const x = (w * 0.45) * col + (w * 0.1) + (Math.random() * 40 - 20);
                const y = (h * 0.25) * (row + 0.5) - (cellH / 2);
                const label = cellLabels[i % cellLabels.length];
                cells.push({ x, y, w: cellW, h: cellH, label });
            }

            // 2. Generate Logic Gate Schematics
            const gateTypes = ['AND', 'OR', 'NOT'];
            const gateCount = w < 768 ? 3 : 8;
            for (let i = 0; i < gateCount; i++) {
                const x = Math.random() * (w - 100) + 50;
                const y = Math.random() * (h * 0.4) + (h * 0.1);
                const type = gateTypes[Math.floor(Math.random() * gateTypes.length)];

                const isOverlapping = cells.some(c => 
                    x > c.x - 40 && x < c.x + c.w + 40 &&
                    y > c.y - 40 && y < c.y + c.h + 40
                );
                if (!isOverlapping) {
                    gates.push({ x, y, type });
                }
            }

            // 3. Generate MOSFET Transistors
            const transCount = w < 768 ? 4 : 10;
            for (let i = 0; i < transCount; i++) {
                const x = Math.random() * (w - 100) + 50;
                const y = Math.random() * (h * 0.4) + (h * 0.1);
                const type = Math.random() > 0.5 ? 'nMOS' : 'pMOS';

                const isOverlapping = cells.some(c => 
                    x > c.x - 30 && x < c.x + c.w + 30 &&
                    y > c.y - 30 && y < c.y + c.h + 30
                ) || gates.some(g =>
                    x > g.x - 35 && x < g.x + 35 &&
                    y > g.y - 35 && y < g.y + 35
                );
                if (!isOverlapping) {
                    CMOSmTransistors.push({ x, y, type });
                }
            }

            // 4. Generate Parallel Data Buses
            const busCount = w < 768 ? 1 : 3;
            for (let i = 0; i < busCount; i++) {
                const y = (h * 0.3) * (i + 1) + (Math.random() * 20 - 10);
                const x1 = Math.random() * (w * 0.05);
                const x2 = w - Math.random() * (w * 0.05);
                const speed = Math.random() * 1.5 + 1.2;
                const offset = Math.random() * 600;
                buses.push({ x1, x2, y, length: x2 - x1, speed, offset });
            }

            // 5. Generate Clock Tree Distribution (H-Tree)
            const rootX = w / 2;
            const rootY = h;
            const level1Y = h - 60;
            clockTreeBranches.push({ x1: rootX, y1: rootY, x2: rootX, y2: level1Y });

            const l1Width = w * 0.3;
            clockTreeBranches.push({ x1: rootX, y1: level1Y, x2: rootX - l1Width, y2: level1Y });
            clockTreeBranches.push({ x1: rootX, y1: level1Y, x2: rootX + l1Width, y2: level1Y });

            const level2Y = level1Y - 80;
            clockTreeBranches.push({ x1: rootX - l1Width, y1: level1Y, x2: rootX - l1Width, y2: level2Y });
            clockTreeBranches.push({ x1: rootX + l1Width, y1: level1Y, x2: rootX + l1Width, y2: level2Y });


            // --- B. DISCRETE ELECTRONICS CIRCUITS GENERATION ---
            
            // Circuit 1: Transistor Amplifier (CE Configuration - Middle Right)
            if (w >= 768) {
                const ampX = w * 0.75;
                const ampY = h * 0.55;
                
                discreteCircuits.push({
                    name: 'BJT Amplifier (CE)',
                    components: [
                        { type: 'Capacitor', x: ampX - 80, y: ampY, angle: 0 },
                        { type: 'Resistor', x: ampX - 30, y: ampY, angle: 0, label: 'Rb' },
                        { type: 'BJT', x: ampX + 20, y: ampY, bjtType: 'NPN' },
                        { type: 'Resistor', x: ampX + 24, y: ampY - 50, angle: Math.PI / 2, label: 'Rc' },
                        { type: 'Resistor', x: ampX + 24, y: ampY + 50, angle: Math.PI / 2, label: 'Re' }
                    ],
                    wires: [
                        { x1: ampX - 120, y1: ampY, x2: ampX - 100, y2: ampY },
                        { x1: ampX - 60, y1: ampY, x2: ampX - 50, y2: ampY },
                        { x1: ampX - 10, y1: ampY, x2: ampX, y2: ampY },
                        { x1: ampX + 24, y1: ampY - 16, x2: ampX + 24, y2: ampY - 30 },
                        { x1: ampX + 24, y1: ampY - 70, x2: ampX + 24, y2: ampY - 80 },
                        { x1: ampX - 20, y1: ampY - 80, x2: ampX + 60, y2: ampY - 80 }, 
                        { x1: ampX + 24, y1: ampY + 16, x2: ampX + 24, y2: ampY + 30 },
                        { x1: ampX + 24, y1: ampY + 70, x2: ampX + 24, y2: ampY + 80 },
                        { x1: ampX + 24, y1: ampY - 16, x2: ampX + 70, y2: ampY - 16 },
                        { x1: ampX + 70, y1: ampY - 16, x2: ampX + 90, y2: ampY - 16 }
                    ],
                    ground: { x: ampX + 24, y: ampY + 80 },
                    signalPath: [
                        { x: ampX - 120, y: ampY },
                        { x: ampX - 80, y: ampY },
                        { x: ampX - 30, y: ampY },
                        { x: ampX + 20, y: ampY },
                        { x: ampX + 24, y: ampY - 16 },
                        { x: ampX + 90, y: ampY - 16 }
                    ],
                    speed: 1.4,
                    offset: 0
                });
            }

            // Circuit 2: Diode Full-Wave Bridge Rectifier (Lower Left)
            const rectX = w < 768 ? w * 0.35 : w * 0.25;
            const rectY = w < 768 ? h * 0.70 : h * 0.70;
            
            discreteCircuits.push({
                name: 'Bridge Rectifier',
                components: [
                    { type: 'Diode', x: rectX - 20, y: rectY - 20, angle: -Math.PI / 4 }, 
                    { type: 'Diode', x: rectX + 20, y: rectY - 20, angle: Math.PI / 4 },  
                    { type: 'Diode', x: rectX - 20, y: rectY + 20, angle: -Math.PI * 3/4 }, 
                    { type: 'Diode', x: rectX + 20, y: rectY + 20, angle: Math.PI * 3/4 }  
                ],
                wires: [
                    { x1: rectX - 40, y1: rectY, x2: rectX, y2: rectY - 40 },
                    { x1: rectX, y1: rectY - 40, x2: rectX + 40, y2: rectY },
                    { x1: rectX - 40, y1: rectY, x2: rectX, y2: rectY + 40 },
                    { x1: rectX, y1: rectY + 40, x2: rectX + 40, y2: rectY },
                    { x1: rectX - 80, y1: rectY - 15, x2: rectX - 40, y2: rectY },
                    { x1: rectX - 80, y1: rectY + 15, x2: rectX, y2: rectY + 40 },
                    { x1: rectX, y1: rectY - 40, x2: rectX + 80, y2: rectY - 40 },
                    { x1: rectX + 40, y1: rectY, x2: rectX + 80, y2: rectY },
                ],
                ground: { x: rectX + 80, y: rectY },
                signalPath: [
                    { x: rectX - 80, y: rectY - 15 },
                    { x: rectX - 40, y: rectY },
                    { x: rectX, y: rectY - 40 },
                    { x: rectX + 80, y: rectY - 40 }
                ],
                speed: 1.2,
                offset: 150
            });

            // Circuit 3: RLC Resonant Filter (Middle Left)
            const rlcX = w < 768 ? w * 0.70 : w * 0.20;
            const rlcY = w < 768 ? h * 0.40 : h * 0.45;
            
            discreteCircuits.push({
                name: 'RLC Filter',
                components: [
                    { type: 'Resistor', x: rlcX - 60, y: rlcY, angle: 0, label: 'R' },
                    { type: 'Inductor', x: rlcX, y: rlcY, angle: 0, label: 'L' },
                    { type: 'Capacitor', x: rlcX + 60, y: rlcY, angle: 0, label: 'C' }
                ],
                wires: [
                    { x1: rlcX - 100, y1: rlcY, x2: rlcX - 80, y2: rlcY },
                    { x1: rlcX - 40, y1: rlcY, x2: rlcX - 22, y2: rlcY },
                    { x1: rlcX + 22, y1: rlcY, x2: rlcX + 40, y2: rlcY },
                    { x1: rlcX + 80, y1: rlcY, x2: rlcX + 100, y2: rlcY },
                    { x1: rlcX + 100, y1: rlcY, x2: rlcX + 100, y2: rlcY + 20 }
                ],
                ground: { x: rlcX + 100, y: rlcY + 20 },
                signalPath: [
                    { x: rlcX - 100, y: rlcY },
                    { x: rlcX - 60, y: rlcY },
                    { x: rlcX, y: rlcY },
                    { x: rlcX + 60, y: rlcY },
                    { x: rlcX + 100, y: rlcY }
                ],
                speed: 1.6,
                offset: 300
            });

            // Circuit 4: Op-Amp Feedback Circuit (Upper Left)
            const opX = w < 768 ? w * 0.20 : w * 0.15;
            const opY = w < 768 ? h * 0.15 : h * 0.20;
            discreteCircuits.push({
                name: 'Op-Amp Inverter',
                components: [
                    { type: 'Resistor', x: opX - 60, y: opY - 8, angle: 0, label: 'R1' },
                    { type: 'OpAmp', x: opX, y: opY },
                    { type: 'Resistor', x: opX, y: opY - 45, angle: 0, label: 'Rf' }
                ],
                wires: [
                    { x1: opX - 100, y1: opY - 8, x2: opX - 80, y2: opY - 8 },
                    { x1: opX - 40, y1: opY - 8, x2: opX - 30, y2: opY - 8 },
                    { x1: opX - 30, y1: opY + 8, x2: opX - 30, y2: opY + 20 },
                    { x1: opX - 25, y1: opY - 8, x2: opX - 25, y2: opY - 45 },
                    { x1: opX - 25, y1: opY - 45, x2: opX - 20, y2: opY - 45 },
                    { x1: opX + 20, y1: opY - 45, x2: opX + 25, y2: opY - 45 },
                    { x1: opX + 25, y1: opY - 45, x2: opX + 25, y2: opY },
                    { x1: opX + 25, y1: opY, x2: opX + 26, y2: opY },
                    { x1: opX + 26, y1: opY, x2: opX + 70, y2: opY }
                ],
                ground: { x: opX - 30, y: opY + 20 },
                signalPath: [
                    { x: opX - 100, y: opY - 8 },
                    { x: opX - 60, y: opY - 8 },
                    { x: opX - 25, y: opY - 8 },
                    { x: opX - 25, y: opY - 45 },
                    { x: opX, y: opY - 45 },
                    { x: opX + 25, y: opY - 45 },
                    { x: opX + 25, y: opY },
                    { x: opX + 70, y: opY }
                ],
                speed: 1.5,
                offset: 400
            });

            // Circuit 5: CMOS Inverter Gate layout (Upper Right)
            const cmosX = w < 768 ? w * 0.75 : w * 0.85;
            const cmosY = w < 768 ? h * 0.20 : h * 0.22;
            discreteCircuits.push({
                name: 'CMOS Inverter',
                components: [
                    { type: 'CMOSTransistor', x: cmosX, y: cmosY - 25, cType: 'pMOS' },
                    { type: 'CMOSTransistor', x: cmosX, y: cmosY + 25, cType: 'nMOS' }
                ],
                wires: [
                    { x1: cmosX - 40, y1: cmosY, x2: cmosX - 20, y2: cmosY },
                    { x1: cmosX - 20, y1: cmosY - 25, x2: cmosX - 20, y2: cmosY + 25 },
                    { x1: cmosX - 20, y1: cmosY - 25, x2: cmosX - 8, y2: cmosY - 25 }, 
                    { x1: cmosX - 20, y1: cmosY + 25, x2: cmosX - 8, y2: cmosY + 25 }, 
                    { x1: cmosX - 14, y1: cmosY - 35, x2: cmosX - 14, y2: cmosY - 55 },
                    { x1: cmosX - 30, y1: cmosY - 55, x2: cmosX + 10, y2: cmosY - 55 }, 
                    { x1: cmosX - 14, y1: cmosY + 35, x2: cmosX - 14, y2: cmosY + 55 },
                    { x1: cmosX - 14, y1: cmosY - 15, x2: cmosX + 15, y2: cmosY - 15 },
                    { x1: cmosX - 14, y1: cmosY + 15, x2: cmosX + 15, y2: cmosY + 15 },
                    { x1: cmosX + 15, y1: cmosY - 15, x2: cmosX + 15, y2: cmosY + 15 },
                    { x1: cmosX + 15, y1: cmosY, x2: cmosX + 45, y2: cmosY }
                ],
                ground: { x: cmosX - 14, y: cmosY + 55 },
                signalPath: [
                    { x: cmosX - 40, y: cmosY },
                    { x: cmosX - 20, y: cmosY },
                    { x: cmosX - 20, y: cmosY - 25 },
                    { x: cmosX - 14, y: cmosY - 15 },
                    { x: cmosX + 15, y: cmosY - 15 },
                    { x: cmosX + 15, y: cmosY },
                    { x: cmosX + 45, y: cmosY }
                ],
                speed: 1.8,
                offset: 200
            });

            // Circuit 6: Astable Multivibrator Oscillator (Center Bottom/Middle)
            const oscX = w * 0.50;
            const oscY = h * 0.42;
            if (w >= 768) {
                discreteCircuits.push({
                    name: 'Astable Multivibrator',
                    components: [
                        { type: 'Resistor', x: oscX - 50, y: oscY - 45, angle: Math.PI / 2, label: 'R1' },
                        { type: 'Resistor', x: oscX - 15, y: oscY - 45, angle: Math.PI / 2, label: 'R2' },
                        { type: 'Resistor', x: oscX + 15, y: oscY - 45, angle: Math.PI / 2, label: 'R3' },
                        { type: 'Resistor', x: oscX + 50, y: oscY - 45, angle: Math.PI / 2, label: 'R4' },
                        { type: 'Capacitor', x: oscX - 30, y: oscY + 5, angle: 0, label: 'C1' },
                        { type: 'Capacitor', x: oscX + 30, y: oscY + 5, angle: 0, label: 'C2' },
                        { type: 'BJT', x: oscX - 50, y: oscY + 40, bjtType: 'NPN' },
                        { type: 'BJT', x: oscX + 50, y: oscY + 40, bjtType: 'NPN' }
                    ],
                    wires: [
                        { x1: oscX - 70, y1: oscY - 65, x2: oscX + 70, y2: oscY - 65 },
                        { x1: oscX - 46, y1: oscY + 54, x2: oscX - 46, y2: oscY + 70 },
                        { x1: oscX + 54, y1: oscY + 54, x2: oscX + 54, y2: oscY + 70 },
                        { x1: oscX - 46, y1: oscY + 70, x2: oscX + 54, y2: oscY + 70 },
                        { x1: oscX - 46, y1: oscY + 26, x2: oscX - 46, y2: oscY + 5 },
                        { x1: oscX - 46, y1: oscY + 5, x2: oscX - 40, y2: oscY + 5 }, 
                        { x1: oscX - 20, y1: oscY + 5, x2: oscX + 30, y2: oscY + 5 }, 
                        { x1: oscX + 30, y1: oscY + 5, x2: oscX + 30, y2: oscY + 40 },
                        { x1: oscX + 54, y1: oscY + 26, x2: oscX + 54, y2: oscY - 10 },
                        { x1: oscX + 54, y1: oscY - 10, x2: oscX + 40, y2: oscY - 10 }, 
                        { x1: oscX + 20, y1: oscY - 10, x2: oscX - 70, y2: oscY - 10 }, 
                        { x1: oscX - 70, y1: oscY - 10, x2: oscX - 70, y2: oscY + 40 },
                        { x1: oscX - 50, y1: oscY - 25, x2: oscX - 46, y2: oscY + 26 }, 
                        { x1: oscX + 50, y1: oscY - 25, x2: oscX + 54, y2: oscY + 26 }  
                    ],
                    ground: { x: oscX, y: oscY + 70 },
                    signalPath: [
                        { x: oscX - 46, y: oscY + 26 },
                        { x: oscX - 46, y: oscY + 5 },
                        { x: oscX + 30, y: oscY + 5 },
                        { x: oscX + 30, y: oscY + 40 },
                        { x: oscX + 54, y: oscY + 26 },
                        { x: oscX + 54, y: oscY - 10 },
                        { x: oscX - 70, y: oscY - 10 },
                        { x: oscX - 70, y: oscY + 40 }
                    ],
                    speed: 1.0,
                    offset: 50
                });
            }

            // Circuit 7: R-2R Ladder DAC (Digital-to-Analog Converter - Top Middle)
            const dacX = w * 0.50;
            const dacY = h * 0.15;
            if (w >= 768) {
                discreteCircuits.push({
                    name: 'R-2R Ladder DAC',
                    components: [
                        { type: 'Resistor', x: dacX - 60, y: dacY, angle: 0, label: '2R' },
                        { type: 'Resistor', x: dacX - 20, y: dacY, angle: 0, label: 'R' },
                        { type: 'Resistor', x: dacX + 20, y: dacY, angle: 0, label: 'R' },
                        
                        { type: 'Resistor', x: dacX - 80, y: dacY + 25, angle: Math.PI / 2, label: '2R' },
                        { type: 'Resistor', x: dacX - 40, y: dacY + 25, angle: Math.PI / 2, label: '2R' },
                        { type: 'Resistor', x: dacX, y: dacY + 25, angle: Math.PI / 2, label: '2R' },
                        { type: 'Resistor', x: dacX + 40, y: dacY + 25, angle: Math.PI / 2, label: '2R' }
                    ],
                    wires: [
                        // Ladder top nodes
                        { x1: dacX - 80, y1: dacY, x2: dacX + 60, y2: dacY },
                        // Connecting vertical resistors
                        { x1: dacX - 80, y1: dacY, x2: dacX - 80, y2: dacY + 5 },
                        { x1: dacX - 40, y1: dacY, x2: dacX - 40, y2: dacY + 5 },
                        { x1: dacX, y1: dacY, x2: dacX, y2: dacY + 5 },
                        { x1: dacX + 40, y1: dacY, x2: dacX + 40, y2: dacY + 5 },
                        
                        // Ground nodes for ladder bottom input bits
                        { x1: dacX - 80, y1: dacY + 45, x2: dacX - 80, y2: dacY + 55 },
                        { x1: dacX - 40, y1: dacY + 45, x2: dacX - 40, y2: dacY + 55 },
                        { x1: dacX, y1: dacY + 45, x2: dacX, y2: dacY + 55 },
                        { x1: dacX + 40, y1: dacY + 45, x2: dacX + 40, y2: dacY + 55 },
                        
                        // Input bits labels indicators
                        { x1: dacX - 80, y1: dacY + 55, x2: dacX - 80, y2: dacY + 65 },
                        { x1: dacX - 40, y1: dacY + 55, x2: dacX - 40, y2: dacY + 65 },
                        { x1: dacX, y1: dacY + 55, x2: dacX, y2: dacY + 65 },
                        { x1: dacX + 40, y1: dacY + 55, x2: dacX + 40, y2: dacY + 65 }
                    ],
                    ground: { x: dacX - 80, y: dacY + 55 },
                    signalPath: [
                        { x: dacX - 80, y: dacY + 65 },
                        { x: dacX - 80, y: dacY },
                        { x: dacX - 40, y: dacY },
                        { x: dacX, y: dacY },
                        { x: dacX + 40, y: dacY },
                        { x: dacX + 60, y: dacY }
                    ],
                    speed: 1.3,
                    offset: 100
                });
            }

            // Circuit 8: 555 Timer IC Oscillator (Middle Right / Bottom)
            const timerX = w * 0.85;
            const timerY = h * 0.48;
            if (w >= 768) {
                discreteCircuits.push({
                    name: '555 Timer Astable',
                    components: [
                        { type: '555Timer', x: timerX, y: timerY },
                        { type: 'Resistor', x: timerX + 50, y: timerY - 30, angle: Math.PI / 2, label: 'Ra' },
                        { type: 'Resistor', x: timerX + 50, y: timerY, angle: Math.PI / 2, label: 'Rb' },
                        { type: 'Capacitor', x: timerX + 50, y: timerY + 30, angle: Math.PI / 2, label: 'C' }
                    ],
                    wires: [
                        // Pin 8 (VCC) to VCC Rail
                        { x1: timerX + 20, y1: timerY - 15, x2: timerX + 50, y2: timerY - 15 },
                        { x1: timerX + 50, y1: timerY - 15, x2: timerX + 50, y2: timerY - 50 },
                        
                        // Pin 7 (DIS) to node between Ra and Rb
                        { x1: timerX + 20, y1: timerY - 5, x2: timerX + 50, y2: timerY - 5 },
                        { x1: timerX + 50, y1: timerY - 10, x2: timerX + 50, y2: timerY - 5 },
                        
                        // Pin 6 (THR) to node between Rb and C
                        { x1: timerX + 20, y1: timerY + 5, x2: timerX + 50, y2: timerY + 5 },
                        { x1: timerX + 50, y1: timerY + 10, x2: timerX + 50, y2: timerY + 5 },
                        
                        // Pin 2 (TRG) tied to Pin 6 (THR)
                        { x1: timerX - 20, y1: timerY - 5, x2: timerX - 35, y2: timerY - 5 },
                        { x1: timerX - 35, y1: timerY - 5, x2: timerX - 35, y2: timerY + 35 },
                        { x1: timerX - 35, y1: timerY + 35, x2: timerX + 50, y2: timerY + 35 },
                        { x1: timerX + 50, y1: timerY + 35, x2: timerX + 50, y2: timerY + 15 },
                        
                        // Pin 1 (GND) to Ground
                        { x1: timerX - 20, y1: timerY - 15, x2: timerX - 30, y2: timerY - 15 },
                        { x1: timerX - 30, y1: timerY - 15, x2: timerX - 30, y2: timerY + 45 },
                        
                        // Pin 4 (RST) tied to VCC
                        { x1: timerX - 20, y1: timerY + 15, x2: timerX - 25, y2: timerY + 15 },
                        { x1: timerX - 25, y1: timerY + 15, x2: timerX - 25, y2: timerY - 50 },
                        { x1: timerX - 25, y1: timerY - 50, x2: timerX + 50, y2: timerY - 50 },
                        
                        // Pin 3 (OUT) to Output buffer
                        { x1: timerX - 20, y1: timerY + 5, x2: timerX - 50, y2: timerY + 5 }
                    ],
                    ground: { x: timerX - 30, y: timerY + 45 },
                    signalPath: [
                        { x: timerX + 50, y: timerY - 50 },
                        { x: timerX + 50, y: timerY - 15 },
                        { x: timerX + 20, y: timerY - 15 }, // into Pin 8
                        { x: timerX + 20, y: timerY + 5 },  // out Pin 3
                        { x: timerX - 50, y: timerY + 5 }
                    ],
                    speed: 1.1,
                    offset: 250
                });
            }

            // Circuit 9: NAND SR Latch (Middle Left)
            const latchX = w < 768 ? w * 0.15 : w * 0.15;
            const latchY = w < 768 ? h * 0.40 : h * 0.40;
            
            discreteCircuits.push({
                name: 'SR Latch (NAND)',
                components: [
                    { type: 'NANDGate', x: latchX, y: latchY - 25 },
                    { type: 'NANDGate', x: latchX, y: latchY + 25 }
                ],
                wires: [
                    // Input S (Set)
                    { x1: latchX - 40, y1: latchY - 30, x2: latchX - 20, y2: latchY - 30 },
                    // Input R (Reset)
                    { x1: latchX - 40, y1: latchY + 30, x2: latchX - 20, y2: latchY + 30 },
                    
                    // Cross coupling 1: Output 1 to Input 2
                    { x1: latchX + 22, y1: latchY - 25, x2: latchX + 30, y2: latchY - 25 },
                    { x1: latchX + 30, y1: latchY - 25, x2: latchX + 30, y2: latchY },
                    { x1: latchX + 30, y1: latchY, x2: latchX - 30, y2: latchY },
                    { x1: latchX - 30, y1: latchY, x2: latchX - 30, y2: latchY + 20 },
                    { x1: latchX - 30, y1: latchY + 20, x2: latchX - 20, y2: latchY + 20 },
                    
                    // Cross coupling 2: Output 2 to Input 1
                    { x1: latchX + 22, y1: latchY + 25, x2: latchX + 35, y2: latchY + 25 },
                    { x1: latchX + 35, y1: latchY + 25, x2: latchX + 35, y2: latchY - 10 },
                    { x1: latchX + 35, y1: latchY - 10, x2: latchX - 25, y2: latchY - 10 },
                    { x1: latchX - 25, y1: latchY - 10, x2: latchX - 25, y2: latchY - 20 },
                    { x1: latchX - 25, y1: latchY - 20, x2: latchX - 20, y2: latchY - 20 },
                    
                    // Output Q
                    { x1: latchX + 30, y1: latchY - 25, x2: latchX + 50, y2: latchY - 25 },
                    // Output Q_bar
                    { x1: latchX + 35, y1: latchY + 25, x2: latchX + 50, y2: latchY + 25 }
                ],
                signalPath: [
                    { x: latchX - 40, y: latchY - 30 },
                    { x: latchX, y: latchY - 25 },
                    { x: latchX + 22, y: latchY - 25 },
                    { x: latchX + 30, y: latchY - 25 },
                    { x: latchX + 30, y: latchY },
                    { x: latchX - 30, y: latchY },
                    { x: latchX - 20, y: latchY + 20 },
                    { x: latchX + 22, y: latchY + 25 },
                    { x: latchX + 50, y: latchY + 25 }
                ],
                speed: 1.5,
                offset: 350
            });

            // --- C. WAVEFORM DISPLAY SCREEN BLOCKS ---
            waveformDisplays = [
                {
                    type: 'analog',
                    name: 'Oscilloscope',
                    x: w < 768 ? w * 0.05 : w * 0.05,
                    y: w < 768 ? h * 0.82 : h * 0.78,
                    w: w < 768 ? 100 : 130,
                    h: w < 768 ? 65 : 90
                },
                {
                    type: 'digital',
                    name: 'Logic Analyzer',
                    x: w < 768 ? w * 0.65 : w * 0.83,
                    y: w < 768 ? h * 0.82 : h * 0.78,
                    w: w < 768 ? 100 : 130,
                    h: w < 768 ? 65 : 90
                }
            ];
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initVLSIAndElectronics();
        };

        // --- DRAW FUNCTIONS FOR DISCRETE SCHEMATICS ---
        const drawResistor = (comp, colors) => {
            const { x, y, angle, label } = comp;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.strokeStyle = colors.schematicComponent;
            ctx.lineWidth = 1.5;
            
            ctx.beginPath();
            ctx.moveTo(-20, 0);
            ctx.lineTo(-10, 0);
            ctx.lineTo(-8, -4);
            ctx.lineTo(-4, 4);
            ctx.lineTo(0, -4);
            ctx.lineTo(4, 4);
            ctx.lineTo(8, -4);
            ctx.lineTo(10, 0);
            ctx.lineTo(20, 0);
            ctx.stroke();

            if (label) {
                ctx.fillStyle = colors.text;
                ctx.font = '9px monospace';
                ctx.textAlign = 'center';
                ctx.fillText(label, 0, -8);
            }
            ctx.restore();
        };

        const drawCapacitor = (comp, colors) => {
            const { x, y, angle, label } = comp;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.strokeStyle = colors.schematicComponent;
            ctx.lineWidth = 1.5;

            ctx.beginPath();
            ctx.moveTo(-20, 0);
            ctx.lineTo(-4, 0);
            ctx.moveTo(4, 0);
            ctx.lineTo(20, 0);
            ctx.moveTo(-4, -8); ctx.lineTo(-4, 8);
            ctx.moveTo(4, -8); ctx.lineTo(4, 8);
            ctx.stroke();

            if (label) {
                ctx.fillStyle = colors.text;
                ctx.font = '9px monospace';
                ctx.textAlign = 'center';
                ctx.fillText(label, 0, -11);
            }
            ctx.restore();
        };

        const drawDiode = (comp, colors, isDark) => {
            const { x, y, angle } = comp;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.strokeStyle = colors.schematicComponent;
            ctx.lineWidth = 1.5;

            ctx.beginPath();
            ctx.moveTo(-20, 0); ctx.lineTo(-8, 0);
            ctx.moveTo(8, 0); ctx.lineTo(20, 0);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-8, -7);
            ctx.lineTo(6, 0);
            ctx.lineTo(-8, 7);
            ctx.closePath();
            ctx.fillStyle = isDark ? 'rgba(0, 229, 255, 0.08)' : 'rgba(0, 100, 220, 0.06)';
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(6, -7);
            ctx.lineTo(6, 7);
            ctx.stroke();
            ctx.restore();
        };

        const drawInductor = (comp, colors) => {
            const { x, y, angle, label } = comp;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.strokeStyle = colors.schematicComponent;
            ctx.lineWidth = 1.5;

            ctx.beginPath();
            ctx.moveTo(-22, 0);
            ctx.lineTo(-14, 0);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(-10, 0, 4, Math.PI, 0, false);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(-2, 0, 4, Math.PI, 0, false);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(6, 0, 4, Math.PI, 0, false);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(14, 0, 4, Math.PI, 0, false);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(18, 0);
            ctx.lineTo(22, 0);
            ctx.stroke();

            if (label) {
                ctx.fillStyle = colors.text;
                ctx.font = '9px monospace';
                ctx.textAlign = 'center';
                ctx.fillText(label, 0, -8);
            }
            ctx.restore();
        };

        const drawBJT = (comp, colors) => {
            const { x, y, bjtType } = comp;
            ctx.save();
            ctx.translate(x, y);
            ctx.strokeStyle = colors.schematicComponent;
            ctx.lineWidth = 1.5;

            ctx.beginPath();
            ctx.moveTo(-5, -10);
            ctx.lineTo(-5, 10);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-20, 0);
            ctx.lineTo(-5, 0);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-5, -5);
            ctx.lineTo(8, -14);
            ctx.lineTo(24, -14);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-5, 5);
            ctx.lineTo(8, 14);
            ctx.lineTo(24, 14);
            ctx.stroke();

            ctx.save();
            ctx.translate(8, 14);
            const arrowAngle = Math.atan2(9, 13);
            ctx.rotate(arrowAngle);
            ctx.beginPath();
            ctx.moveTo(-7, -3.5);
            ctx.lineTo(0, 0);
            ctx.lineTo(-7, 3.5);
            ctx.stroke();
            ctx.restore();

            ctx.beginPath();
            ctx.arc(5, 0, 16, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = colors.text;
            ctx.font = '7px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(bjtType, 5, 23);

            ctx.restore();
        };

        const drawOpAmp = (comp, colors) => {
            const { x, y } = comp;
            ctx.save();
            ctx.translate(x, y);
            ctx.strokeStyle = colors.schematicComponent;
            ctx.lineWidth = 1.5;

            // Draw triangle pointing right
            ctx.beginPath();
            ctx.moveTo(-15, -15);
            ctx.lineTo(-15, 15);
            ctx.lineTo(15, 0);
            ctx.closePath();
            ctx.stroke();

            // Leads
            ctx.beginPath();
            ctx.moveTo(-25, -6); ctx.lineTo(-15, -6); 
            ctx.moveTo(-25, 6); ctx.lineTo(-15, 6);   
            ctx.moveTo(15, 0); ctx.lineTo(25, 0);      
            ctx.stroke();

            // Labels inside triangle
            ctx.fillStyle = colors.text;
            ctx.font = 'bold 8px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('-', -10, -6);
            ctx.fillText('+', -10, 6);
            
            ctx.font = '7px monospace';
            ctx.fillText('OPAMP', -2, 0);
            ctx.restore();
        };

        const draw555Timer = (comp, colors) => {
            const { x, y } = comp;
            ctx.save();
            ctx.translate(x, y);
            ctx.strokeStyle = colors.schematicComponent;
            ctx.lineWidth = 1.5;

            // Draw rectangular IC block
            ctx.fillStyle = colors.cellBg;
            ctx.fillRect(-22, -25, 44, 50);
            ctx.strokeRect(-22, -25, 44, 50);

            // Pins: left side (1, 2, 3, 4) and right side (8, 7, 6, 5)
            const pinY = [-15, -5, 5, 15];
            ctx.beginPath();
            pinY.forEach(py => {
                ctx.moveTo(-32, py); ctx.lineTo(-22, py); // Left
                ctx.moveTo(22, py); ctx.lineTo(32, py);   // Right
            });
            ctx.stroke();

            // Pin Labels inside the box
            ctx.fillStyle = colors.text;
            ctx.font = '6px monospace';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            
            ctx.fillText('1 GND', -18, -15);
            ctx.fillText('2 TRG', -18, -5);
            ctx.fillText('3 OUT', -18, 5);
            ctx.fillText('4 RST', -18, 15);

            ctx.textAlign = 'right';
            ctx.fillText('VCC 8', 18, -15);
            ctx.fillText('DIS 7', 18, -5);
            ctx.fillText('THR 6', 18, 5);
            ctx.fillText('CON 5', 18, 15);

            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('555', 0, 0);

            ctx.restore();
        };

        const drawNANDGate = (comp, colors) => {
            const { x, y } = comp;
            ctx.save();
            ctx.translate(x, y);
            ctx.strokeStyle = colors.poly;
            ctx.lineWidth = 1.5;

            ctx.beginPath();
            ctx.moveTo(-12, -10);
            ctx.lineTo(-2, -10);
            ctx.arc(-2, 0, 10, -Math.PI / 2, Math.PI / 2);
            ctx.lineTo(-12, 10);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(11, 0, 3, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-20, -5); ctx.lineTo(-12, -5);
            ctx.moveTo(-20, 5); ctx.lineTo(-12, 5);
            ctx.moveTo(14, 0); ctx.lineTo(22, 0);
            ctx.stroke();
            
            ctx.restore();
        };

        const drawGround = (x, y, colors) => {
            ctx.strokeStyle = colors.schematicWire;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + 8);
            ctx.moveTo(x - 10, y + 8); ctx.lineTo(x + 10, y + 8);
            ctx.moveTo(x - 6, y + 11); ctx.lineTo(x + 6, y + 11);
            ctx.moveTo(x - 2, y + 14); ctx.lineTo(x + 2, y + 14);
            ctx.stroke();
        };

        // --- DRAW FUNCTIONS FOR VLSI SCHEMATICS ---
        const drawGate = (g, colors) => {
            const { x, y, type } = g;
            ctx.strokeStyle = colors.poly;
            ctx.lineWidth = 1.5;

            if (type === 'AND') {
                ctx.beginPath();
                ctx.moveTo(x - 12, y - 10);
                ctx.lineTo(x - 2, y - 10);
                ctx.arc(x - 2, y, 10, -Math.PI / 2, Math.PI / 2);
                ctx.lineTo(x - 12, y + 10);
                ctx.closePath();
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(x - 20, y - 5); ctx.lineTo(x - 12, y - 5);
                ctx.moveTo(x - 20, y + 5); ctx.lineTo(x - 12, y + 5);
                ctx.moveTo(x + 8, y); ctx.lineTo(x + 16, y);
                ctx.stroke();
            } else if (type === 'OR') {
                ctx.beginPath();
                ctx.moveTo(x - 14, y - 10);
                ctx.quadraticCurveTo(x - 4, y - 10, x + 8, y);
                ctx.quadraticCurveTo(x - 4, y + 10, x - 14, y + 10);
                ctx.quadraticCurveTo(x - 9, y, x - 14, y - 10);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(x - 20, y - 5); ctx.lineTo(x - 11, y - 5);
                ctx.moveTo(x - 20, y + 5); ctx.lineTo(x - 11, y + 5);
                ctx.moveTo(x + 8, y); ctx.lineTo(x + 16, y);
                ctx.stroke();
            } else if (type === 'NOT') {
                ctx.beginPath();
                ctx.moveTo(x - 10, y - 9);
                ctx.lineTo(x + 4, y);
                ctx.lineTo(x - 10, y + 9);
                ctx.closePath();
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(x + 7, y, 3, 0, Math.PI * 2);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(x - 18, y); ctx.lineTo(x - 10, y);
                ctx.moveTo(x + 10, y); ctx.lineTo(x + 17, y);
                ctx.stroke();
            }
        };

        const drawCMOSTransistor = (t, colors) => {
            const { x, y, type } = t;

            ctx.strokeStyle = colors.diffusion;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(x - 4, y - 10);
            ctx.lineTo(x - 4, y + 10);
            ctx.stroke();

            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x - 4, y - 10); ctx.lineTo(x - 12, y - 10);
            ctx.moveTo(x - 4, y + 10); ctx.lineTo(x - 12, y + 10);
            ctx.stroke();

            ctx.strokeStyle = colors.poly;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(x + 2, y - 9);
            ctx.lineTo(x + 2, y + 9);
            ctx.stroke();

            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x + 2, y);
            ctx.lineTo(x + 10, y);
            ctx.stroke();

            if (type === 'pMOS') {
                ctx.beginPath();
                ctx.arc(x - 1, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = colors.cellBg;
                ctx.fill();
                ctx.strokeStyle = colors.poly;
                ctx.stroke();
            }
            
            ctx.fillStyle = colors.text;
            ctx.font = '7px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(type === 'pMOS' ? 'PMOS' : 'NMOS', x - 2, y + 17);
        };

        // --- DRAW FUNCTIONS FOR WAVEFORM SCREENS ---
        const drawScreenGrid = (x, y, w, h, colors) => {
            ctx.fillStyle = colors.cellBg;
            ctx.fillRect(x, y, w, h);
            
            ctx.strokeStyle = colors.cellBorder;
            ctx.lineWidth = 2.0;
            ctx.strokeRect(x, y, w, h);

            ctx.strokeStyle = colors.cellBorder;
            ctx.lineWidth = 0.5;
            ctx.setLineDash([2, 3]);

            const divsX = 6;
            for (let i = 1; i < divsX; i++) {
                const gx = x + (w / divsX) * i;
                ctx.beginPath();
                ctx.moveTo(gx, y);
                ctx.lineTo(gx, y + h);
                ctx.stroke();
            }

            const divsY = 4;
            for (let i = 1; i < divsY; i++) {
                const gy = y + (h / divsY) * i;
                ctx.beginPath();
                ctx.moveTo(x, gy);
                ctx.lineTo(x + w, gy);
                ctx.stroke();
            }
            ctx.setLineDash([]);
        };

        const drawAnalogDisplay = (screen, colors) => {
            const { x, y, w, h, name } = screen;
            drawScreenGrid(x, y, w, h, colors);

            ctx.fillStyle = colors.text;
            ctx.font = '8px monospace';
            ctx.textAlign = 'left';
            ctx.fillText(name, x + 4, y - 5);

            ctx.strokeStyle = colors.signal;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            
            for (let dx = 0; dx <= w; dx++) {
                const sin1 = Math.sin((dx * 0.07) - timeOffset * 0.05) * (h * 0.28);
                const sin2 = Math.sin((dx * 0.015) - timeOffset * 0.01) * (h * 0.08);
                const wy = y + h / 2 + sin1 + sin2;

                if (dx === 0) {
                    ctx.moveTo(x + dx, wy);
                } else {
                    ctx.lineTo(x + dx, wy);
                }
            }
            ctx.stroke();
        };

        const drawDigitalDisplay = (screen, colors) => {
            const { x, y, w, h, name } = screen;
            drawScreenGrid(x, y, w, h, colors);

            ctx.fillStyle = colors.text;
            ctx.font = '8px monospace';
            ctx.textAlign = 'left';
            ctx.fillText(name, x + 4, y - 5);

            const chH = h / 4; 
            const signalColors = [colors.signal, colors.clkSignal, colors.poly];

            for (let ch = 0; ch < 3; ch++) {
                const chY = y + chH * (ch + 0.85);
                ctx.strokeStyle = signalColors[ch % signalColors.length];
                ctx.lineWidth = 1.5;
                ctx.beginPath();

                let lastState = 0;
                for (let dx = 0; dx <= w; dx++) {
                    const t = dx + timeOffset * 1.6;
                    let state = 0;

                    if (ch === 0) {
                        state = Math.floor(t / 12) % 2 === 0 ? 0.75 : -0.75;
                    } else if (ch === 1) {
                        state = (Math.floor(t / 25) % 3 === 0 || Math.floor(t / 45) % 2 === 0) ? 0.75 : -0.75;
                    } else {
                        state = Math.floor(t / 65) % 2 === 0 ? 0.75 : -0.75;
                    }

                    const wy = chY - state * chH * 0.38;

                    if (dx === 0) {
                        ctx.moveTo(x + dx, wy);
                    } else {
                        if (state !== lastState) {
                            ctx.lineTo(x + dx, chY - lastState * chH * 0.38); 
                        }
                        ctx.lineTo(x + dx, wy);
                    }
                    lastState = state;
                }
                ctx.stroke();
            }
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
                for (let i = 0; i < 4; i++) {
                    ctx.beginPath();
                    ctx.moveTo(bus.x1, bus.y + i * 5);
                    ctx.lineTo(bus.x2, bus.y + i * 5);
                    ctx.stroke();
                }

                const pulseProg = (timeOffset * bus.speed + bus.offset) % (bus.length + 150);
                if (pulseProg < bus.length + 30) {
                    ctx.strokeStyle = colors.signal;
                    const wireIdx = Math.floor(bus.offset) % 4;
                    const py = bus.y + wireIdx * 5;

                    ctx.beginPath();
                    ctx.moveTo(Math.max(bus.x1, bus.x1 + pulseProg - 30), py);
                    ctx.lineTo(Math.min(bus.x2, bus.x1 + pulseProg), py);
                    ctx.lineWidth = 5.0;
                    const originalAlpha = ctx.globalAlpha;
                    ctx.globalAlpha = isDark ? 0.35 : 0.2;
                    ctx.stroke();

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

            const clkCycle = (timeOffset * 0.4) % 100;
            clockTreeBranches.forEach(branch => {
                ctx.strokeStyle = colors.clkSignal;
                ctx.beginPath();
                ctx.moveTo(branch.x1, branch.y1);
                ctx.lineTo(branch.x2, branch.y2);
                ctx.lineWidth = 4.5;
                const originalAlpha = ctx.globalAlpha;
                ctx.globalAlpha = (clkCycle > 20 && clkCycle < 80) ? (isDark ? 0.25 : 0.18) : 0.05;
                ctx.stroke();

                ctx.lineWidth = 1.5;
                ctx.globalAlpha = originalAlpha;
                ctx.stroke();
            });

            // --- 3. Draw Integrated Circuit (IC) Standard Cells ---
            cells.forEach(cell => {
                ctx.fillStyle = colors.cellBg;
                ctx.fillRect(cell.x, cell.y, cell.w, cell.h);
                ctx.strokeStyle = colors.cellBorder;
                ctx.lineWidth = 1.5;
                ctx.strokeRect(cell.x, cell.y, cell.w, cell.h);

                ctx.strokeStyle = colors.metal1;
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(cell.x, cell.y);
                ctx.lineTo(cell.x + cell.w, cell.y);
                ctx.stroke();

                ctx.strokeStyle = isDark ? 'rgba(50, 50, 50, 0.4)' : 'rgba(200, 200, 200, 0.5)';
                ctx.beginPath();
                ctx.moveTo(cell.x, cell.y + cell.h);
                ctx.lineTo(cell.x + cell.w, cell.y + cell.h);
                ctx.stroke();

                ctx.fillStyle = colors.text;
                ctx.font = 'bold 11px "Fira Code", monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(cell.label, cell.x + cell.w / 2, cell.y + cell.h / 2);

                ctx.fillStyle = colors.poly;
                ctx.fillRect(cell.x + 8, cell.y + 10, 4, 4);
                ctx.fillStyle = colors.diffusion;
                ctx.fillRect(cell.x + cell.w - 12, cell.y + 10, 4, 4);
            });

            // --- 4. Draw Logic Gate Symbols ---
            gates.forEach(g => drawGate(g, colors));

            // --- 5. Draw CMOS Transistors ---
            CMOSmTransistors.forEach(t => drawCMOSTransistor(t, colors));


            // --- 6. Draw Discrete Electronics Connected Circuits ---
            discreteCircuits.forEach(circ => {
                ctx.strokeStyle = colors.schematicWire;
                ctx.lineWidth = 1.5;
                circ.wires.forEach(w => {
                    ctx.beginPath();
                    ctx.moveTo(w.x1, w.y1);
                    ctx.lineTo(w.x2, w.y2);
                    ctx.stroke();
                });

                if (circ.ground) {
                    drawGround(circ.ground.x, circ.ground.y, colors);
                }

                circ.components.forEach(comp => {
                    if (comp.type === 'Resistor') {
                        drawResistor(comp, colors);
                    } else if (comp.type === 'Capacitor') {
                        drawCapacitor(comp, colors);
                    } else if (comp.type === 'Diode') {
                        drawDiode(comp, colors, isDark);
                    } else if (comp.type === 'Inductor') {
                        drawInductor(comp, colors);
                    } else if (comp.type === 'BJT') {
                        drawBJT(comp, colors);
                    } else if (comp.type === 'OpAmp') {
                        drawOpAmp(comp, colors);
                    } else if (comp.type === 'CMOSTransistor') {
                        drawCMOSTransistor({ x: comp.x, y: comp.y, type: comp.cType }, colors);
                    } else if (comp.type === '555Timer') {
                        draw555Timer(comp, colors);
                    } else if (comp.type === 'NANDGate') {
                        drawNANDGate(comp, colors);
                    }
                });

                ctx.fillStyle = colors.text;
                ctx.font = 'italic bold 10px "Fira Code", monospace';
                ctx.textAlign = 'left';
                const firstComp = circ.components[0];
                ctx.fillText(`[ ${circ.name} ]`, firstComp.x - 40, firstComp.y - 65);

                const pathLen = circ.signalPath.length;
                if (pathLen > 1) {
                    let totalLen = 0;
                    const segments = [];
                    for (let i = 0; i < pathLen - 1; i++) {
                        const p1 = circ.signalPath[i];
                        const p2 = circ.signalPath[i + 1];
                        const len = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
                        segments.push({ p1, p2, start: totalLen, len });
                        totalLen += len;
                    }

                    const signalProg = (timeOffset * circ.speed + circ.offset) % (totalLen + 80);
                    if (signalProg < totalLen) {
                        ctx.strokeStyle = colors.signal;
                        
                        segments.forEach(seg => {
                            const isSignalOnSegment = signalProg > seg.start && signalProg < seg.start + seg.len + 25;
                            if (isSignalOnSegment) {
                                const progOnSeg = signalProg - seg.start;
                                const dx = seg.p2.x - seg.p1.x;
                                const dy = seg.p2.y - seg.p1.y;
                                const angle = Math.atan2(dy, dx);

                                const pulseX1 = seg.p1.x + Math.max(0, progOnSeg - 25) * Math.cos(angle);
                                const pulseY1 = seg.p1.y + Math.max(0, progOnSeg - 25) * Math.sin(angle);
                                const pulseX2 = seg.p1.x + Math.min(seg.len, progOnSeg) * Math.cos(angle);
                                const pulseY2 = seg.p1.y + Math.min(seg.len, progOnSeg) * Math.sin(angle);

                                ctx.beginPath();
                                ctx.moveTo(pulseX1, pulseY1);
                                ctx.lineTo(pulseX2, pulseY2);
                                ctx.lineWidth = 5.0;
                                const originalAlpha = ctx.globalAlpha;
                                ctx.globalAlpha = isDark ? 0.35 : 0.2;
                                ctx.stroke();

                                ctx.lineWidth = 1.5;
                                ctx.globalAlpha = originalAlpha;
                                ctx.stroke();
                            }
                        });
                    }
                }
            });


            // --- 7. Draw Waveform Display Screens ---
            waveformDisplays.forEach(screen => {
                if (screen.type === 'analog') {
                    drawAnalogDisplay(screen, colors);
                } else if (screen.type === 'digital') {
                    drawDigitalDisplay(screen, colors);
                }
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
            {/* Faint background Grid */}
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

            {/* VLSI & Discrete Electronics Schematic Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-[0.88] dark:opacity-[0.70]"
            />
        </div>
    );
};

export default Background;
