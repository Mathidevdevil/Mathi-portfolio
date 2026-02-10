import React, { useState, useEffect, useRef } from 'react';
import HALO from 'vanta/dist/vanta.halo.min';
import * as THREE from 'three';

const VantaBackground = () => {
    const [vantaEffect, setVantaEffect] = useState(null);
    const myRef = useRef(null);

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                HALO({
                    el: myRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    size: 1.5,
                    backgroundColor: 0x111827 // Dark background (matches dark mode)
                })
            );
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <div ref={myRef} className="fixed inset-0 z-0 pointer-events-none" />
    );
};

export default VantaBackground;
