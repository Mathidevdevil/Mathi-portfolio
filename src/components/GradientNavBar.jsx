import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Clock } from 'lucide-react';

const GradientNavBar = ({ items, isDark, toggleTheme, toggleMenu, isMenuOpen }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <nav className="relative flex items-center justify-between px-8 py-4 w-full bg-transparent z-50">
            {/* Logo */}
            <a href="#" className="text-xl font-bold font-cyber text-gray-900 dark:text-white tracking-wider hover:text-cyan transition-colors z-20">
                Mathi<span className="text-cyan"> DEV </span>
            </a>

            {/* Links - Hidden on Mobile */}
            <ul className="hidden md:flex items-center gap-2 relative z-20">
                {items.map((item, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <li
                            key={index}
                            className="relative px-4 py-2 cursor-pointer text-sm font-medium transition-colors duration-300"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => setActiveIndex(index)}
                        >
                            <a
                                href={item.href}
                                className={`relative z-10 transition-colors duration-300 ${isActive || hoveredIndex === index ? 'text-cyan' : 'text-gray-700 dark:text-gray-300'}`}
                            >
                                {item.label}
                            </a>

                            {/* Magic Line - Sliding Underline */}
                            {((hoveredIndex === index) || (hoveredIndex === null && isActive)) && (
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                                />
                            )}
                        </li>
                    );
                })}
            </ul>

            {/* Right Side: Clock, Theme Toggle & Mobile Menu */}
            <div className="flex items-center gap-4 z-20">
                {/* Clock Display */}
                <div className="hidden md:flex items-center gap-2 text-cyan font-cyber text-sm tracking-widest text-glow">
                    <Clock size={16} />
                    <span suppressHydrationWarning>{formatTime(time)}</span>
                </div>

                <button
                    onClick={toggleTheme}
                    className="text-gray-900 dark:text-white hover:text-cyan transition-colors p-2 rounded-full hover:bg-white/10"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-gray-900 dark:text-white hover:text-cyan transition-colors p-2"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
};

export default GradientNavBar;
