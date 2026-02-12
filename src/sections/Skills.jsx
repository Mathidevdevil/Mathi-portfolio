import React from 'react';
import { motion } from 'framer-motion';
import { userData } from '../data/user';
import { Database, Code, Server, Wrench, Workflow } from 'lucide-react';
import MagicBento, { MagicBentoCard } from '../components/MagicBento';
import PixelCard from '../components/PixelCard';

const SkillCard = ({ title, skills, icon: Icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
    >
        <PixelCard
            variant="blue"
            className="rounded-xl border border-black hover:border-cyan/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.1)] transition-all duration-300 group w-full h-full"
        >
            <div className="relative z-10 w-full h-full p-4 md:p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="p-3 rounded-lg bg-cyan/10 text-cyan group-hover:bg-cyan group-hover:text-darker transition-colors">
                        <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold font-cyber text-cyan-700 dark:text-cyan-400">{title}</h3>
                </div>
                <div className="space-y-3 relative z-10">
                    {skills.map((skill, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ x: 10, color: '#00f3ff' }}
                            className="flex justify-between items-center text-sm font-mono text-gray-900 dark:text-gray-100 cursor-pointer p-2 rounded hover:bg-cyan/5 transition-colors"
                        >
                            <span>{skill}</span>
                            <span className="opacity-0 group-hover/skill:opacity-100 text-cyan dark:text-neon text-xs">&gt;_</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </PixelCard>
    </motion.div>
);

const Skills = () => {
    return (
        <section id="tech-stacks" className="py-20 bg-transparent text-gray-900 dark:text-white relative transition-colors duration-300">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-cyber font-bold mb-4">
                        <span className="text-cyan dark:text-neon">&lt;</span> Tech Stacks <span className="text-cyan dark:text-neon">/&gt;</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 font-mono">Core processing modules and languages</p>
                </motion.div>

                <MagicBento wrapperClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-none">
                    <SkillCard title="Frontend" skills={userData.skills.frontend} icon={Code} delay={0} />
                    <SkillCard title="Backend" skills={userData.skills.backend} icon={Server} delay={0.2} />
                    <SkillCard title="Database" skills={userData.skills.database} icon={Database} delay={0.4} />
                    <SkillCard title="Tools" skills={userData.skills.tools} icon={Wrench} delay={0.6} />
                    <SkillCard title="Automation" skills={userData.skills.automation} icon={Workflow} delay={0.8} />
                </MagicBento>
            </div>
        </section>
    );
};

export default Skills;
