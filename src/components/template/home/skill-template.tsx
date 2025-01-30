import React, { FC } from 'react';
import Image from 'next/image';
import { SkillDto } from '@/types/software-skill';
interface SkillProps {
  data: SkillDto[];
}
const SkillTemplate: FC<SkillProps> = ({ data }) => (
  <div className="overflow-hidden  h-[15vh] flex items-center ">
    <div className="animate-scroll gap-[50px] hidden md:flex">
      {data.map((item, index) => (
        <Image
          key={index}
          src={item.icon}
          alt={item.altText}
          width={50}
          height={50}
          priority
        />
      ))}
      {data.map((item, index) => (
        <Image
          key={index}
          src={item.icon}
          alt={item.altText}
          width={50}
          height={50}
          priority
        />
      ))}
    </div>
    <div className="flex animate-scroll gap-[50px] md:hidden">
      {data.map((item, index) => (
        <Image
          key={index}
          src={item.icon}
          alt={item.altText}
          width={40}
          height={40}
          priority
        />
      ))}
      {data.map((item, index) => (
        <Image
          key={index}
          src={item.icon}
          alt={item.altText}
          width={40}
          height={40}
          priority
        />
      ))}
    </div>
  </div>
);

export default SkillTemplate;
