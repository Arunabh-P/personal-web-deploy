'use client';
import { Drawer } from '@/components/organism/drawer';
import UnderConstruction from '@/components/organism/under-construction';
import React, { useState } from 'react';

const FooterTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="h-[60vh] bg-secondary rounded-t-[50px] md:rounded-t-[75px] flex items-center flex-col justify-center text-center section-padding gap-[25px] md:gap-[50px]">
      <Drawer position="bottom" isOpen={isOpen} onClose={handleClose}>
        <UnderConstruction />
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
