import React from 'react';

const FooterTemplate = () => (
  <div className="h-[60vh] bg-secondary rounded-t-[50px] md:rounded-t-[75px] flex items-center flex-col justify-center text-center section-padding gap-[25px] md:gap-[50px]">
    <h1 className="  uppercase font-bold text-white leading-none">
      Looking for a Web Developer?
    </h1>
    <button className="border-2 border-white rounded-full text-white px-4 py-2 text-[16px] md:text-[22px] font-normal">
      GET IN TOUCH
    </button>
  </div>
);

export default FooterTemplate;
