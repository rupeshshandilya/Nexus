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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import { Edit, Trash2, ExternalLink, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { Resource } from "../types";
import Link from "next/link";
import { resourceTags } from "@/constants/resourceTags";
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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isResourceFormOpen, setIsResourceFormOpen] = useState(false);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
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

  const handleEditResource = (resource: Resource) => {
    // Ensure tag is always an array for editing
    const resourceToEdit = {
      ...resource,
      tag: Array.isArray(resource.tag) ? resource.tag : [resource.tag],
    };
    setEditingResource(resourceToEdit);
    setIsEditDialogOpen(true);
  };

  const handleTagToggle = (tagValue: string) => {
    if (!editingResource) return;

    const currentTags = Array.isArray(editingResource.tag)
      ? editingResource.tag
      : [editingResource.tag];
    const newTags = currentTags.includes(tagValue)
      ? currentTags.filter((t) => t !== tagValue)
      : [...currentTags, tagValue];

    setEditingResource({
      ...editingResource,
      tag: newTags,
    });
  };

  const handleSaveResource = async () => {
    if (!editingResource) return;

    try {
      await updateResourceMutation.mutateAsync({
        id: editingResource.id,
        title: editingResource.title,
        description: editingResource.description,
        imageUrl: editingResource.imageUrl,
        link: editingResource.link,
        tag: editingResource.tag,
      });

      setIsEditDialogOpen(false);
      setEditingResource(null);
      toast({
        title: "Resource updated",
        description: "Your resource has been successfully updated.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update resource. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteResource = async (resourceId: string) => {
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
    newResource: Omit<Resource, "id" | "userId">
  ) => {
    try {
      await createResourceMutation.mutateAsync(newResource);
      setIsResourceFormOpen(false);
      toast({
        title: "Resource created",
        description: "Your resource has been successfully created.",
      });
      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create resource";
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Sign in required</h2>
              <p className="text-muted-foreground mb-4">
                Please sign in to view and manage your resources.
              </p>
              <Button asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>

              <Button
            className="mt-4 md:mt-0"
            onClick={() => setIsResourceFormOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Resource
          </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4 md:mb-0"
            >
              &larr; Back
            </Button>
            <h1 className="text-3xl font-bold mb-2">My Resources</h1>
            <p className="text-muted-foreground">
              Manage your uploaded resources - edit, delete, or add new ones
            </p>
          </div>
          <Button
            className="mt-4 md:mt-0"
            onClick={() => setIsResourceFormOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Resource
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resources.length}</div>
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
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-muted-foreground mb-4">
                  {searchTerm
                    ? "No resources match your search criteria."
                    : "You haven't uploaded any resources yet."}
                </div>
                <Button onClick={() => setIsResourceFormOpen(true)}>
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
                  className="group hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={resource.imageUrl || "/placeholder.svg"}
                        alt={resource.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="mb-2 line-clamp-1">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="mb-3 line-clamp-2">
                      {resource.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {Array.isArray(resource.tag) ? (
                        resource.tag.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          {resource.tag}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1"
                    >
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditResource(resource)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Resource</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete &ldquo;
                            {resource.title}&rdquo;? This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteResource(resource.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Resource</DialogTitle>
              <DialogDescription>
                Update your resource information below.
              </DialogDescription>
            </DialogHeader>
            {editingResource && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editingResource.title}
                    onChange={(e) =>
                      setEditingResource({
                        ...editingResource,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editingResource.description}
                    onChange={(e) =>
                      setEditingResource({
                        ...editingResource,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="link">URL</Label>
                  <Input
                    id="link"
                    type="url"
                    value={editingResource.link}
                    onChange={(e) =>
                      setEditingResource({
                        ...editingResource,
                        link: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={editingResource.imageUrl}
                    onChange={(e) =>
                      setEditingResource({
                        ...editingResource,
                        imageUrl: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tag">Tags</Label>

                  {/* Custom Multi-Select Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                      className="w-full px-3 py-2 border rounded-md bg-background text-foreground flex justify-between items-center"
                    >
                      <span className="text-left flex-1">
                        {editingResource.tag.length > 0
                          ? editingResource.tag.length === 1
                            ? editingResource.tag[0]
                            : `${editingResource.tag.length} tags selected`
                          : "Select tags"}
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isTagDropdownOpen ? "rotate-180" : ""
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
                        />
                      </svg>
                    </button>

                    {/* Dropdown Options */}
                    {isTagDropdownOpen && (
                      <div className="absolute z-10 w-full bottom-full mb-1 bg-background border rounded-md shadow-xl max-h-48 overflow-y-auto">
                        {resourceTags.map((tag) => (
                          <label
                            key={tag}
                            className="flex items-center px-3 py-2 hover:bg-muted cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={editingResource.tag.includes(tag)}
                              onChange={() => handleTagToggle(tag)}
                              className="w-4 h-4 mr-3 rounded"
                            />
                            <span className="text-sm">{tag}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Selected Tags Display */}
                  {editingResource.tag.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {editingResource.tag.map((selectedTag) => (
                        <span
                          key={selectedTag}
                          onClick={() => handleTagToggle(selectedTag)}
                          className="inline-flex items-center px-2 py-1 text-xs bg-muted rounded-full cursor-pointer hover:bg-muted/80 transition-colors"
                        >
                          {selectedTag}
                          <svg
                            className="w-3 h-3 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveResource}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Resource Form Dialog */}
        <ResourceFormDialog
          isOpen={isResourceFormOpen}
          onClose={() => setIsResourceFormOpen(false)}
          onSubmit={handleAddResource}
        />
      </div>
    </div>
  );
}
