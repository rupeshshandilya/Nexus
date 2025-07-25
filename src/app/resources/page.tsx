"use client";
import Sidebar from "@/components/sidebar";
import ResourceCard from "../../components/ResourceCard";
import Header from "@/components/Header";
import ResourceFormDialog from "../../components/Rdialog";
import { Resource } from "../types/index";
import React, { useState, useEffect } from "react";
import { useResources } from "@/context/ResourcesContext";
import { useAuth } from "@clerk/nextjs";
import type { FilterOption } from "@/context/ResourcesContext";
import { resourceTags } from "@/constants/resourceTags";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Explore() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const {
    resources,
    isLoading,
    error,
    sortBy,
    filterBy,
    setSortBy,
    setFilterBy,
    addResource,
    fetchResources,
  } = useResources();

  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isResourceFormOpen, setIsResourceFormOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Function to handle adding a new resource
  const handleAddResource = async (
    newResource: Omit<Resource, "id" | "userId">
  ) => {
    const result = await addResource(newResource);
    if (result.success) {
      setIsResourceFormOpen(false);
    }
    return result;
  };

  // To prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          fixed top-0 left-0 z-50 lg:z-auto
          w-64 h-full
          bg-black lg:bg-black/50
          border-r border-gray-800
          shadow-lg shadow-gray-900/30
        `}
      >
        <Sidebar />
      </div>

      {/* Main Content Container */}
      <div className="lg:flex min-h-screen">
        {/* Spacer for desktop sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0"></div>

        {/* Vertical Divider - Desktop only */}
        <div className="hidden lg:block w-1 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-700"></div>

        {/* Main Content */}
        <main className="flex-grow overflow-x-hidden lg:bg-gradient-to-b lg:from-gray-900/70 lg:via-black lg:to-gray-900/70 lg:shadow-inner min-h-screen">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-800 bg-black/90">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-white hover:text-gray-300 transition-colors p-1"
              aria-label="Open sidebar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <h1 className="text-lg font-bold">Resources</h1>
            <div className="w-8"></div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block">
            <Header />
          </div>

          {/* Action Buttons */}
          <div className="p-4 lg:absolute lg:right-2 lg:top-2 lg:p-0">
            <div className="flex flex-wrap items-center gap-2 justify-end">
              {isSignedIn ? (
                <>
                  <Link
                    href="/my-resources"
                    className="flex items-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-700 rounded-xl lg:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 text-white transition-colors font-medium shadow-md text-sm sm:text-base"
                  >
                    <span className="hidden sm:inline">My Resources</span>
                    <span className="sm:hidden">My Resources</span>
                  </Link>

                  <button
                    className="flex items-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-700 rounded-xl lg:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 text-white transition-colors font-medium shadow-md text-sm sm:text-base"
                    onClick={() => setIsResourceFormOpen(true)}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    <span className="hidden sm:inline">Add Resource</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                  <div className="scale-90 sm:scale-100">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </>
              ) : (
                <Link
                  href={`/sign-in?redirect_url=${encodeURIComponent(pathname)}`}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-xl lg:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 text-white transition-colors font-medium shadow-md text-sm sm:text-base"
                >
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>

          {/* Resources Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-6 lg:ml-3 pb-20">
            <div className="mb-6 mt-4 lg:mb-10 lg:mt-6">
              <div className="flex flex-col sm:flex-row lg:flex-row justify-between items-start sm:items-center lg:items-center gap-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold relative">
                  <span className="lg:hidden">Resources</span>
                  <span className="hidden lg:inline">All Resources</span>
                  <span className="text-gray-500 ml-2 text-lg sm:text-2xl md:text-3xl lg:text-3xl">
                    ({resources.length})
                  </span>
                  <div className="h-1.5 w-24 sm:w-32 lg:bg-gray-600 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 lg:from-gray-600 lg:to-gray-600 rounded-full mt-3 shadow-lg"></div>
                </h2>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  {/* Sort Dropdown */}
                  <div className="relative sort-dropdown">
                    <button
                      className="flex items-center justify-between w-full sm:w-auto gap-2 border border-gray-800 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 text-white hover:bg-gray-900 transition-colors text-sm sm:text-base"
                      onClick={() => setIsOpenSort(!isOpenSort)}
                    >
                      <span className="truncate">Sort: {sortBy}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${
                          isOpenSort ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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
                      <div className="absolute right-0 mt-2 w-full sm:w-48 bg-gray-900 rounded-lg shadow-lg z-10 border border-gray-800 overflow-hidden animate-fadeIn">
                        {(["A-Z", "Z-A", "Newest", "Oldest"] as const).map(
                          (option) => (
                            <button
                              key={option}
                              className="block w-full text-left px-3 py-2 sm:px-4 sm:py-2.5 hover:bg-black/50 transition-colors text-sm sm:text-base"
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
                      className="flex items-center justify-between w-full sm:w-auto gap-2 border border-gray-800 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 text-white hover:bg-gray-900 transition-colors text-sm sm:text-base"
                      onClick={() => setIsOpenFilter(!isOpenFilter)}
                    >
                      <span className="truncate">Filter: {filterBy}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${
                          isOpenFilter ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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
                      <div className="absolute right-0 mt-2 w-full sm:w-48 bg-gray-900 rounded-lg shadow-lg z-10 border border-gray-800 overflow-hidden animate-fadeIn">
                        {["None", ...resourceTags].map((option) => (
                          <button
                            key={option}
                            className="block w-full text-left px-3 py-2 sm:px-4 sm:py-2.5 hover:bg-black/50 transition-colors text-sm sm:text-base"
                            onClick={() => {
                              setFilterBy(option as FilterOption);
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

            {/* Loading state */}
            {isLoading && (
              <div className="text-center py-12 sm:py-16">
                <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-4 border-gray-300 border-t-indigo-600"></div>
                <p className="mt-4 text-gray-400 text-sm sm:text-base">
                  Loading resources...
                </p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="text-center py-12 sm:py-16">
                <p className="text-red-400 text-sm sm:text-base">{error}</p>
                <button
                  onClick={fetchResources}
                  className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Resources Grid */}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 animate-fadeInUp">
                {resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}

            {/* No results message */}
            {!isLoading && !error && resources.length === 0 && (
              <div className="text-center py-12 sm:py-16">
                <p className="text-lg sm:text-xl text-gray-400">
                  No resources found matching your filter criteria.
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                  onClick={() => setFilterBy("None")}
                >
                  Clear filter
                </button>
              </div>
            )}

            {/* Footer Buttons - Bottom Left */}
            {!isLoading && !error && resources.length > 0 && (
              <div className="flex gap-3 mt-8">
                <a
                  href="mailto:rupeshkshandilya@gmail.com"
                  className="flex items-center gap-2 bg-gray-800/90 backdrop-blur-sm hover:bg-gray-700 rounded-lg px-3 py-2 text-white transition-colors font-medium shadow-lg text-sm border border-gray-700"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span>Contact</span>
                </a>

                <a
                  href="https://github.com/rupeshshandilya/Nexus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-800/90 backdrop-blur-sm hover:bg-gray-700 rounded-lg px-3 py-2 text-white transition-colors font-medium shadow-lg text-sm border border-gray-700"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 10.956.69-.069-.069-.069-.069-.069-.069 0-.483-.07-.483-.07-.276-.138-.345-.276-.345-.552 0-.276.069-.621.138-.966.069-.345.138-.69.138-1.035 0-.69-.345-1.311-.828-1.656 2.553-.276 5.244-1.242 5.244-5.658 0-1.311-.483-2.346-1.242-3.107.138-.345.552-1.518-.138-3.107 0 0-1.035-.345-3.384 1.242-1.035-.276-2.139-.414-3.245-.414-1.104 0-2.209.138-3.245.414C4.495 7.521 3.46 7.866 3.46 7.866c-.69 1.59-.276 2.762-.138 3.107-.759.76-1.242 1.796-1.242 3.107 0 4.416 2.691 5.382 5.244 5.658-.345.276-.621.828-.621 1.656 0 1.173.069 2.346.069 2.691 0 .276-.207.552-.69.414C3.187 21.404.029 17.066.029 11.987.029 5.367 5.396.001 12.017.001z" />
                  </svg>
                  <span>Contribute</span>
                </a>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Resource Form Dialog */}
      {isSignedIn && (
        <ResourceFormDialog
          isOpen={isResourceFormOpen}
          onClose={() => setIsResourceFormOpen(false)}
          onSubmit={handleAddResource}
        />
      )}
    </div>
  );
}
