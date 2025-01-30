import { TestimonialDto } from '@/types/testimonial';
import Image from 'next/image';
import { FC, useState } from 'react';

export const TestimonialCard: FC<TestimonialDto> = ({
  image,
  name,
  company,
  quote,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedQuote =
    quote.length > 100 ? `${quote.slice(0, 100)}...` : quote;
  return (
    <div className="bg-primary-dark rounded-lg shadow-md w-[260px] h-fit min-h-[475px]">
      <Image
        src={image}
        alt={name}
        width={260}
        height={260}
        className="w-full object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h6 className="font-medium">{name}</h6>
        <p className="text-sm mb-1">{company}</p>
        <p className="italic text-justify">
          {isExpanded ? quote : truncatedQuote}
          <br />
          {quote.length > 100 && (
            <span
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-secondary-dark font-medium cursor-pointer"
            >
              {' '}
              {isExpanded ? 'Show less' : 'See more'}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
