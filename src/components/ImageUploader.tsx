
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { useDiseaseDetection } from '@/context/DiseaseDetectionContext';

const ImageUploader = () => {
  const { imagePreview, setSelectedImage } = useDiseaseDetection();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h3 className="text-lg font-medium mb-2">Upload Plant Image</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Upload a clear image of the affected plant part for best results
        </p>

        {!imagePreview ? (
          <div
            onClick={handleClick}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-primary transition-colors"
          >
            <div className="flex flex-col items-center justify-center">
              <Upload className="h-12 w-12 text-gray-400 mb-3" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Plant preview"
              className="mx-auto max-h-96 rounded-md"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-black bg-opacity-70 text-white p-1 rounded-full hover:bg-opacity-100 transition-opacity"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {!imagePreview && (
          <Button 
            onClick={handleClick}
            className="mt-4"
            variant="outline"
          >
            <Upload className="mr-2 h-4 w-4" />
            Select Image
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
