import React from 'react';
import { Code, Server, Wrench, CheckCircle, Smartphone } from 'lucide-react';
import MagicBento, { MagicBentoCard } from '../components/MagicBento';
import PixelCard from '../components/PixelCard';

const ServiceCard = ({ title, icon: Icon }) => (
    <PixelCard
        variant="blue"
        className="border border-black rounded-xl hover:border-cyan/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.1)] transition-all duration-300 group w-full h-full"
    >
        <div className="relative z-10 w-full h-full p-4 md:p-6 flex flex-col justify-center">
            <div className="p-3 rounded-lg bg-cyan/10 text-cyan w-fit mb-4 relative z-10 group-hover:text-neon transition-colors">
                <Icon size={30} />
            </div>
            <h3 className="text-xl font-bold font-cyber text-cyan-700 dark:text-cyan-400 mb-2 relative z-10">{title}</h3>
        </div>
    </PixelCard>
);

const BenefitItem = ({ text }) => (
    <div className="flex items-center gap-3">
        <CheckCircle className="text-cyan shrink-0" size={20} />
        <span className="text-gray-900 dark:text-gray-100 font-mono">{text}</span>
    </div>
);

const Freelancing = () => {
    return (
        <section id="freelancing" className="py-20 bg-transparent text-gray-900 dark:text-white relative transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-cyber font-bold mb-4">
                        <span className="text-cyan dark:text-neon">&lt;</span> Freelancing Services <span className="text-cyan dark:text-neon">/&gt;</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 font-mono">Professional Web Solutions for Your Business</p>
                </div>

                <MagicBento wrapperClassName="grid md:grid-cols-2 gap-12 items-center w-full max-w-none text-left">
                    {/* Services Column */}
                    <div className="space-y-6">
                        <ServiceCard title="Website Development" icon={Code} />
                        <ServiceCard title="Full Stack Web Applications" icon={Server} />
                        <ServiceCard title="Bug Fixing & Optimization" icon={Wrench} />
                    </div>

                    {/* Why Choose Me & CTA Column */}
                    <div className="space-y-10">
                        <PixelCard
                            variant="pink"
                            className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-black w-full h-full"
                        >
                            <div className="relative z-10 w-full h-full p-6 md:p-8 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold font-cyber mb-6 relative z-10">Why Choose Me?</h3>
                                <div className="space-y-4 relative z-10">
                                    <BenefitItem text="Clean & maintainable code" />
                                    <BenefitItem text="On-time delivery" />
                                    <BenefitItem text="Beginner-friendly pricing" />
                                    <BenefitItem text="Clear communication" />
                                </div>
                            </div>
                        </PixelCard>

                        <div className="text-center md:text-left space-y-6">
                            <div>
                                <h3 className="text-3xl font-bold font-fauna mb-2">Ready to start your project?</h3>
                                <p className="text-gray-800 dark:text-gray-200">Contact me via chat or email today.</p>
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
                </MagicBento>
            </div>
        </section>
    );
};

export default Freelancing;
