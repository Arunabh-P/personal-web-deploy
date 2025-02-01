import React from 'react';
import Image from 'next/image';

interface ImageUploadSectionProps {
  previewUrl: string;
  imageUploadId: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadProfilePhoto: React.FC<ImageUploadSectionProps> = ({
  previewUrl,
  imageUploadId,
  handleImageChange,
}) => (
  <div>
    <div className="mt-1 flex items-center justify-start pb-5">
      <div className="relative">
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          id={imageUploadId}
        />
        <label
          htmlFor={imageUploadId}
          className="cursor-pointer bg-white border border-secondary rounded-md flex items-center justify-center hover:bg-primary-light"
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              width={128}
              height={128}
              className="object-cover rounded-md"
              unoptimized
            />
          ) : (
            <div className="h-32 w-32 flex items-center justify-center rounded-md">
              <Image
                src="https://res.cloudinary.com/dku0lexry/image/upload/v1738396024/personal-website/icons/camera_xfjxt8.png"
                width={25}
                height={25}
                alt="Upload Photo"
                priority
              />
            </div>
          )}
        </label>
      </div>
    </div>
  </div>
);

export default UploadProfilePhoto;
