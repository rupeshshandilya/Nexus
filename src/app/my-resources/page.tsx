"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, Plus, Search, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { Resource } from "../types";
import Link from "next/link";

import { useRouter } from "next/navigation";
import ResourceFormDialog from "../../components/Rdialog";
import {
  useUserResourcesQuery,
  useCreateResourceMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation,
} from "@/hooks/useResources";

export default function MyResourcesPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [isResourceFormOpen, setIsResourceFormOpen] = useState(false);
  const { toast } = useToast();

  // Use React Query hooks
  const {
    data: resources = [],
    isLoading,
    error: queryError,
  } = useUserResourcesQuery();

  const createResourceMutation = useCreateResourceMutation();
  const updateResourceMutation = useUpdateResourceMutation();
  const deleteResourceMutation = useDeleteResourceMutation();

  const error = queryError?.message || null;

  // Filter resources based on search
  const filteredResources = resources.filter((resource) => {
    const tagText = Array.isArray(resource.tag)
      ? resource.tag.join(" ")
      : String(resource.tag);

    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tagText.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleCardClick = (resource: Resource) => {
    let countdown = 3;

    // Show initial toast with countdown
    const { dismiss, update } = toast({
      description: `Redirecting to ${resource.title} in ${countdown} seconds...`,
      duration: 0, // Don't auto-dismiss, we'll control it manually
    });

    // Create countdown interval
    const countdownInterval = setInterval(() => {
      countdown--;

      if (countdown > 0) {
        // Update toast with new countdown
        update({
          description: `Redirecting to ${resource.title} in ${countdown} seconds...`,
        });
      } else {
        // Countdown finished, redirect
        clearInterval(countdownInterval);
        dismiss();

        // Ensure URL has protocol
        let url = resource.link;
        if (!url.match(/^https?:\/\//)) {
          url = `https://${url}`;
        }

        try {
          // Open in new tab
          window.open(url, "_blank", "noopener,noreferrer");
        } catch (error) {
          console.error("Failed to open link:", error);
          // Show error toast if opening fails
          toast({
            title: "Error",
            description: `Failed to open ${resource.title}. Please try again.`,
            variant: "destructive",
            duration: 5000,
          });
        }
      }
    }, 1000);

    // Cleanup function in case component unmounts
    return () => {
      clearInterval(countdownInterval);
      dismiss();
    };
  };

  const handleEditResource = (resource: Resource, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when editing
    // Ensure tag is always an array for editing
    const resourceToEdit = {
      ...resource,
      tag: Array.isArray(resource.tag) ? resource.tag : [resource.tag],
    };
    setEditingResource(resourceToEdit);
    setIsResourceFormOpen(true);
  };

  const handleDeleteResource = async (
    resourceId: string,
    e?: React.MouseEvent
  ) => {
    if (e) {
      e.stopPropagation(); // Prevent card click when deleting
    }
    try {
      await deleteResourceMutation.mutateAsync(resourceId);
      toast({
        title: "Resource deleted",
        description: "Your resource has been successfully deleted.",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete resource. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddResource = async (
    resourceData: Omit<Resource, "id" | "userId">
  ) => {
    try {
      if (editingResource) {
        // Update existing resource
        await updateResourceMutation.mutateAsync({
          id: editingResource.id,
          title: resourceData.title,
          description: resourceData.description,
          imageUrl: resourceData.imageUrl,
          link: resourceData.link,
          tag: resourceData.tag,
        });
        toast({
          title: "Resource updated",
          description: "Your resource has been successfully updated.",
        });
      } else {
        // Create new resource
        await createResourceMutation.mutateAsync(resourceData);
        toast({
          title: "Resource created",
          description: "Your resource has been successfully created.",
        });
      }

      setIsResourceFormOpen(false);
      setEditingResource(null);
      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : editingResource
          ? "Failed to update resource"
          : "Failed to create resource";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return { success: false, error: errorMessage };
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-900 bg-opacity-40 backdrop-blur-sm border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-white">
                Sign in required
              </h2>
              <p className="text-gray-400 mb-4">
                Please sign in to view and manage your resources.
              </p>
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4 md:mb-0 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              &larr; Back
            </Button>
            <h1 className="text-3xl font-bold mb-2 text-white">My Resources</h1>
            <p className="text-gray-400">
              Manage your uploaded resources - edit, delete, or add new ones
            </p>
          </div>
          <Button
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              setEditingResource(null);
              setIsResourceFormOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Resource
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-800 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-8">
          <Card className="bg-gray-900 bg-opacity-40 backdrop-blur-sm border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Total Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {resources.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-indigo-600"></div>
            <p className="mt-4 text-gray-400">Loading your resources...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-400">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        )}

        {/* Resources Grid */}
        {!isLoading &&
          !error &&
          (resources.length === 0 ? (
            <Card className="text-center py-12 bg-gray-900 bg-opacity-40 backdrop-blur-sm border-gray-800">
              <CardContent>
                <div className="text-gray-400 mb-4">
                  {searchTerm
                    ? "No resources match your search criteria."
                    : "You haven't uploaded any resources yet."}
                </div>
                <Button
                  onClick={() => {
                    setEditingResource(null);
                    setIsResourceFormOpen(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Resource
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card
                  key={resource.id}
                  className="bg-gray-900 bg-opacity-40 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col h-full border border-gray-800 transition-all duration-300 hover:border-gray-600 hover:shadow-[0_0_20px_rgba(75,75,75,0.15)] group cursor-pointer"
                  onClick={() => handleCardClick(resource)}
                >
                  <CardHeader className="p-0">
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={resource.imageUrl || "/placeholder.svg"}
                        alt={resource.title}
                        width={300}
                        height={200}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90"></div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex flex-col flex-grow relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <CardTitle className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300 line-clamp-1">
                        {resource.title}
                      </CardTitle>
                      <div className="text-gray-400 transition-colors p-1">
                        <ExternalLink className="h-5 w-5" />
                      </div>
                    </div>
                    <CardDescription className="text-gray-400 flex-grow mb-4 line-clamp-2">
                      {resource.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {Array.isArray(resource.tag) ? (
                        resource.tag.map((tag) => (
                          <Badge
                            key={tag}
                            className="text-xs bg-blue-600/20 text-blue-400 border-blue-600/30 hover:bg-blue-600/30"
                          >
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <Badge className="text-xs bg-blue-600/20 text-blue-400 border-blue-600/30 hover:bg-blue-600/30">
                          {resource.tag}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex gap-2 justify-end">
                    <Button
                      size="sm"
                      onClick={(e) => handleEditResource(resource, e)}
                      className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-red-600 hover:bg-red-700 text-white border-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-gray-900 border-gray-800">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">
                            Delete Resource
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-400">
                            Are you sure you want to delete &ldquo;
                            {resource.title}&rdquo;? This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={(e) =>
                              handleDeleteResource(resource.id, e)
                            }
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ))}

        {/* Resource Form Dialog */}
        <ResourceFormDialog
          isOpen={isResourceFormOpen}
          onClose={() => {
            setIsResourceFormOpen(false);
            setEditingResource(null);
          }}
          onSubmit={handleAddResource}
          editingResource={editingResource}
        />
      </div>
    </div>
  );
}
