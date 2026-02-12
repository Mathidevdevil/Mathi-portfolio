import React, { useState, Suspense, lazy } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import ClickSpark from './components/ClickSpark';
import GradientNavBar from './components/GradientNavBar';

import Iridescence from './components/Iridescence';
import Preloader from './components/Preloader';

// Lazy load sections
const Hero = lazy(() => import('./sections/Hero'));
const About = lazy(() => import('./sections/About'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Certifications = lazy(() => import('./sections/Certifications'));
const Freelancing = lazy(() => import('./sections/Freelancing'));
const Contact = lazy(() => import('./sections/Contact'));

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-cyan/30 border-t-cyan rounded-full animate-spin"></div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999]"
          >
            <Preloader onComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <ClickSpark
          sparkColor='#fff'
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <div className={`${isDark ? 'dark' : ''}`}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen text-gray-900 dark:text-white font-sans selection:bg-cyan/30 selection:text-cyan transition-colors duration-300 relative"
            >

              {/* Global Background */}

              <div className="fixed inset-0 z-0">
                <Iridescence
                  color={[0.1, 0.1, 0.1]}
                  mouseReact
                  amplitude={0.1}
                  speed={1}
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
              <main className="relative z-10">
                <Suspense fallback={<LoadingSpinner />}>
                  <Hero />
                  <About />
                  <Skills />
                  <Projects />
                  <Freelancing />
                  <Certifications />
                  <Contact />
                </Suspense>
              </main>

            </motion.div>
          </div>
        </ClickSpark>
      )}
    </>
  );
}

export default App;
