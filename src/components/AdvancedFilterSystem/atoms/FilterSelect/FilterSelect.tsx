// src/components/AdvancedFilterSystem/atoms/FilterSelect/FilterSelect.tsx
import React from 'react';
import { FilterOption } from '../../types';

export interface FilterSelectProps {
  value?: string | string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: FilterOption[];
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  searchable?: boolean;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select option',
  multiple = false,
  disabled = false,
  className = '',
  error,
  size = 'md',
}) => {
  const baseStyles = 'w-full border rounded-lg focus:outline-none focus:ring-2 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed';
  
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  const errorStyles = error 
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

  return (
    <div>
      <select
        value={value}
        onChange={onChange}
        multiple={multiple}
        disabled={disabled}
        className={`${baseStyles} ${sizes[size]} ${errorStyles} ${multiple ? 'min-h-[100px]' : ''} ${className}`}
      >
        {!multiple && (
          <option value="" disabled={false}>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option 
            key={String(option.value)} 
            value={String(option.value)}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
