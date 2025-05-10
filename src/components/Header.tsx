// components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="text-center max-w-4xl mx-auto px-4 pt-12 pb-8">
      <div className="mb-6">
        <button className="bg-white bg-opacity-5 text-white rounded-full px-5 py-2.5 text-sm flex items-center gap-2 mx-auto hover:bg-opacity-10 transition-all duration-300 border border-white border-opacity-10">
          Add resources for the community on the fly ✨
        </button>
      </div>
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight animate-reveal">
        Welcome to the Den <span role="img" aria-label="lion" className="inline-block animate-pulse">🦁</span>
      </h1>
      <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
        DevelopersDen is an open source collection of quality resources for developers, designers & backend nerds.
      </p>
    </div>
  );
};

export default Header;