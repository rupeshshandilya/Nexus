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
  setSortBy: (sort: SortOption) => void;
  setFilterBy: (filter: FilterOption) => void;
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

  // Use React Query hook for fetching resources
  const {
    data: resources = [],
    isLoading,
    error: queryError,
    refetch,
  } = useResourcesQuery(sortBy, filterBy);

  // Use React Query mutation for creating resources
  const createResourceMutation = useCreateResourceMutation();

  const error = queryError?.message || null;

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

  const value = {
    resources,
    isLoading: isLoading || createResourceMutation.isPending,
    error,
    sortBy,
    filterBy,
    setSortBy,
    setFilterBy,
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
