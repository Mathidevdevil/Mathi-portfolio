import React from 'react';
import { userData } from '../data/user';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import MagicBento, { MagicBentoCard } from '../components/MagicBento';
import PixelCard from '../components/PixelCard';

const Certifications = () => {
    return (
        <section id="certifications" className="py-12 md:py-20 bg-transparent text-gray-900 dark:text-white relative transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div
                    className="mb-8 md:mb-16 flex items-center gap-3 md:gap-4"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-cyber font-bold text-gray-900 dark:text-white">
                        Acquired Certificates
                    </h2>
                    <div className="h-px flex-1 bg-gray-300 dark:bg-gray-800" />
                </div>

                <MagicBento wrapperClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-none">
                    {userData.certifications.map((cert, index) => (
                        <div
                            key={index}
                        >
                            <PixelCard
                                variant="yellow"
                                className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-black rounded-xl hover:border-cyan/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.1)] transition-all duration-300 group h-full flex flex-col justify-between w-full"
                            >
                                <div className="relative z-10 w-full h-full p-4 md:p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-4 relative z-10">
                                            <div className="p-3 rounded-lg bg-cyan/10 text-cyan group-hover:bg-cyan group-hover:text-darker transition-colors">
                                                <Award size={24} />
                                            </div>
                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 dark:text-gray-300 hover:text-cyan transition-colors"
                                            >
                                                <ExternalLink size={20} />
                                            </a>
                                        </div>

                                        <h3 className="text-lg font-bold font-cyber mb-2 text-cyan-700 dark:text-cyan-400 group-hover:text-cyan transition-colors relative z-10">
                                            {cert.title}
                                        </h3>

                                        <p className="text-black dark:text-white font-bold text-sm mb-4 relative z-10">
                                            {cert.issuer}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center text-xs font-mono text-gray-700 dark:text-gray-300 pt-4 border-t border-gray-100 dark:border-gray-800 relative z-10">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {cert.date}
                                        </span>
                                        <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-cyan dark:text-neon">
                                            {cert.type}
                                        </span>
                                    </div>
                                </div>
                            </PixelCard>
                        </div>
                    ))}
                </MagicBento>
            </div>
        </section>
    );
};

export default Certifications;
