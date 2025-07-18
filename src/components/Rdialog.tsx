"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { X, Upload, Link2, Tag, FileText, Type } from "lucide-react";
import { Resource } from "../app/types/index";
import { resourceTags } from "@/constants/resourceTags";
import ImageUpload from "./ImageUpload";

// SearchableDropdown component
function SearchableDropdown({
  categories,
  selectedCategories,
  onCategorySelect,
}: {
  categories: string[];
  selectedCategories: string[];
  onCategorySelect: (category: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredCategories = categories.filter(
    (category) =>
      category.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedCategories.includes(category)
  );

  const handleSelect = (category: string) => {
    onCategorySelect(category);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search and select categories..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 h-12 text-base pr-10"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Tag className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleSelect(category)}
                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 focus:bg-gray-700 focus:outline-none transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {category}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-400 text-center">
                {searchTerm
                  ? `No categories found for "${searchTerm}"`
                  : "No more categories available"}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

interface ResourceFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    resource: Omit<Resource, "id" | "userId">
  ) => Promise<{ success: boolean; error?: string }>;
}

export default function ResourceFormDialog({
  isOpen,
  onClose,
  onSubmit,
}: ResourceFormDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    link: "",
    tag: [] as string[], // Array for multiple selection
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        link: "",
        tag: [],
      });
      setSelectedCategories([]);
      setError(null);
    }
  }, [isOpen]);

  // Close dialog when escape key is pressed
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling on body when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleCategorySelect = (category: string) => {
    if (!selectedCategories.includes(category)) {
      const newCategories = [...selectedCategories, category];
      setSelectedCategories(newCategories);
      setFormData((prev) => ({
        ...prev,
        tag: newCategories,
      }));
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    const newCategories = selectedCategories.filter(
      (cat) => cat !== categoryToRemove
    );
    setSelectedCategories(newCategories);
    setFormData((prev) => ({
      ...prev,
      tag: newCategories,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await onSubmit(formData);

      if (result.success) {
        onClose();
      } else {
        setError(result.error || "Failed to create resource");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 backdrop-blur-md">
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">
                Add New Resource
              </h1>
              <p className="text-gray-400 text-lg">
                Share your favorite design resources with the community
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-2"
              aria-label="Close dialog"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Title Field */}
              <Card className="border border-gray-800 shadow-lg bg-gray-800/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Type className="w-5 h-5 text-purple-500" />
                    Resource Title
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter a descriptive title..."
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 h-12 text-base"
                    required
                  />
                </CardContent>
              </Card>

              {/* Resource Link Field */}
              <Card className="border border-gray-800 shadow-lg bg-gray-800/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Link2 className="w-5 h-5 text-blue-500" />
                    Resource URL
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    name="link"
                    type="url"
                    value={formData.link}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 h-12 text-base"
                    required
                  />
                </CardContent>
              </Card>
            </div>

            {/* Description Field */}
            <Card className="border border-gray-800 shadow-lg bg-gray-800/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-white">
                  <FileText className="w-5 h-5 text-green-500" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what makes this resource valuable and how others can use it..."
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 min-h-32 text-base resize-none"
                  required
                />
              </CardContent>
            </Card>

            {/* Resource Image Upload */}
            <Card className="border border-gray-800 shadow-lg bg-gray-800/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Upload className="w-5 h-5 text-orange-500" />
                  Resource Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={formData.imageUrl}
                  onChange={handleImageUpload}
                />
                {!formData.imageUrl && (
                  <p className="text-xs text-gray-500 mt-2">
                    Upload an image to represent your resource
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Categories Selection */}
            <Card className="border border-gray-800 shadow-lg bg-gray-800/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Tag className="w-5 h-5 text-indigo-500" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <SearchableDropdown
                  categories={[...resourceTags]}
                  selectedCategories={selectedCategories}
                  onCategorySelect={handleCategorySelect}
                />

                {selectedCategories.length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-300">
                      Selected Categories:
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategories.map((category) => (
                        <Badge
                          key={category}
                          className="px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 border-0"
                        >
                          {category}
                          <button
                            type="button"
                            onClick={() => removeCategory(category)}
                            className="ml-2 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                disabled={
                  isSubmitting ||
                  !formData.imageUrl ||
                  selectedCategories.length === 0
                }
              >
                {isSubmitting ? "Adding..." : "Share Resource"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
