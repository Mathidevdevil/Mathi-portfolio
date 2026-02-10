import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Wrench, CheckCircle, Smartphone } from 'lucide-react';

const ServiceCard = ({ title, icon: Icon }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gray-50 dark:bg-darker border border-gray-200 dark:border-gray-800 p-6 rounded-xl hover:border-cyan/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.1)] transition-all duration-300"
    >
        <div className="p-3 rounded-lg bg-cyan/10 text-cyan w-fit mb-4">
            <Icon size={30} />
        </div>
        <h3 className="text-xl font-bold font-cyber text-gray-900 dark:text-white mb-2">{title}</h3>

    </motion.div>
);

const BenefitItem = ({ text }) => (
    <div className="flex items-center gap-3">
        <CheckCircle className="text-cyan shrink-0" size={20} />
        <span className="text-gray-700 dark:text-gray-300 font-mono">{text}</span>
    </div>
);

const Freelancing = () => {
    return (
        <section id="freelancing" className="py-20 bg-transparent text-gray-900 dark:text-white relative transition-colors duration-300">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-cyber font-bold mb-4">
                        <span className="text-cyan dark:text-neon">&lt;</span> Freelancing Services <span className="text-cyan dark:text-neon">/&gt;</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 font-mono">Professional Web Solutions for Your Business</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Services Column */}
                    <div className="space-y-6">
                        <ServiceCard title="Website Development" icon={Code} />
                        <ServiceCard title="Full Stack Web Applications" icon={Server} />
                        <ServiceCard title="Bug Fixing & Optimization" icon={Wrench} />
                    </div>

                    {/* Why Choose Me & CTA Column */}
                    <div className="space-y-10">
                        <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
                            <h3 className="text-2xl font-bold font-cyber mb-6">Why Choose Me?</h3>
                            <div className="space-y-4">
                                <BenefitItem text="Clean & maintainable code" />
                                <BenefitItem text="On-time delivery" />
                                <BenefitItem text="Beginner-friendly pricing" />
                                <BenefitItem text="Clear communication" />
                            </div>
                        </div>

                        <div className="text-center md:text-left space-y-6">
                            <div>
                                <h3 className="text-3xl font-bold font-fauna mb-2">Ready to start your project?</h3>
                                <p className="text-gray-600 dark:text-gray-400">Contact me via chat or email today.</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-3 justify-center md:justify-start group">
                                    <Smartphone className="text-cyan group-hover:text-neon transition-colors" />
                                    <a href="tel:+919159018280" className="text-lg font-mono hover:text-cyan transition-colors">+91 9159018280</a>
                                </div>
                                <div className="flex items-center gap-3 justify-center md:justify-start group">
                                    <Smartphone className="text-cyan group-hover:text-neon transition-colors" />
                                    <a href="tel:+919369250852" className="text-lg font-mono hover:text-cyan transition-colors">+91 9369250852</a>
                                </div>
                            </div>

                            <a href="#contact" className="cyber-button inline-block">
                                <span className="relative z-10">Hire Me Now</span>
                                <div className="absolute inset-0 bg-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Freelancing;
