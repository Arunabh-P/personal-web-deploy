/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-lines-per-function */
/* eslint-disable func-style */
/* eslint-disable max-statements */
'use client';

import React, { useRef, useState } from 'react';
import ReactCrop, {
  type Crop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  imageUrl: string;
  onCropComplete: (croppedBlob: Blob) => void;
  onCancel: () => void;
}

const MAX_WIDTH = 320;
const MAX_HEIGHT = 320;

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageUrl,
  onCropComplete,
  onCancel,
}) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  function centerSquareCrop(mediaWidth: number, mediaHeight: number) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;

    e.currentTarget.style.maxWidth = `${MAX_WIDTH}px`;
    e.currentTarget.style.maxHeight = `${MAX_HEIGHT}px`;
    e.currentTarget.style.objectFit = 'contain';

    const initialCrop = centerSquareCrop(width, height);
    setCrop(initialCrop);
    setCompletedCrop(initialCrop);
  }

  const getCroppedImg = async (
    image: HTMLImageElement,
    cropArea: Crop
  ): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const size = Math.min(cropArea.width, cropArea.height);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    await new Promise((resolve) => {
      ctx.drawImage(
        image,
        cropArea.x * scaleX,
        cropArea.y * scaleY,
        size * scaleX,
        size * scaleY,
        0,
        0,
        size,
        size
      );
      resolve(undefined);
    });

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          resolve(blob);
        },
        'image/jpeg',
        1
      );
    });
  };

  const handleCropComplete = async () => {
    if (!completedCrop || !imgRef.current) {
      return;
    }

    try {
      const croppedBlob = await getCroppedImg(imgRef.current, completedCrop);
      onCropComplete(croppedBlob);
    } catch (e) {
      console.error('Error cropping image:', e);
    }
  };

  return (
    <div className="w-fit  max-w-[320px]">
      <ReactCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
        aspect={1}
        circularCrop={false}
      >
        <img
          ref={imgRef}
          src={imageUrl}
          alt="Crop me"
          onLoad={onImageLoad}
          className="max-w-full h-auto"
          style={{
            maxWidth: MAX_WIDTH,
            maxHeight: MAX_HEIGHT,
            objectFit: 'contain',
          }}
        />
      </ReactCrop>
      <div className="mt-4 flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleCropComplete}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Complete Crop
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
