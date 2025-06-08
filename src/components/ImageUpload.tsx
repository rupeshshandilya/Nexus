"use client";

import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  let cloudinary: {
    openUploadWidget: (
      options: unknown,
      callback: (error: unknown, result: unknown) => void
    ) => void;
  };
}

const uploadPreset = "NexusUpload";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: CloudinaryUploadWidgetResults) => {
      if (
        result.info &&
        typeof result.info === "object" &&
        "secure_url" in result.info
      ) {
        onChange(result.info.secure_url);
      }
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset={uploadPreset}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition-all
              duration-300
              border-dashed 
              border-2 
              p-8
              border-gray-600
              bg-black/40
              rounded-lg
              flex
              flex-col
              justify-center
              items-center
              gap-3
              text-gray-400
              hover:border-indigo-500
              hover:text-indigo-400
              min-h-[120px]
            "
          >
            <TbPhotoPlus size={32} />
            <div className="font-medium text-sm">Click to upload image</div>
            <div className="text-xs text-gray-500">Supports JPG, PNG, WebP</div>
            {value && (
              <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden">
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                  alt="Uploaded resource image"
                  className="rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    Click to change image
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
