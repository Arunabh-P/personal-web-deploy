import React, { FC } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

interface FieldProps {
  value: string;
  onChange: (phone: string) => void;
  label: string;
  defaultCountry?: string;
  error?: string;
}

const PhoneInputField: FC<FieldProps> = ({
  onChange,
  value,
  label,
  error,
  defaultCountry = 'in',
}) => (
  <div className="w-full flex flex-col items-start">
    <p className="font-normal mb-2 ">{label}</p>
    <div className="w-full">
      <PhoneInput
        defaultCountry={defaultCountry}
        value={value}
        onChange={onChange}
        style={
          {
            '--react-international-phone-flag-width': '44px',
            '--react-international-phone-flag-height': '24px',
            '--react-international-phone-height': '50px',
            '--react-international-phone-border-color': '#b9b9b9',
            '--react-international-phone-border-radius': '4px',
            '--react-international-phone-font-size': '14px',
            '--react-international-phone-width': '100%',
          } as React.CSSProperties
        }
        inputStyle={{
          width: '100%',
          height: '50px',
          fontSize: '14px',
        }}
        className="w-full shadow"
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default PhoneInputField;
