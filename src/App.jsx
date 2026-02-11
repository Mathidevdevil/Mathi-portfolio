import React, { useState } from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Freelancing from './sections/Freelancing';
import Contact from './sections/Contact';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashCursor from './components/SplashCursor';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setIsDark(!isDark);

  const navLinks = [
    { title: 'HOME', href: '#' },
    { title: 'ABOUT', href: '#about' },
    { title: 'TECH STACKS', href: '#tech-stacks' },
    { title: 'PROJECTS', href: '#projects' },
    { title: 'FREELANCING', href: '#freelancing' },
    { title: 'CERTIFICATIONS', href: '#certifications' },
    { title: 'CONTACT', href: '#contact' },
  ];

  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      <div className="bg-gray-50/80 dark:bg-darker/80 min-h-screen text-gray-900 dark:text-white font-sans selection:bg-cyan/30 selection:text-cyan transition-colors duration-300 relative">

        {/* Global Background */}
        <SplashCursor
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1440}
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
        />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-darker/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#" className="text-xl font-bold font-cyber text-gray-900 dark:text-white tracking-wider hover:text-cyan transition-colors">
              Mathi<span className="text-cyan"> DEV </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="text-sm font-mono text-gray-600 dark:text-gray-400 hover:text-cyan dark:hover:text-cyan transition-colors"
                >
                  {link.title}
                </a>
              ))}
              <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-400 hover:text-cyan transition-colors">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleTheme} className="text-gray-600 dark:text-white hover:text-cyan">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={toggleMenu} className="text-gray-900 dark:text-white hover:text-cyan">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Nav Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden bg-white dark:bg-darker border-b border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <div className="flex flex-col p-6 gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.title}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-cyber text-gray-800 dark:text-gray-300 hover:text-cyan transition-colors"
                    >
                      {link.title}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Main Content */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Freelancing />
          <Certifications />
          <Contact />
        </main>

      </div>
    </div>
  );
}

export default App;
