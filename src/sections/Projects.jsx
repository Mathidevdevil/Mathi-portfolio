import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { userData } from '../data/user';
import { Github, ExternalLink, Folder, X, Target, Zap, Cpu, Shield, TrendingUp, CheckCircle } from 'lucide-react';
import MagicBento, { MagicBentoCard } from '../components/MagicBento';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const categories = [
        { id: 'fullstack', label: 'Full Stack Projects', icon: Cpu, color: 'from-blue-500 to-cyan-500', textColor: 'text-blue-500', bgColor: 'bg-blue-500' },
        { id: 'ml', label: 'Machine Learning Projects', icon: TrendingUp, color: 'from-purple-500 to-pink-500', textColor: 'text-purple-500', bgColor: 'bg-purple-500' },
        { id: 'iot', label: 'IoT Projects', icon: Zap, color: 'from-green-500 to-emerald-500', textColor: 'text-green-500', bgColor: 'bg-green-500' }
    ];

    const ProjectModal = ({ project, onClose }) => {
        if (!project || !project.details) return null;

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white dark:bg-darker border border-gray-200 dark:border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10"
                    >
                        <X className="text-gray-900 dark:text-gray-100" size={20} />
                    </button>

                    {/* Header */}
                    <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-start gap-4 mb-4">
                            <Folder className="text-cyan-600 dark:text-cyan-400 flex-shrink-0" size={40} />
                            <div className="flex-1">
                                <h2 className="text-2xl md:text-3xl font-cyber font-bold text-gray-900 dark:text-white mb-2">
                                    {project.title}
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t, i) => (
                                <span key={i} className="text-xs font-mono text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-900/30 px-3 py-1 rounded">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 space-y-6">
                        {/* Objectives */}
                        {project.details.objectives && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Target className="text-cyan-600 dark:text-cyan-400" size={20} />
                                    <h3 className="text-xl font-cyber font-bold text-cyan-700 dark:text-cyan-400">
                                        Objectives
                                    </h3>
                                </div>
                                <ul className="space-y-2 ml-7">
                                    {project.details.objectives.map((obj, i) => (
                                        <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                            <span className="text-cyan-600 dark:text-cyan-400 mt-1">•</span>
                                            <span>{obj}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Features */}
                        {project.details.features && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Zap className="text-cyan-600 dark:text-cyan-400" size={20} />
                                    <h3 className="text-xl font-cyber font-bold text-cyan-700 dark:text-cyan-400">
                                        Key Features
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-7">
                                    {project.details.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <CheckCircle className="text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" size={16} />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Hardware (for IoT projects) */}
                        {project.details.hardware && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Cpu className="text-cyan-600 dark:text-cyan-400" size={20} />
                                    <h3 className="text-xl font-cyber font-bold text-cyan-700 dark:text-cyan-400">
                                        Hardware Components
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-7">
                                    {project.details.hardware.map((hw, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <span className="text-cyan-600 dark:text-cyan-400">▸</span>
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">{hw}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Technologies */}
                        {project.details.technologies && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Cpu className="text-cyan-600 dark:text-cyan-400" size={20} />
                                    <h3 className="text-xl font-cyber font-bold text-cyan-700 dark:text-cyan-400">
                                        Technologies
                                    </h3>
                                </div>
                                <div className="ml-7 space-y-2">
                                    {Object.entries(project.details.technologies).map(([key, values]) => (
                                        <div key={key}>
                                            <span className="text-cyan-600 dark:text-cyan-400 font-semibold capitalize text-sm">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                                            </span>
                                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-2">
                                                {Array.isArray(values) ? values.join(', ') : values}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Security (for IoT projects) */}
                        {project.details.security && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Shield className="text-cyan-600 dark:text-cyan-400" size={20} />
                                    <h3 className="text-xl font-cyber font-bold text-cyan-700 dark:text-cyan-400">
                                        Security Measures
                                    </h3>
                                </div>
                                <ul className="space-y-2 ml-7">
                                    {project.details.security.map((sec, i) => (
                                        <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                            <Shield className="text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" size={14} />
                                            <span className="text-sm">{sec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Implementation Highlights */}
                        {project.details.highlights && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <TrendingUp className="text-cyan-600 dark:text-cyan-400" size={20} />
                                    <h3 className="text-xl font-cyber font-bold text-cyan-700 dark:text-cyan-400">
                                        Implementation Highlights
                                    </h3>
                                </div>
                                <ul className="space-y-2 ml-7">
                                    {project.details.highlights.map((highlight, i) => (
                                        <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                            <span className="text-cyan-600 dark:text-cyan-400 mt-1">✓</span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Future Enhancements (for IoT projects) */}
                        {project.details.futureEnhancements && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Zap className="text-cyan-600 dark:text-cyan-400" size={20} />
                                    <h3 className="text-xl font-cyber font-bold text-cyan-700 dark:text-cyan-400">
                                        Future Enhancements
                                    </h3>
                                </div>
                                <ul className="space-y-2 ml-7">
                                    {project.details.futureEnhancements.map((enhancement, i) => (
                                        <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                            <span className="text-cyan-600 dark:text-cyan-400 mt-1">→</span>
                                            <span>{enhancement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Outcome */}
                        {project.details.outcome && (
                            <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-xl p-4">
                                <h3 className="text-lg font-cyber font-bold text-cyan-700 dark:text-cyan-300 mb-2">
                                    Outcome
                                </h3>
                                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                                    {project.details.outcome}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-800 flex gap-4">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-lg transition-colors font-semibold"
                        >
                            <Github size={20} />
                            View Code
                        </a>
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
                            >
                                <ExternalLink size={20} />
                                Live Demo
                            </a>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    const CategorySection = ({ category, projects, index }) => {
        const Icon = category.icon;

        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="mb-16"
            >
                {/* Category Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Icon className={category.textColor} size={20} />
                        <h3 className={`text-lg md:text-xl font-cyber font-bold ${category.textColor}`}>
                            {category.label}
                        </h3>
                    </div>
                </div>

                {/* Projects Grid */}
                <MagicBento wrapperClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-none">
                    {projects?.map((project, projectIndex) => (
                        <motion.div
                            key={projectIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: projectIndex * 0.1 }}
                            className="h-full"
                        >
                            <MagicBentoCard
                                onClick={() => setSelectedProject(project)}
                                className="border border-black/10 dark:border-white/10 p-6 rounded-2xl relative overflow-hidden group shadow-lg hover:shadow-xl dark:shadow-none cursor-pointer transition-all h-full flex flex-col"
                                enableStars={false}
                                enableTilt={true}
                                style={{ aspectRatio: 'auto', minHeight: 'auto' }}
                            >
                                {/* Hover Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <Folder className="text-cyan-600 dark:text-cyan-400" size={40} />
                                        <div className="flex gap-4">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-gray-600 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
                                            >
                                                <Github size={20} />
                                            </a>
                                            {project.demo && (
                                                <a
                                                    href={project.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-gray-600 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
                                                >
                                                    <ExternalLink size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className={`text-xl font-bold font-cyber mb-3 ${category.textColor} transition-colors`}>
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-6 leading-relaxed min-h-[60px] flex-grow">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto mb-4">
                                        {project.tech.slice(0, 3).map((t, i) => (
                                            <span key={i} className={`text-xs font-mono text-white ${category.bgColor} px-3 py-1.5 rounded font-semibold`}>
                                                {t}
                                            </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className="text-xs font-mono text-gray-600 dark:text-gray-400 px-2 py-1">
                                                +{project.tech.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    <div className={`${category.textColor} text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto`}>
                                        View Details
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </MagicBentoCard>
                        </motion.div>
                    ))}
                </MagicBento>
            </motion.div>
        );
    };

    return (
        <section id="projects" className="py-12 md:py-20 bg-transparent text-gray-900 dark:text-white transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-12 md:mb-16 flex items-center gap-3 md:gap-4"
                >
                    <h2 className="text-3xl md:text-4xl font-cyber font-bold text-gray-900 dark:text-white whitespace-nowrap">
                        My Works
                    </h2>
                    <div className="h-px flex-1 bg-gray-300 dark:bg-gray-800" />
                </motion.div>

                {/* All Categories Displayed Vertically */}
                {categories.map((category, index) => (
                    <CategorySection
                        key={category.id}
                        category={category}
                        projects={userData.projects[category.id]}
                        index={index}
                    />
                ))}
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
