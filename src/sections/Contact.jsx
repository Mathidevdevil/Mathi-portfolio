import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { userData } from '../data/user';
import { Mail, Linkedin, Github, Send, FileText, CheckCircle, AlertCircle, Instagram, Twitter } from 'lucide-react';
import emailjs from '@emailjs/browser';
import MagicBento, { MagicBentoCard } from '../components/MagicBento';

const Contact = () => {
    const formRef = useRef();
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            // EmailJS configuration
            await emailjs.sendForm(
                'service_ct1iciw',      // EmailJS Service ID
                'template_hiuywsh',     // EmailJS Template ID
                formRef.current,
                'XDv5ZsHxVQeV18Njh'       // EmailJS Public Key
            );

            setStatus({
                type: 'success',
                message: 'Message sent successfully! I\'ll get back to you soon.'
            });
            formRef.current.reset();
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus({
                type: 'error',
                message: 'Failed to send message. Please try emailing directly.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-12 md:py-20 bg-transparent text-gray-900 dark:text-white relative border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 md:mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-cyber font-bold mb-3 md:mb-4">
                        Contact Me
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-mono px-4">
                        Available for freelance commissions and full-time deployment.
                    </p>
                </motion.div>

                <MagicBento wrapperClassName="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 md:items-start w-full max-w-none">
                    {/* Contact Info */}
                    <div className="flex flex-col h-full">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">Transmission Channels</h3>

                        <div className="space-y-3 md:space-y-4 flex-1">
                            {[
                                { href: `mailto:${userData.personal.email[0]}`, icon: Mail, label: 'Email' },
                                { href: userData.personal.linkedin, icon: Linkedin, label: 'LinkedIn Profile' },
                                { href: userData.personal.github, icon: Github, label: 'GitHub' },
                                { href: userData.personal.instagram, icon: Instagram, label: 'Instagram' },
                                { href: userData.personal.twitter, icon: Twitter, label: 'X' },
                                { href: userData.personal.resume, icon: FileText, label: 'Resume' }
                            ].map((item, index) => (
                                <motion.a
                                    key={index}
                                    whileHover={{ scale: 1.05, x: 10 }}
                                    href={item.href}
                                    target={item.label === 'Email' ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <MagicBentoCard
                                        className="flex items-center gap-4 text-cyan dark:text-cyan hover:text-white transition-colors p-4 border border-black/10 dark:border-white/10 rounded-lg bg-white/50 dark:bg-white/5 hover:border-cyan/50 shadow-sm hover:shadow-cyan/20 group"
                                        enableStars={false}
                                        enableTilt={true}
                                        style={{ aspectRatio: 'auto', minHeight: 'auto' }}
                                    >
                                        <item.icon className="relative z-10" />
                                        <span className="relative z-10">{item.label}</span>
                                    </MagicBentoCard>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div className="flex flex-col h-full">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">Send Message</h3>

                        <MagicBentoCard
                            className="bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-xl flex-1 flex flex-col"
                            enableStars={true}
                            enableTilt={false}
                            style={{ aspectRatio: 'auto', minHeight: 'auto' }}
                        >
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 md:space-y-4 flex-1 flex flex-col relative z-10">
                                <div>
                                    <input
                                        type="text"
                                        name="user_name"
                                        placeholder="Your Name"
                                        required
                                        className="w-full bg-white dark:bg-dark border border-gray-200 dark:border-gray-800 p-4 rounded text-gray-900 dark:text-white focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all font-mono text-sm md:text-base"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="user_email"
                                        placeholder="Your Email"
                                        required
                                        className="w-full bg-white dark:bg-dark border border-gray-200 dark:border-gray-800 p-4 rounded text-gray-900 dark:text-white focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all font-mono text-sm md:text-base"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Subject"
                                        required
                                        className="w-full bg-white dark:bg-dark border border-gray-200 dark:border-gray-800 p-4 rounded text-gray-900 dark:text-white focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all font-mono text-sm md:text-base"
                                    />
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        name="message"
                                        rows="6"
                                        placeholder="Your Message..."
                                        required
                                        className="w-full h-full min-h-[150px] bg-white dark:bg-dark border border-gray-200 dark:border-gray-800 p-4 rounded text-gray-900 dark:text-white focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all font-mono text-sm md:text-base resize-none"
                                    ></textarea>
                                </div>

                                {/* Status Message */}
                                {status.message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex items-center gap-2 p-3 rounded ${status.type === 'success'
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700'
                                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700'
                                            }`}
                                    >
                                        {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                                        <span className="text-sm">{status.message}</span>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full cyber-button group flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <Send size={18} />
                                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                                </button>
                            </form>
                        </MagicBentoCard>
                    </div>
                </MagicBento>

                <div className="text-center mt-20 text-gray-500 dark:text-gray-600 font-mono text-sm">
                    <p>{new Date().getFullYear()} @ {userData.personal.name.toUpperCase()}</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;