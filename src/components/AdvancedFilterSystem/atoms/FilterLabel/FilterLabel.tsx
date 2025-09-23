// src/components/AdvancedFilterSystem/atoms/FilterLabel/FilterLabel.tsx
import React from 'react';

export interface FilterLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FilterLabel: React.FC<FilterLabelProps> = ({
  children,
  htmlFor,
  required = false,
  className = '',
  size = 'md',
}) => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <label
      htmlFor={htmlFor}
      className={`block font-medium text-gray-700 mb-1 ${sizes[size]} ${className}`}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};
