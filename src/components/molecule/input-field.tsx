import React, { FC } from 'react';

interface FieldProps {
  type?: string;
  name: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
}
const InputField: FC<FieldProps> = ({
  name,
  type = 'text',
  onChange,
  value,
  required = false,
  label,
  error,
  className,
}) => (
  <div className="flex flex-col items-start">
    <p className="font-normal mb-2 ">{label}</p>
    <input
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
    <p className="mt-2 text-red-600">{error}</p>
  </div>
);

export default InputField;
