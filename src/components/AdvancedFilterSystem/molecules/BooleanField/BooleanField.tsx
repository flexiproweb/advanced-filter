// src/components/AdvancedFilterSystem/molecules/BooleanField/BooleanField.tsx
import React from 'react';
import { FilterLabel } from '../../atoms/FilterLabel/FilterLabel';

export interface BooleanFieldProps {
  label: string;
  value: boolean | null;
  onChange: (value: boolean | null) => void;
  disabled?: boolean;
  required?: boolean;
  options?: Array<{ value: boolean | null; label: string }>;
  size?: 'sm' | 'md' | 'lg';
}

export const BooleanField: React.FC<BooleanFieldProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  options = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
    { value: null, label: 'Any' },
  ],
  size = 'md',
}) => {
  const fieldName = `boolean-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="space-y-1">
      <FilterLabel required={required} size={size}>
        {label}
      </FilterLabel>
      <div className="flex flex-wrap gap-4">
        {options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input
              type="radio"
              name={fieldName}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              disabled={disabled}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
