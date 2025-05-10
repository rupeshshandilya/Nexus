"use client";
import Sidebar from "@/components/sidebar";
import ResourceCard from "../../components/ResourceCard";
import Header from "@/components/Header";
import { Resource } from "../types/index";
import React, { useState, useMemo, useEffect } from "react";

const resourcesData: Resource[] = [
  {
    id: "1",
    title: "1000 Inspiring Websites",
    description:
      "A growing list of websites that are memorable, clear and delightful.",
    imageUrl: "https://placehold.co/600x400/222/fff?text=Inspiring+Websites",
    link: "https://www.inspiringwebsites.com",
  },
  {
    id: "2",
    title: "18F Accessibility Checklist",
    description: "A comprehensive accessibility checklist for web development.",
    imageUrl: "https://placehold.co/600x400/222/fff?text=18F+Checklist",
    link: "https://guides.18f.gov/accessibility/checklist/",
  },
  {
    id: "3",
    title: "Aceternity UI",
    description:
      "Copy paste the most trending components and use them in your websites without having to worry about styling and animations.",
    imageUrl: "https://placehold.co/600x400/222/fff?text=Aceternity+UI",
    link: "https://ui.aceternity.com",
  },
  // Add more resources as needed
];

// Sort options
type SortOption = "A-Z" | "Z-A" | "Newest" | "Oldest";

// Filter options (you can expand these based on your needs)
type FilterOption = "None" | "UI" | "Tools" | "Resources" | "Accessibility";

export default function Explore() {
  const [sortBy, setSortBy] = useState<SortOption>("A-Z");
  const [filterBy, setFilterBy] = useState<FilterOption>("None");
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".sort-dropdown") && isOpenSort) {
        setIsOpenSort(false);
      }
      if (!target.closest(".filter-dropdown") && isOpenFilter) {
        setIsOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenSort, isOpenFilter]);

  // Sort and filter resources
  const displayedResources = useMemo(() => {
    let filtered = [...resourcesData];

    // Apply filtering
    if (filterBy !== "None") {
      filtered = filtered.filter(
        (resource) =>
          resource.title.includes(filterBy) ||
          resource.description.includes(filterBy)
      );
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "A-Z":
          return a.title.localeCompare(b.title);
        case "Z-A":
          return b.title.localeCompare(a.title);
        case "Newest":
          return parseInt(b.id) - parseInt(a.id);
        case "Oldest":
          return parseInt(a.id) - parseInt(b.id);
        default:
          return 0;
      }
    });
  }, [sortBy, filterBy]);

  // To prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Sidebar - fixed width on desktop, full width collapsed menu on mobile */}
      <div className="md:w-72 flex-shrink-0 md:sticky md:top-0 md:h-screen border-r border-gray-800/30">
        <Sidebar />
      </div>

      {/* Main Content - takes remaining width */}
      <main className="flex-grow overflow-x-hidden">
        {/* Header section */}
        <Header />

        {/* Resources section */}
        <div className="container mx-auto px-4 pb-20">
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-3xl sm:text-4xl font-bold relative">
                All Resources
                <span className="text-gray-500 ml-2 text-2xl sm:text-3xl">
                  ({resourcesData.length})
                </span>
                <div className="h-1 w-20 bg-gray-700 rounded-full mt-2"></div>
              </h2>

              <div className="flex flex-wrap gap-2 sm:gap-4">
                {/* Sort Dropdown */}
                <div className="relative sort-dropdown">
                  <button
                    className="flex items-center gap-2 border border-gray-800 rounded-lg px-4 py-2.5 text-white hover:bg-gray-900 transition-colors"
                    onClick={() => setIsOpenSort(!isOpenSort)}
                  >
                    <span>Sort by: {sortBy}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpenSort ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>

                  {isOpenSort && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg z-10 border border-gray-800 overflow-hidden animate-fadeIn">
                      {(["A-Z", "Z-A", "Newest", "Oldest"] as SortOption[]).map(
                        (option) => (
                          <button
                            key={option}
                            className="block w-full text-left px-4 py-2.5 hover:bg-black/50 transition-colors"
                            onClick={() => {
                              setSortBy(option);
                              setIsOpenSort(false);
                            }}
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Filter Dropdown */}
                <div className="relative filter-dropdown">
                  <button
                    className="flex items-center gap-2 border border-gray-800 rounded-lg px-4 py-2.5 text-white hover:bg-gray-900 transition-colors"
                    onClick={() => setIsOpenFilter(!isOpenFilter)}
                  >
                    <span>Filter: {filterBy}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpenFilter ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>

                  {isOpenFilter && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg z-10 border border-gray-800 overflow-hidden animate-fadeIn">
                      {(
                        [
                          "None",
                          "UI",
                          "Tools",
                          "Resources",
                          "Accessibility",
                        ] as FilterOption[]
                      ).map((option) => (
                        <button
                          key={option}
                          className="block w-full text-left px-4 py-2.5 hover:bg-black/50 transition-colors"
                          onClick={() => {
                            setFilterBy(option);
                            setIsOpenFilter(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeInUp">
            {displayedResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          {/* No results message */}
          {displayedResources.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-400">
                No resources found matching your filter criteria.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                onClick={() => setFilterBy("None")}
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
