// components/ResourceCard.tsx
import React from 'react';
import Link from 'next/link';
import { Resource } from '../app/types';
import Image from 'next/image';

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <div className="bg-gray-900 bg-opacity-40 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col h-full border border-gray-800 transition-all duration-300 hover:border-gray-600 hover:shadow-[0_0_20px_rgba(75,75,75,0.15)] group">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={resource.imageUrl} 
          alt={resource.title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          width={600}
          height={400}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">{resource.title}</h3>
          <Link 
            href={resource.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-full"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          </Link>
        </div>
        <p className="text-gray-400 flex-grow">{resource.description}</p>
        {resource.link && (
          <div className="mt-4 text-gray-500 text-sm truncate hover:text-gray-300 transition-colors duration-300">
            {resource.link.replace(/(^\w+:|^)\/\//, '')}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;