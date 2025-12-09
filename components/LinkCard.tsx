import React from 'react';
import { SocialLink } from '../types';
import { ChevronRight } from 'lucide-react';

interface LinkCardProps {
  link: SocialLink;
  index: number;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, index }) => {
  const Icon = link.icon;
  
  // Staggered animation delay based on index
  const animationDelay = `${index * 100}ms`;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative w-full flex items-center justify-between p-4 mb-4
        bg-white dark:bg-zinc-900 
        border border-gray-200 dark:border-zinc-800
        shadow-sm dark:shadow-none
        hover:shadow-lg hover:border-fashion-gold dark:hover:border-fashion-gold hover:-translate-y-1
        transition-all duration-300 ease-out rounded-xl
        animate-slide-up
        ${link.featured ? 'ring-2 ring-fashion-gold ring-offset-2 dark:ring-offset-fashion-black' : ''}
      `}
      style={{ animationDelay }}
    >
      <div className="flex items-center space-x-4">
        {Icon && (
          <div className={`
            p-2 rounded-full 
            ${link.featured ? 'bg-fashion-gold text-white' : 'bg-gray-100 dark:bg-zinc-800 text-fashion-black dark:text-gray-200'}
            group-hover:bg-fashion-gold group-hover:text-white transition-colors duration-300
          `}>
            <Icon size={20} />
          </div>
        )}
        <span className="font-medium text-lg text-gray-800 dark:text-gray-100 tracking-wide group-hover:text-black dark:group-hover:text-white transition-colors">
          {link.title}
        </span>
      </div>
      
      <div className="text-gray-400 dark:text-zinc-600 group-hover:text-fashion-gold transition-colors duration-300 transform group-hover:translate-x-1">
        <ChevronRight size={20} />
      </div>

      {link.featured && (
        <span className="absolute -top-3 -right-2 bg-fashion-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
          Top
        </span>
      )}
    </a>
  );
};