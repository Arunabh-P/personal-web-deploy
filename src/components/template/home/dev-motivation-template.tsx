import SkillCard from '@/components/molecule/skill-card';
import { devSkillData } from '@/constants/home/dev-skill';
import { SkillDto } from '@/types/skill';
import { FC } from 'react';
interface DevSkillTemplateDto {
  data: SkillDto[];
}
const DevSkillTemplate: FC<DevSkillTemplateDto> = ({ data }) => (
  <div className="section-padding">
    <h2 className="text-start font-lora uppercase pb-4">
      {devSkillData.title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[30px]">
      {data.map((item) => (
        <SkillCard
          index={item.index}
          title={item.title}
          description={item.description}
          key={item.index}
        />
      ))}
    </div>
  </div>
);

export default DevSkillTemplate;
