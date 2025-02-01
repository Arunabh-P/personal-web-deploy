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
}
const TextArea: FC<FieldProps> = ({
  name,
  onChange,
  value,
  required = false,
  rows = 2,
  label,
}) => (
  <div>
    <p className="font-normal mb-2 ">{label}</p>
    <textarea
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
    />
  </div>
);

export default TextArea;
