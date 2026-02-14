import React, { useState, Suspense, lazy } from 'react';

import GradientNavBar from './components/GradientNavBar';
import Background from './components/Background';

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
      <div className={`${isDark ? 'dark' : ''}`}>
        <Background />

        <div
          className="min-h-screen text-gray-900 dark:text-white font-sans selection:bg-cyan/30 selection:text-cyan transition-colors duration-300 relative z-10"
        >

          {/* Navigation */}
          <div className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-md bg-white/5 dark:bg-darker/5">
            <GradientNavBar
              items={navLinks.map(link => ({ label: link.title, href: link.href }))}
              isDark={isDark}
              toggleTheme={toggleTheme}
              toggleMenu={toggleMenu}
              isMenuOpen={isMenuOpen}
            />

            {/* Mobile Nav Overlay */}

            {isMenuOpen && (
              <div
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
              </div>
            )}

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

        </div>

      </div>
    </>
  );
}

export default App;
