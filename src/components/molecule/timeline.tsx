import Image from 'next/image';
import React, { FC } from 'react';
interface Data {
  position: string;
  company: string;
  startYear: number;
  endYear: string | number;
  description: string;
  isWork: boolean;
}
interface TimelineProps {
  data: Data[];
}
const Timeline: FC<TimelineProps> = ({ data }) => (
  <ol className="relative border-s border-black ">
    {data.map((item, index) => (
      <li key={index} className="mb-5 ms-6">
        <span className="absolute flex items-center justify-center w-6 h-6 bg-white border-white rounded-full border-[.5px]  -start-3 ring-8 ring-white">
          <Image
            src={
              item.isWork
                ? 'https://res.cloudinary.com/dku0lexry/image/upload/v1737266719/personal-website/icons/job.png'
                : 'https://res.cloudinary.com/dku0lexry/image/upload/v1737267004/personal-website/icons/student.png'
            }
            alt={item.isWork ? 'job' : 'student'}
            width={40}
            height={40}
            priority
          />
        </span>
        <h6 className="font-medium flex items-center mb-1 ">{item.position}</h6>
        <p className="block  font-normal">{item.company}</p>
        <p className="block mb-2  font-normal">
          {item.startYear} - {item.endYear}
        </p>

        <p className="font-normal text-justify">{item.description}</p>
      </li>
    ))}
  </ol>
);

export default Timeline;
