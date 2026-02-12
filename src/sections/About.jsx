import React from 'react';
import { motion } from 'framer-motion';
import { userData } from '../data/user';
import { Award, Download } from 'lucide-react';
import MagicBento, { MagicBentoCard } from '../components/MagicBento';
import PixelCard from '../components/PixelCard';

const About = () => {
    return (
        <section id="about" className="py-12 md:py-20 bg-transparent text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="w-full"
                >
                    <MagicBento
                        wrapperClassName="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center w-full max-w-none"
                        spotlightRadius={300}
                    >
                        {/* Text Content */}
                        <div className="space-y-4 md:space-y-6">
                            <h2 className="text-3xl md:text-4xl font-cyber font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan to-neon">
                                About Me
                            </h2>
                            <div className="h-1 w-16 md:w-20 bg-cyan mb-4 md:mb-6" />
                            <p className="text-gray-900 dark:text-gray-100 text-base md:text-lg leading-relaxed font-mono">
                                {userData.about.description}
                            </p>

                            <div className="pt-2 md:pt-4 flex flex-wrap gap-3 sm:gap-4">
                                <a href={userData.personal.resume} target="_blank" rel="noopener noreferrer" className="cyber-button group inline-flex items-center gap-2 !px-4 !py-2 text-xs md:text-sm">
                                    <span className="relative z-10">Resume</span>
                                    <div className="absolute inset-0 bg-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </a>
                                {userData.personal.resumePdf && (
                                    <a href={userData.personal.resumePdf} download="Mathiyarasu_Resume.pdf" className="cyber-button group inline-flex items-center gap-2 !px-4 !py-2 text-xs md:text-sm !border-green-500 !text-green-500 hover:!text-cyan">
                                        <span className="relative z-10 flex items-center gap-2">
                                            <Download size={14} />
                                            Download Resume
                                        </span>
                                        <div className="absolute inset-0 bg-green-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </a>
                                )}
                            </div>

                            <PixelCard
                                variant="default"
                                className="border border-black rounded-lg bg-cyan/5 backdrop-blur-sm relative overflow-hidden w-full h-full"
                            >
                                <div className="relative z-10 w-full h-full p-4 md:p-6 flex flex-col justify-center">
                                    <div className="absolute top-0 left-0 w-2 h-2 bg-cyan z-20" />
                                    <div className="absolute top-0 right-0 w-2 h-2 bg-cyan z-20" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyan z-20" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan z-20" />

                                    <h3 className="text-cyan dark:text-neon font-bold mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base relative z-10">
                                        <Award size={18} className="md:w-5 md:h-5" />
                                        Certification Status
                                    </h3>
                                    <div className="text-xs md:text-sm font-mono text-gray-900 dark:text-gray-100 space-y-1 relative z-10">
                                        <p className="font-bold">Besant Technologies - Bangalore</p>
                                        <p>Full Stack Java Development</p>
                                        <p>Feb 2025 - July 2025</p>
                                        <p>Status: <span className="text-cyan dark:text-neon">Completed</span></p>
                                    </div>
                                </div>
                            </PixelCard>
                        </div>

                        {/* Timeline / Cards */}
                        <div className="space-y-4">
                            {userData.about.education.map((edu, index) => (
                                <PixelCard
                                    key={index}
                                    variant="blue"
                                    className="group relative border border-black hover:border-cyan dark:hover:border-neon transition-colors duration-300 bg-white dark:bg-darker/50 w-full h-full rounded-xl"
                                >
                                    <div className="relative z-10 w-full h-full p-4 md:p-6 flex flex-col justify-center">
                                        <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-gray-50 dark:bg-dark border-2 border-gray-300 dark:border-gray-700 group-hover:border-cyan dark:group-hover:border-neon group-hover:bg-cyan dark:group-hover:bg-neon transition-all z-20" />
                                        <span className="text-cyan font-mono text-sm relative z-10">{edu.year}</span>
                                        <h4 className="text-xl font-bold mt-1 text-gray-900 dark:text-white group-hover:text-cyan dark:group-hover:text-neon transition-colors relative z-10">
                                            {edu.degree || edu.role}
                                        </h4>
                                        <p className="text-gray-800 dark:text-gray-300 text-sm mb-2 relative z-10">{edu.institution}</p>
                                        <p className="text-gray-700 dark:text-gray-400 font-mono text-xs relative z-10">{edu.details}</p>
                                    </div>
                                </PixelCard>
                            ))}
                        </div>
                    </MagicBento>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
