import React from 'react';
import { motion } from 'framer-motion';
import { userData } from '../data/user';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import MagicBento, { MagicBentoCard } from '../components/MagicBento';

const Certifications = () => {
    return (
        <section id="certifications" className="py-12 md:py-20 bg-transparent text-gray-900 dark:text-white relative transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-8 md:mb-16 flex items-center gap-3 md:gap-4"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-cyber font-bold text-gray-900 dark:text-white">
                        Acquired Certificates
                    </h2>
                    <div className="h-px flex-1 bg-gray-300 dark:bg-gray-800" />
                </motion.div>

                <MagicBento wrapperClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-none">
                    {userData.certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <MagicBentoCard
                                className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 p-6 rounded-xl hover:border-cyan/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.1)] transition-all duration-300 group h-full flex flex-col justify-between"
                                enableStars={false}
                                enableTilt={true}
                                style={{ aspectRatio: 'auto', minHeight: 'auto' }}
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div className="p-3 rounded-lg bg-cyan/10 text-cyan group-hover:bg-cyan group-hover:text-darker transition-colors">
                                            <Award size={24} />
                                        </div>
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-cyan transition-colors"
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>

                                    <h3 className="text-lg font-bold font-cyber mb-2 text-cyan-700 dark:text-cyan-400 group-hover:text-cyan transition-colors relative z-10">
                                        {cert.title}
                                    </h3>

                                    <p className="text-gray-800 dark:text-gray-200 font-bold text-sm mb-4 relative z-10">
                                        {cert.issuer}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center text-xs font-mono text-gray-500 dark:text-gray-500 pt-4 border-t border-gray-100 dark:border-gray-800 relative z-10">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {cert.date}
                                    </span>
                                    <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-cyan dark:text-neon">
                                        {cert.type}
                                    </span>
                                </div>
                            </MagicBentoCard>
                        </motion.div>
                    ))}
                </MagicBento>
            </div>
        </section>
    );
};

export default Certifications;
