// components/Sidebar.tsx
"use client";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useResources } from "@/context/ResourcesContext";
import type { FilterOption } from "@/context/ResourcesContext";
import { resourceTags } from "@/constants/resourceTags";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setFilterBy, filterBy } = useResources();

  // Filter tags based on search term
  const filteredTags = resourceTags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-black text-gray-300 w-full p-4 md:p-5 overflow-hidden flex flex-col shadow-lg">
      {/* Logo or Brand Area */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-lg md:text-xl font-bold text-white">
          Resource Hub
        </h1>
      </div>

      {/* Search Input */}
      <div className="relative mb-6 md:mb-8">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <IoSearch className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="bg-gray-900 w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 placeholder-gray-500 transition-all text-sm md:text-base"
          placeholder="Search for a resource"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories Heading */}
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-white tracking-wide">
        Categories
      </h2>

      {/* Categories List with Scrolling */}
      <div className="overflow-y-auto flex-grow custom-scrollbar">
        <ul className="space-y-3 md:space-y-4">
          {/* All option */}
          <li
            className={`flex items-center p-2.5 md:p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
              filterBy === "None"
                ? "bg-purple-700 text-white"
                : "hover:bg-gray-800"
            }`}
            onClick={() => setFilterBy("None")}
          >
            <div className="rounded-full bg-gray-800 p-1.5 md:p-2 mr-3 md:mr-4 group-hover:bg-purple-700 transition-colors">
              <span className="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-white font-bold text-sm md:text-base">
                *
              </span>
            </div>
            <span className="text-sm md:text-base font-medium group-hover:text-white">
              All
            </span>
          </li>
          {filteredTags.map((tag) => (
            <li
              key={tag}
              className={`flex items-center p-2.5 md:p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                filterBy === tag
                  ? "bg-purple-700 text-white"
                  : "hover:bg-gray-800"
              }`}
              onClick={() => setFilterBy(tag as FilterOption)}
            >
              <div className="rounded-full bg-gray-800 p-1.5 md:p-2 mr-3 md:mr-4 group-hover:bg-purple-700 transition-colors">
                <span className="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-white font-bold text-sm md:text-base">
                  {tag[0]}
                </span>
              </div>
              <span className="text-sm md:text-base font-medium group-hover:text-white">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Area */}
      <div className="mt-auto pt-4 md:pt-6 border-t border-gray-800">
        <div className="flex items-center text-xs md:text-sm text-gray-500">
          <span>© 2025 Nexus Resource Hub</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
