
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, FileType, AlertCircle } from 'lucide-react';
import { useDiseaseDetection } from '@/context/DiseaseDetectionContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ImageUploader = () => {
  const { imagePreview, setSelectedImage } = useDiseaseDetection();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError(`File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB)`);
      return false;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return false;
    }

    // Clear previous errors
    setError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      
      if (validateFile(selectedFile)) {
        setSelectedImage(selectedFile);
      } else {
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      
      if (validateFile(droppedFile)) {
        setSelectedImage(droppedFile);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h3 className="text-lg font-medium mb-2">Upload Plant Image</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Upload a clear image of the affected plant part for best results
        </p>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!imagePreview ? (
          <div
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-primary transition-colors"
          >
            <div className="flex flex-col items-center justify-center">
              <FileType className="h-12 w-12 text-gray-400 mb-3" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
            </div>
          </div>
        ) : (
          <div className="relative rounded-md overflow-hidden">
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
          accept="image/png, image/jpeg, image/webp"
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
