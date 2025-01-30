import { SkillDto } from '@/types/skill';
import { FC } from 'react';

const SkillCard: FC<SkillDto> = ({ index, title, description }) => (
  <div className="">
    <h2 className="text-[34px] md:text-[38px] lg:text-[44px] xltext-[54px] font-bold">
      {index}
    </h2>
    <h6 className="font-bold uppercase mt-1">{title}</h6>
    <p className="mt-2 text-justify">{description}</p>
  </div>
);

export default SkillCard;
