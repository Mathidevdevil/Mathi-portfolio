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
import ClickSpark from './components/ClickSpark';
import GradientNavBar from './components/GradientNavBar';
import Prism from './components/Prism';

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
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className={`${isDark ? 'dark' : ''}`}>
        <div className="bg-gray-50/80 dark:bg-darker/80 min-h-screen text-gray-900 dark:text-white font-sans selection:bg-cyan/30 selection:text-cyan transition-colors duration-300 relative">

          {/* Global Background */}
          {/* Global Background */}
          <div className="fixed inset-0 z-0">
            <Prism
              animationType="rotate"
              timeScale={0.5}
              height={3.5}
              baseWidth={5.5}
              scale={3.6}
              hueShift={0}
              colorFrequency={1}
              noise={0}
              glow={1}
            />
          </div>

          {/* Navigation */}
          <div className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
            <GradientNavBar
              items={navLinks.map(link => ({ label: link.title, href: link.href }))}
              isDark={isDark}
              toggleTheme={toggleTheme}
              toggleMenu={toggleMenu}
              isMenuOpen={isMenuOpen}
            />

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
          </div>

          {/* Main Content */}
          < main className="relative z-10" >
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Freelancing />
            <Certifications />
            <Contact />
          </main >

        </div >
      </div >
    </ClickSpark >
  );
}

export default App;
