/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
'use client';

import Image from 'next/image';
import React, { useState, useId, useEffect } from 'react';
import InputField from '../molecule/input-field';
import TextArea from '../molecule/text-area';
import ImageCropper from '../molecule/image-croper';
import { Modal } from '../organism/modal';

const TestimonialForm = () => {
  const formId = useId();
  const imageUploadId = useId();

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    quote: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting state to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setTempImageUrl(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedBlob: Blob) => {
    const croppedFile = new File([croppedBlob], 'cropped.jpg', {
      type: 'image/jpeg',
    });
    setImage(croppedFile);
    const newPreviewUrl = URL.createObjectURL(croppedBlob);
    setPreviewUrl(newPreviewUrl);
    setShowCropper(false);

    return () => URL.revokeObjectURL(newPreviewUrl);
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setTempImageUrl('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Submitting...');

    try {
      let imageUrl = '';
      if (image) {
        const imgformData = new FormData();
        imgformData.append('file', image);

        const uploadResponse = await fetch('/api/upload-photo', {
          method: 'POST',
          body: imgformData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Image upload failed');
        }
        const imageData = await uploadResponse.json();
        imageUrl = imageData.url;
      }

      const response = await fetch('/api/testimonial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
        }),
      });

      if (response.ok) {
        setStatus('Testimonial submitted successfully!');
        setFormData({
          name: '',
          position: '',
          company: '',
          quote: '',
        });
        setImage(null);
        setPreviewUrl('');
      } else {
        const error = await response.json();
        setStatus(error.message || 'Failed to submit testimonial');
      }
    } catch (error) {
      setStatus('Error submitting testimonial');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
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

  if (!isMounted) {
    return null;
  }

  return (
    <div className="testimonial-form">
      <Modal isOpen={showCropper} onClose={handleCropCancel}>
        <ImageCropper
          imageUrl={tempImageUrl}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      </Modal>
      <form id={formId} onSubmit={handleSubmit} className="space-y-6">
        <div>
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
          <div className="grid md:grid-cols-2 gap-2 md:gap-6">
            <InputField
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              label="Name"
            />
            <InputField
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              label="Company"
            />
            <InputField
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              label="Position"
            />
            <TextArea
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              required
              rows={4}
              label="Quote"
            />
          </div>
        </div>
        <div className="w-full flex justify-start md:pt-5 pb-5">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 h-[50px] xl:h-[60px] border-2  border-secondary rounded-xl md:w-1/2 uppercase font-bold shadow-sm text-white bg-secondary hover:bg-secondary-dark text-[16px] xl:text-[18px] ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Submit your voice'}
          </button>
        </div>
        {status && (
          <p
            className={`text-center ${
              status.includes('successfully')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
};

export default TestimonialForm;
