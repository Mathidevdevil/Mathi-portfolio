import React from 'react';
import { motion } from 'framer-motion';
import { userData } from '../data/user';
import { Cpu } from 'lucide-react';

import DecryptedText from '../components/DecryptedText';
import GlitchText from '../components/GlitchText';

const Hero = () => {

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent text-gray-900 dark:text-white px-4 py-20 transition-colors duration-300">
            {/* Decorative Glows (kept but reduced for cleaner look) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyan/5 dark:bg-cyan/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10 text-center space-y-4 md:space-y-6 max-w-4xl w-full"
            >
                <div className="h-[120px] sm:h-[150px] md:h-[200px] w-full flex items-center justify-center relative z-20">
                    <GlitchText text={userData.personal.name} />
                </div>

                <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent via-cyan to-transparent mx-auto my-4 md:my-6" />

                <h2 className="text-xl sm:text-2xl md:text-3xl font-mono text-gray-600 dark:text-gray-400 px-4 flex justify-center items-center gap-2">
                    I am a <span className="text-cyan dark:text-neon">
                        <DecryptedText
                            text={userData.personal.role}
                            speed={60}
                            maxIterations={20}
                            revealDirection="center"
                            animateOn="view"
                            className="text-cyan dark:text-neon font-bold"
                            encryptedClassName="text-cyan/50 dark:text-neon/50"
                        />
                    </span>
                </h2>

                <p className="text-gray-600 dark:text-gray-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4">
                    {userData.personal.tagline}
                </p>

                <div className="pt-6 md:pt-10 flex flex-wrap gap-3 md:gap-6 justify-center px-4">
                    <a href="#projects" className="cyber-button group text-sm md:text-base">
                        <span className="relative z-10 flex items-center gap-2">
                            <Cpu size={18} className="md:w-5 md:h-5" />
                            View My works
                        </span>
                        <div className="absolute inset-0 bg-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </a>
                    <a href="#contact" className="cyber-button group !border-cyan dark:!border-neon !text-cyan dark:!text-neon text-sm md:text-base">
                        <span className="relative z-10">Contact </span>
                        <div className="absolute inset-0 bg-cyan/20 dark:bg-neon/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </a>
                    <a href={userData.personal.resume} target="_blank" rel="noopener noreferrer" className="cyber-button group !border-gray-500 !text-gray-500 hover:!text-cyan dark:hover:!text-neon text-sm md:text-base">
                        <span className="relative z-10">Resume</span>
                        <div className="absolute inset-0 bg-gray-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </a>

                </div>
            </motion.div>


        </section>
    );
};

export default Hero;
