// src/components/AdvancedFilterSystem/atoms/FilterInput/FilterInput.tsx
import React from 'react';

export interface FilterInputProps {
  type?: 'text' | 'number' | 'date' | 'email' | 'search';
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
  icon?: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const FilterInput: React.FC<FilterInputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  className = '',
  error,
  icon,
  min,
  max,
  step,
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
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseStyles} ${sizes[size]} ${errorStyles} ${icon ? 'pl-10' : ''} ${className}`}
        min={min}
        max={max}
        step={step}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
