import React, { useState, useEffect } from 'react';
import { SOCIAL_LINKS, BRAND_NAME, BRAND_BIO } from './constants';
import { LinkCard } from './components/LinkCard';
import { LoadingScreen } from './components/LoadingScreen';
import { Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-fashion-cream dark:bg-fashion-black transition-colors duration-500 relative overflow-x-hidden">
        
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <div className="animate-fade-in">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-900 dark:to-transparent opacity-50 z-0 pointer-events-none transition-colors duration-500"></div>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="absolute top-6 right-6 z-30 p-3 rounded-full bg-white dark:bg-zinc-800 text-fashion-black dark:text-fashion-gold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <main className="relative z-10 max-w-md mx-auto min-h-screen px-6 py-12 flex flex-col items-center">
              
              {/* Profile Header */}
              <div className="w-full flex flex-col items-center mb-10 text-center animate-slide-up">
                <div className="relative mb-6 group">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-fashion-gold to-gray-300 dark:to-zinc-700 shadow-xl">
                    <img 
                      src="https://picsum.photos/300/300?grayscale" 
                      alt="Brand Profile" 
                      className="w-full h-full rounded-full object-cover border-4 border-white dark:border-zinc-800 transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Verified Badge */}
                  <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full border-2 border-white dark:border-zinc-800">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold tracking-widest text-fashion-black dark:text-fashion-cream mb-2 uppercase transition-colors">
                  {BRAND_NAME}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-light max-w-xs leading-relaxed transition-colors">
                  {BRAND_BIO}
                </p>
              </div>

              {/* Links Container */}
              <div className="w-full flex-1">
                {SOCIAL_LINKS.map((link, index) => (
                  <LinkCard key={link.id} link={link} index={index} />
                ))}
              </div>

              {/* Footer */}
              <footer className="mt-12 text-center text-xs text-gray-400 dark:text-gray-500 font-light">
                <p>© {new Date().getFullYear()} {BRAND_NAME}. Todos los derechos reservados.</p>
                <div className="flex justify-center space-x-4 mt-4 opacity-50">
                  <a href="#" className="hover:text-fashion-black dark:hover:text-fashion-cream transition-colors">Política de Privacidad</a>
                  <a href="#" className="hover:text-fashion-black dark:hover:text-fashion-cream transition-colors">Términos de Uso</a>
                </div>
              </footer>

            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;