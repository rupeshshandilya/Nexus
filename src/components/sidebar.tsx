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
    <div className="h-screen bg-black text-gray-300 w-72 p-5 overflow-hidden flex flex-col shadow-lg">
      {/* Logo or Brand Area */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Resource Hub</h1>
      </div>

      {/* Search Input */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <IoSearch className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="bg-gray-900 w-full pl-12 pr-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 placeholder-gray-500 transition-all"
          placeholder="Search for a resource"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories Heading */}
      <h2 className="text-2xl font-semibold mb-6 text-white tracking-wide">
        Categories
      </h2>

      {/* Categories List with Scrolling */}
      <div className="overflow-y-auto flex-grow custom-scrollbar">
        <ul className="space-y-4">
          {/* All option */}
          <li
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
              filterBy === "None"
                ? "bg-purple-700 text-white"
                : "hover:bg-gray-800"
            }`}
            onClick={() => setFilterBy("None")}
          >
            <div className="rounded-full bg-gray-800 p-2 mr-4 group-hover:bg-purple-700 transition-colors">
              <span className="w-5 h-5 text-gray-300 group-hover:text-white font-bold">
                *
              </span>
            </div>
            <span className="text-base font-medium group-hover:text-white">
              All
            </span>
          </li>
          {filteredTags.map((tag) => (
            <li
              key={tag}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                filterBy === tag
                  ? "bg-purple-700 text-white"
                  : "hover:bg-gray-800"
              }`}
              onClick={() => setFilterBy(tag as FilterOption)}
            >
              <div className="rounded-full bg-gray-800 p-2 mr-4 group-hover:bg-purple-700 transition-colors">
                <span className="w-5 h-5 text-gray-300 group-hover:text-white font-bold">
                  {tag[0]}
                </span>
              </div>
              <span className="text-base font-medium group-hover:text-white">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Area */}
      <div className="mt-auto pt-6 border-t border-gray-800">
        <div className="flex items-center text-sm text-gray-500">
          <span>© 2025 Nexus Resource Hub</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
