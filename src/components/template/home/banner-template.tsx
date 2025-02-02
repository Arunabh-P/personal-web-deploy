import React from 'react';

const BannerTemplate = () => (
  <div className="h-[85vh] bg-secondary rounded-b-[50px] md:rounded-b-[100px] flex flex-col justify-center items-start section-padding gap-[25px] md:gap-[50px]">
    <h1 className="text-[42px] md:text-[62px] lg:text-[72px] 2xl:text-[84px]  uppercase font-bold text-white leading-none">
      SOFTWARE <br /> DEVELOPER
    </h1>
    <h5 className="text-white max-w-[900px] ">
      I'm Arunabh, a Software Engineer specializing in React.js and Next.js. I
      build responsive, mobile-first interfaces and scalable, high-performance
      components, with a focus on optimizing user experiences and driving
      innovation.
    </h5>
  </div>
);

export default BannerTemplate;
