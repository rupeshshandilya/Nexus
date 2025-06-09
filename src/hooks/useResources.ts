import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Resource } from "@/app/types";
import { ResourceTag } from "@/constants/resourceTags";

type SortOption = "A-Z" | "Z-A" | "Newest" | "Oldest";
type FilterOption = "None" | ResourceTag;

// Query keys for better cache management
export const QUERY_KEYS = {
  resources: (sortBy: string, tag: string) => ["resources", sortBy, tag],
  userResources: () => ["user-resources"],
} as const;

// Fetch all resources with sorting and filtering
export function useResourcesQuery(sortBy: SortOption, filterBy: FilterOption) {
  const sortMap: Record<SortOption, string> = {
    "A-Z": "title-asc",
    "Z-A": "title-desc",
    Newest: "newest",
    Oldest: "oldest",
  };

  const tag = filterBy === "None" ? "all" : filterBy;

  return useQuery({
    queryKey: QUERY_KEYS.resources(sortMap[sortBy], tag),
    queryFn: async () => {
      const response = await axios.get("/api/resources", {
        params: {
          sortBy: sortMap[sortBy],
          tag,
        },
      });

      if (response.data.status === 200) {
        return response.data.resources as Resource[];
      } else {
        throw new Error("Failed to fetch resources");
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Fetch user's resources
export function useUserResourcesQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.userResources(),
    queryFn: async () => {
      const response = await axios.get("/api/user-resources");

      if (response.data.status === 200) {
        return response.data.resources as Resource[];
      } else {
        throw new Error("Failed to fetch user resources");
      }
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Create a new resource
export function useCreateResourceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newResource: Omit<Resource, "id" | "userId">) => {
      // Convert tag array to comma-separated string for API compatibility
      const resourceData = {
        ...newResource,
        tag: Array.isArray(newResource.tag)
          ? newResource.tag.join(", ")
          : newResource.tag,
      };

      const response = await axios.post("/api/create-resource", resourceData);

      if (response.data.status === 201) {
        return response.data.resource as Resource;
      } else {
        throw new Error(response.data.message || "Failed to create resource");
      }
    },
    onSuccess: (newResource) => {
      // Invalidate and refetch resources queries
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userResources() });

      // Optionally add the new resource to existing cache
      queryClient.setQueryData(
        QUERY_KEYS.userResources(),
        (oldData: Resource[] | undefined) => {
          return oldData ? [newResource, ...oldData] : [newResource];
        }
      );
    },
  });
}

// Update a resource
export function useUpdateResourceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedResource: Partial<Resource> & { id: string }) => {
      const response = await axios.patch(
        "/api/user-resources",
        updatedResource
      );

      if (response.data.status === 200) {
        return response.data.resource as Resource;
      } else {
        throw new Error(response.data.message || "Failed to update resource");
      }
    },
    onSuccess: (updatedResource) => {
      // Invalidate and refetch queries
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userResources() });

      // Update the specific resource in cache
      queryClient.setQueryData(
        QUERY_KEYS.userResources(),
        (oldData: Resource[] | undefined) => {
          return oldData?.map((resource) =>
            resource.id === updatedResource.id ? updatedResource : resource
          );
        }
      );
    },
  });
}

// Delete a resource
export function useDeleteResourceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resourceId: string) => {
      const response = await axios.delete("/api/user-resources", {
        data: { id: resourceId },
      });

      if (response.data.status === 200) {
        return resourceId;
      } else {
        throw new Error(response.data.message || "Failed to delete resource");
      }
    },
    onSuccess: (deletedResourceId) => {
      // Invalidate and refetch queries
      queryClient.invalidateQueries({ queryKey: ["resources"] });

      // Remove the deleted resource from cache
      queryClient.setQueryData(
        QUERY_KEYS.userResources(),
        (oldData: Resource[] | undefined) => {
          return oldData?.filter(
            (resource) => resource.id !== deletedResourceId
          );
        }
      );
    },
  });
}
