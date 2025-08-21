"use client";
import React, { createContext, useContext, useState } from "react";
import { Resource } from "../app/types";
import { ResourceTag } from "@/constants/resourceTags";
import {
  useResourcesQuery,
  useCreateResourceMutation,
} from "@/hooks/useResources";

type SortOption = "A-Z" | "Z-A" | "Newest" | "Oldest";
export type FilterOption = "None" | ResourceTag;

interface ResourcesContextType {
  resources: Resource[];
  isLoading: boolean;
  error: string | null;
  sortBy: SortOption;
  filterBy: FilterOption;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  searchQuery: string;
  setSortBy: (sort: SortOption) => void;
  setFilterBy: (filter: FilterOption) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (limit: number) => void;
  setSearchQuery: (search: string) => void;
  addResource: (
    resource: Omit<Resource, "id" | "userId">
  ) => Promise<{ success: boolean; error?: string }>;
  fetchResources: () => Promise<void>;
}

const ResourcesContext = createContext<ResourcesContextType | undefined>(
  undefined
);

export function ResourcesProvider({ children }: { children: React.ReactNode }) {
  const [sortBy, setSortBy] = useState<SortOption>("Newest");
  const [filterBy, setFilterBy] = useState<FilterOption>("None");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");

  // Use React Query hook for fetching resources with pagination and search
  const {
    data,
    isLoading,
    error: queryError,
    refetch,
  } = useResourcesQuery(sortBy, filterBy, currentPage, itemsPerPage, searchQuery);

  // Use React Query mutation for creating resources
  const createResourceMutation = useCreateResourceMutation();

  const error = queryError?.message || null;

  // Extract data from the new API response structure
  const resources = data?.resources || [];
  const totalPages = data?.pagination?.pages || 1;
  const totalItems = data?.pagination?.total || 0;

  const addResource = async (
    newResource: Omit<Resource, "id" | "userId">
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      await createResourceMutation.mutateAsync(newResource);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      return { success: false, error: errorMessage };
    }
  };

  const fetchResources = async () => {
    await refetch();
  };

  // Reset to page 1 when filters/search change to avoid empty results
  const handleSortByChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleFilterByChange = (filter: FilterOption) => {
    setFilterBy(filter);
    setCurrentPage(1);
  };

  const handleSearchQueryChange = (search: string) => {
    setSearchQuery(search);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  const value = {
    resources,
    isLoading: isLoading || createResourceMutation.isPending,
    error,
    sortBy,
    filterBy,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    searchQuery,
    setSortBy: handleSortByChange,
    setFilterBy: handleFilterByChange,
    setCurrentPage,
    setItemsPerPage: handleItemsPerPageChange,
    setSearchQuery: handleSearchQueryChange,
    addResource,
    fetchResources,
  };

  return (
    <ResourcesContext.Provider value={value}>
      {children}
    </ResourcesContext.Provider>
  );
}

export function useResources() {
  const context = useContext(ResourcesContext);
  if (context === undefined) {
    throw new Error("useResources must be used within a ResourcesProvider");
  }
  return context;
}
