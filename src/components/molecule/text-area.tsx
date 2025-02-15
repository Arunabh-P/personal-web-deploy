import React, { FC } from 'react';

interface FieldProps {
  name: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label: string;
  required?: boolean;
  rows?: number;
  error?: string;
}
const TextArea: FC<FieldProps> = ({
  name,
  onChange,
  value,
  required = false,
  rows = 2,
  label,
  error,
}) => (
  <div className="flex flex-col items-start">
    <p className="font-normal mb-2 ">{label}</p>
    <textarea
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
    />
    <p className="mt-1 text-red-600">{error}</p>
  </div>
);

export default TextArea;
