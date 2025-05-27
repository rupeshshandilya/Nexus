"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { Resource } from "../app/types";
import { ResourceTag } from "@/constants/resourceTags";

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
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("Newest");
  const [filterBy, setFilterBy] = useState<FilterOption>("None");

  const fetchResources = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const sortMap: Record<SortOption, string> = {
        "A-Z": "title-asc",
        "Z-A": "title-desc",
        Newest: "newest",
        Oldest: "oldest",
      };

      const tag = filterBy === "None" ? "all" : filterBy.toLowerCase();

      const response = await axios.get("/api/resources", {
        params: {
          sortBy: sortMap[sortBy],
          tag,
        },
      });

      if (response.data.status === 200) {
        setResources(response.data.resources);
      } else {
        setError("Failed to fetch resources");
      }
    } catch (err) {
      setError("Error loading resources");
      console.error("Error fetching resources:", err);
    } finally {
      setIsLoading(false);
    }
  }, [sortBy, filterBy]);

  const addResource = useCallback(
    async (newResource: Omit<Resource, "id" | "userId">) => {
      try {
        const response = await axios.post("/api/create-resource", newResource);

        if (response.data.status === 201) {
          const createdResource = response.data.resource;

          setResources((prevResources) => {
            const sortMap: Record<
              SortOption,
              (a: Resource, b: Resource) => number
            > = {
              "A-Z": (a, b) => a.title.localeCompare(b.title),
              "Z-A": (a, b) => b.title.localeCompare(a.title),
              Newest: (a, b) => b.id.localeCompare(a.id),
              Oldest: (a, b) => a.id.localeCompare(b.id),
            };

            // Add the new resource to the beginning of the array for immediate visibility
            const updatedResources = [createdResource, ...prevResources];
            return updatedResources.sort(sortMap[sortBy]);
          });

          return { success: true };
        } else {
          return { success: false, error: response.data.message };
        }
      } catch (err) {
        console.error("Error adding resource:", err);
        if (axios.isAxiosError(err)) {
          return {
            success: false,
            error: err.response?.data?.message || "Failed to create resource",
          };
        }
        return { success: false, error: "An unexpected error occurred" };
      }
    },
    [sortBy]
  );

  // Fetch resources when sort or filter changes
  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const value = {
    resources,
    isLoading,
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
