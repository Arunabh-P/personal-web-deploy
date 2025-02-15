'use client';
import { Drawer } from '@/components/organism/drawer';
import React, { useEffect, useState } from 'react';
import { ContactForm } from './contact-form';

const FooterTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="h-[60vh] bg-secondary rounded-t-[50px] md:rounded-t-[75px] flex items-center flex-col justify-center text-center section-padding gap-[25px] md:gap-[50px]">
      <Drawer position="bottom" isOpen={isOpen} onClose={handleClose}>
        <ContactForm onClose={handleClose} />
      </Drawer>
      <h1 className="  uppercase font-bold text-white leading-none">
        Looking for a Web Developer?
      </h1>
      <button
        onClick={() => setIsOpen(true)}
        className="border-2 border-white rounded-full text-white px-4 py-2 text-[16px] md:text-[22px] font-normal hover:bg-white hover:text-secondary"
      >
        GET IN TOUCH
      </button>
    </div>
  );
};

export default FooterTemplate;
