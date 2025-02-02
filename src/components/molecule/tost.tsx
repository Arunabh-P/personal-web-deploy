/* eslint-disable consistent-return */
import { useToastStore } from '@/store/tost';
import Image from 'next/image';
import React, { useEffect } from 'react';

const Toast = () => {
  const { isVisible, title, message, hideToast } = useToastStore();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-2 bg-white border border-gray-200 shadow-lg rounded-lg p-4 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
    >
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="font-normal">{message}</p>
      </div>

      <button
        onClick={hideToast}
        className="p-1 hover:bg-gray-100 rounded-full"
      >
        <Image
          src="https://res.cloudinary.com/dku0lexry/image/upload/v1738501224/personal-website/icons/cross_z1gbtp.png"
          width={14}
          height={14}
          alt="cancel"
        />
      </button>
    </div>
  );
};

export default Toast;
