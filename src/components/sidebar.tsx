// components/Sidebar.tsx
"use client";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useResources } from "@/context/ResourcesContext";
import type { FilterOption } from "@/context/ResourcesContext";
import { resourceTags } from "@/constants/resourceTags";
import Image from "next/image";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setFilterBy, filterBy } = useResources();

  // Filter tags based on search term
  const filteredTags = resourceTags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-black text-gray-300 w-full flex flex-col shadow-lg overflow-hidden relative">
      {/* Logo or Brand Area */}
      <div className="flex-shrink-0 p-4 md:p-5 mb-4 md:mb-6 border-b border-gray-800/50 flex justify-center items-center">
        {/* <h1 className="text-lg md:text-xl font-bold text-white">
          Resource Hub
        </h1> */}
        <Image
          src="/logo/logo.png"
          width={100}
          height={100}
          alt="logo"
          className="mx-auto"
        />
      </div>

      {/* Search Input */}
      <div className="flex-shrink-0 px-4 md:px-5 mb-4 md:mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <IoSearch className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-900 w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300 placeholder-gray-500 transition-all text-sm md:text-base"
            placeholder="Search categories"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Heading */}
      <div className="flex-shrink-0 px-4 md:px-5 mb-3 md:mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-white tracking-wide">
          Categories
        </h2>
      </div>

      {/* Scrollable Categories List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-5 pb-4 md:pb-6 sidebar-scroll">
        <div className="space-y-3 md:space-y-4 min-h-0">
          {/* All option */}
          <div
            className={`flex items-center p-2.5 md:p-3 rounded-lg cursor-pointer transition-all duration-200 group hover:bg-gray-800 ${
              filterBy === "None" ? "bg-blue-600 text-white shadow-lg" : ""
            }`}
            onClick={() => setFilterBy("None")}
          >
            <div
              className={`rounded-full p-1.5 md:p-2 mr-3 md:mr-4 transition-colors flex-shrink-0 ${
                filterBy === "None"
                  ? "bg-blue-600"
                  : "bg-gray-800 group-hover:bg-blue-700"
              }`}
            >
              <span
                className={`w-4 h-4 md:w-5 md:h-5 font-bold text-sm md:text-base flex items-center justify-center ${
                  filterBy === "None"
                    ? "text-white"
                    : "text-gray-300 group-hover:text-white"
                }`}
              >
                *
              </span>
            </div>
            <span
              className={`text-sm md:text-base font-medium truncate ${
                filterBy === "None" ? "text-white" : "group-hover:text-white"
              }`}
            >
              All
            </span>
          </div>

          {/* Dynamic categories */}
          {filteredTags.map((tag) => (
            <div
              key={tag}
              className={`flex items-center p-2.5 md:p-3 rounded-lg cursor-pointer transition-all duration-200 group hover:bg-gray-800 ${
                filterBy === tag ? "bg-blue-600 text-white shadow-lg" : ""
              }`}
              onClick={() => setFilterBy(tag as FilterOption)}
            >
              <div
                className={`rounded-full p-1.5 md:p-2 mr-3 md:mr-4 transition-colors flex-shrink-0 ${
                  filterBy === tag
                    ? "bg-blue-600"
                    : "bg-gray-800 group-hover:bg-blue-700"
                }`}
              >
                <span
                  className={`w-4 h-4 md:w-5 md:h-5 font-bold text-sm md:text-base flex items-center justify-center ${
                    filterBy === tag
                      ? "text-white"
                      : "text-gray-300 group-hover:text-white"
                  }`}
                >
                  {tag[0]}
                </span>
              </div>
              <span
                className={`text-sm md:text-base font-medium truncate ${
                  filterBy === tag ? "text-white" : "group-hover:text-white"
                }`}
              >
                {tag}
              </span>
            </div>
          ))}

          {/* No results for search */}
          {searchTerm && filteredTags.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">No categories found</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Area */}
      <div className="flex-shrink-0 px-4 md:px-5 py-4 md:py-6 border-t border-gray-800 mt-auto">
        <div className="flex items-center text-xs md:text-sm text-gray-500">
          <span>© 2025 Nexus Resource Hub</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
