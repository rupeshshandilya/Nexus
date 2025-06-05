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
    <>
      {/* Mobile Layout (sm and below) */}
      <div className="lg:hidden min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          fixed top-0 left-0 z-50
          w-64 h-full
          bg-black
          ${isSidebarOpen ? "border-r border-gray-800" : ""}
          shadow-lg shadow-gray-900/30
          ${!isSidebarOpen ? "invisible" : "visible"}
        `}
          style={{
            marginLeft: isSidebarOpen ? "0" : "-256px",
          }}
        >
          <Sidebar />
        </div>

        {/* Mobile Content */}
        <div className="min-h-screen">
          {/* Mobile Header with Hamburger */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black/90">
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
            <h1 className="text-lg md:text-xl font-bold">Resources</h1>
            <div className="w-8"></div>
          </div>

          {/* Mobile/Tablet Action Buttons */}
          <div className="p-4">
            <div className="flex flex-wrap items-center gap-2 justify-end">
              {isSignedIn ? (
                <>
                  <Link
                    href="/my-resources"
                    className="flex items-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-700 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-white transition-colors font-medium shadow-md text-sm sm:text-base"
                  >
                    <span className="hidden sm:inline">My Resources</span>
                    <span className="sm:hidden">My Resources</span>
                  </Link>

                  <button
                    className="flex items-center gap-1 sm:gap-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-white transition-colors font-medium shadow-md text-sm sm:text-base"
                    onClick={() => setIsResourceFormOpen(true)}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
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
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-white transition-colors font-medium shadow-md text-sm sm:text-base"
                >
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile/Tablet Resources section */}
          <div className="container mx-auto px-4 sm:px-6 pb-20">
            <div className="mb-6 mt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold relative">
                  <span>Resources</span>
                  <span className="text-gray-500 ml-2 text-lg sm:text-2xl md:text-3xl">
                    ({resources.length})
                  </span>
                  <div className="h-1 w-16 sm:w-20 bg-gray-700 rounded-full mt-2"></div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 animate-fadeInUp">
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
          </div>
        </div>
      </div>

      {/* Desktop Layout (lg and up) */}
      <div className="hidden lg:flex min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
        {/* Desktop Sidebar */}
        <div className="w-64 h-screen bg-black/50 border-r border-gray-800 shadow-lg shadow-gray-900/30 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Vertical Divider */}
        <div className="w-1 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-700"></div>

        {/* Desktop Main Content */}
        <main className="flex-grow overflow-x-hidden bg-gradient-to-b from-gray-900/70 via-black to-gray-900/70 shadow-inner min-h-screen">
          {/* Desktop Header */}
          <Header />

          {/* Desktop Action Buttons */}
          <div className="absolute right-2 top-2">
            <div className="flex items-center gap-2">
              {isSignedIn ? (
                <>
                  <Link
                    href="/my-resources"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-2xl px-4 py-2.5 text-white transition-colors font-medium shadow-md"
                  >
                    <span>My Resources</span>
                  </Link>

                  <button
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 rounded-2xl px-4 py-2.5 text-white transition-colors font-medium shadow-md"
                    onClick={() => setIsResourceFormOpen(true)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    <span>Add Resource</span>
                  </button>
                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <Link
                  href={`/sign-in?redirect_url=${encodeURIComponent(pathname)}`}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-2xl px-4 py-2.5 text-white transition-colors font-medium shadow-md"
                >
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>

          {/* Desktop Resources section */}
          <div className="container mx-auto px-6 ml-3 pb-20">
            <div className="mb-10 mt-6">
              <div className="flex justify-between items-center gap-4">
                <h2 className="text-4xl font-bold relative">
                  <span>All Resources</span>
                  <span className="text-gray-500 ml-2 text-3xl">
                    ({resources.length})
                  </span>
                  <div className="h-1 w-20 bg-gray-700 rounded-full mt-2"></div>
                </h2>

                <div className="flex gap-2">
                  {/* Sort Dropdown */}
                  <div className="relative sort-dropdown">
                    <button
                      className="flex items-center justify-between gap-2 border border-gray-800 rounded-lg px-4 py-2.5 text-white hover:bg-gray-900 transition-colors"
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
                        {(["A-Z", "Z-A", "Newest", "Oldest"] as const).map(
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
                      className="flex items-center justify-between gap-2 border border-gray-800 rounded-lg px-4 py-2.5 text-white hover:bg-gray-900 transition-colors"
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
                        {["None", ...resourceTags].map((option) => (
                          <button
                            key={option}
                            className="block w-full text-left px-4 py-2.5 hover:bg-black/50 transition-colors"
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
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-indigo-600"></div>
                <p className="mt-4 text-gray-400">Loading resources...</p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="text-center py-16">
                <p className="text-red-400">{error}</p>
                <button
                  onClick={fetchResources}
                  className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Resources Grid */}
            {!isLoading && !error && (
              <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 animate-fadeInUp">
                {resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}

            {/* No results message */}
            {!isLoading && !error && resources.length === 0 && (
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

      {/* Resource Form Dialog */}
      {isSignedIn && (
        <ResourceFormDialog
          isOpen={isResourceFormOpen}
          onClose={() => setIsResourceFormOpen(false)}
          onSubmit={handleAddResource}
        />
      )}
    </>
  );
}
