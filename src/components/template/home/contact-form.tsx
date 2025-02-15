/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
'use client';

import InputField from '@/components/molecule/input-field';
import PhoneInputField from '@/components/molecule/phone-input';
import TextArea from '@/components/molecule/text-area';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhoneChange = (phone: string) => {
    setFormData((prev) => ({
      ...prev,
      phone,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // First, save to database
      const saveResponse = await fetch('/api/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save contact information');
      }

      // Then, send email
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: formData.email,
          name: formData.name,
          subject: 'Thank you for contacting us',
          body: `<h1>Hello ${formData.name}!</h1><p>Thank you for submitting the form. I will reach out to you soon!</p>`,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          label="Name"
          className="h-[50px]"
        />
        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          label="Email"
          className="h-[50px]"
        />
        <PhoneInputField
          value={formData.phone}
          onChange={handlePhoneChange}
          label="Phone Number"
        />
        <TextArea
          name="message"
          value={formData.message}
          onChange={handleChange}
          label="Message"
          required
          rows={3}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 h-[50px] border-2 rounded-md border-secondary uppercase font-bold shadow-sm text-white bg-secondary hover:bg-secondary-dark ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {error && (
          <div className="mt-2 text-sm text-red-500" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-2 text-sm text-green-500" role="alert">
            Thank you for your message! We'll be in touch soon.
          </div>
        )}
      </form>
    </div>
  );
}
