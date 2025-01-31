import Image from 'next/image';
import React from 'react';

const UnderConstruction = () => (
  <div className="w-full flex justify-center items-center h-full">
    <Image
      src="https://res.cloudinary.com/dku0lexry/image/upload/v1738347841/personal-website/other/951588_OE60SH0_aabdjw.jpg"
      alt="Under Construction"
      width={320}
      height={320}
      priority
    />
  </div>
);

export default UnderConstruction;
