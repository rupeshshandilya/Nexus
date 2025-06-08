"use client";
import React, { useState, useEffect } from "react";
import { Resource } from "../app/types/index";
import { resourceTags } from "@/constants/resourceTags";
import ImageUpload from "./ImageUpload";

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
    tag: ["UI"], // Array for multiple selection
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        link: "",
        tag: ["UI"],
      });
      setError(null);
      setIsDropdownOpen(false);
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

  const handleTagToggle = (tagValue: string) => {
    setFormData((prev) => ({
      ...prev,
      tag: prev.tag.includes(tagValue)
        ? prev.tag.filter((t) => t !== tagValue)
        : [...prev.tag, tagValue],
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div className="relative w-full max-w-lg mx-4 bg-gradient-to-b from-gray-900 to-black border border-gray-800/50 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.8)] overflow-hidden animate-scaleIn">
        {/* Glow accent at the top */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-600/20 via-indigo-600/80 to-indigo-600/20"></div>

        <div className="px-6 py-5 border-b border-gray-800/50 flex justify-between items-center bg-black/40 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white">Add New Resource</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
            aria-label="Close dialog"
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 bg-gradient-to-b from-black/20 to-black/40"
        >
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300"
            >
              Title <span className="text-indigo-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Design System Resources"
              className="w-full px-4 py-3 bg-black/70 border border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500 transition-all duration-300 shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Description <span className="text-indigo-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Brief description of the resource..."
              className="w-full px-4 py-3 bg-black/70 border border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500 transition-all duration-300 shadow-inner"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Resource Image <span className="text-indigo-500">*</span>
            </label>
            <ImageUpload
              value={formData.imageUrl}
              onChange={handleImageUpload}
            />
            {!formData.imageUrl && (
              <p className="text-xs text-gray-500 mt-1">
                Upload an image to represent your resource
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-300"
            >
              Resource Link <span className="text-indigo-500">*</span>
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
              placeholder="e.g., https://designsystemresources.com"
              className="w-full px-4 py-3 bg-black/70 border border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500 transition-all duration-300 shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Categories <span className="text-indigo-500">*</span>
            </label>

            {/* Custom Multi-Select Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-3 bg-black/70 border border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white transition-all duration-300 shadow-inner flex justify-between items-center"
              >
                <span className="text-left flex-1">
                  {formData.tag.length > 0
                    ? formData.tag.length === 1
                      ? formData.tag[0]
                      : `${formData.tag.length} categories selected`
                    : "Select categories"}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
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
              {isDropdownOpen && (
                <div className="absolute z-10 w-full bottom-full mb-1 bg-gray-900 border border-gray-800 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                  {resourceTags.map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center px-4 py-2 hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.tag.includes(tag)}
                        onChange={() => handleTagToggle(tag)}
                        className="w-4 h-4 text-indigo-600 bg-black/70 border-gray-600 rounded focus:ring-indigo-500 focus:ring-1 mr-3"
                      />
                      <span className="text-sm text-gray-300">{tag}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Tags Display */}
            {formData.tag.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tag.map((selectedTag) => (
                  <span
                    key={selectedTag}
                    onClick={() => handleTagToggle(selectedTag)}
                    className="inline-flex items-center px-2 py-1 text-xs bg-indigo-600/20 text-indigo-400 rounded-full border border-indigo-600/30 cursor-pointer hover:bg-indigo-600/30 transition-colors"
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

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-black/60 border border-gray-800 rounded-lg hover:bg-gray-900 text-white font-medium transition-colors duration-300"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors duration-300 shadow-lg shadow-indigo-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                isSubmitting || !formData.imageUrl || formData.tag.length === 0
              }
            >
              {isSubmitting ? "Adding..." : "Add Resource"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
