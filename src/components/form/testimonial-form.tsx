/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
'use client';

import React, { useState, useId, useEffect } from 'react';
import InputField from '../molecule/input-field';
import TextArea from '../molecule/text-area';
import ImageCropper from '../molecule/image-croper';
import { Modal } from '../organism/modal';
import UploadProfilePhoto from './profile-photo-upload';

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter name';
    }
    if (!formData.position.trim()) {
      newErrors.position = 'Please enter your position in company';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Please enter your company name';
    }
    if (!formData.quote.trim()) {
      newErrors.quote = 'Please enter quote';
    }
    if (!image) {
      newErrors.image = 'Please add your photo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    setPreviewUrl(URL.createObjectURL(croppedBlob));
    setShowCropper(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
          isApproved: false,
          createdAt: Date.now,
        }),
      });

      if (response.ok) {
        setStatus('Testimonial submitted successfully!');
        setFormData({ name: '', position: '', company: '', quote: '' });
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
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="testimonial-form">
      <Modal isOpen={showCropper} onClose={() => setShowCropper(false)}>
        <ImageCropper
          imageUrl={tempImageUrl}
          onCropComplete={handleCropComplete}
          onCancel={() => setShowCropper(false)}
        />
      </Modal>
      <form id={formId} onSubmit={handleSubmit} className="space-y-6">
        <UploadProfilePhoto
          previewUrl={previewUrl}
          imageUploadId={imageUploadId}
          handleImageChange={handleImageChange}
        />
        {errors.image && <p className="text-red-600">{errors.image}</p>}
        <div className="grid md:grid-cols-2 gap-2 md:gap-6">
          <InputField
            name="name"
            value={formData.name}
            onChange={handleChange}
            label="Name"
            error={errors.name}
          />
          <InputField
            name="company"
            value={formData.company}
            onChange={handleChange}
            label="Company"
            error={errors.company}
          />
          <InputField
            name="position"
            value={formData.position}
            onChange={handleChange}
            label="Position"
            error={errors.position}
          />
          <TextArea
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            rows={4}
            label="Quote"
            error={errors.quote}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 h-[50px] border-2 border-secondary rounded-xl md:w-1/2 uppercase font-bold shadow-sm text-white bg-secondary hover:bg-secondary-dark ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Submitting...' : 'Submit your voice'}
        </button>
        {status && (
          <p
            className={`text-center ${status.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
};

export default TestimonialForm;
