// src/components/molecules/FormField/FormField.tsx
'use client';

import Label from '@/components/atoms/Label';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import { FilterOption } from '@/types';

interface FormFieldProps {
  label: string;
  type?: 'input' | 'select';
  inputType?: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url' | 
             'date' | 'datetime-local' | 'month' | 'time' | 'week' | 'file' | 
             'checkbox' | 'radio' | 'range' | 'color' | 'hidden';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: FilterOption[];
  required?: boolean;
  className?: string; // Add this
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'input',
  inputType = 'text',
  placeholder,
  value,
  onChange,
  options = [],
  required = false,
  className = '', // Add this
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={className}> {/* Apply className here */}
      <Label required={required}>{label}</Label>
      {type === 'input' ? (
        <Input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
        />
      ) : (
        <Select
          options={options}
          value={value}
          onChange={handleSelectChange}
        />
      )}
    </div>
  );
};

export default FormField;
