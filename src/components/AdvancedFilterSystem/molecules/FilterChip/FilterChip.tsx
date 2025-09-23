// src/components/AdvancedFilterSystem/molecules/FilterChip/FilterChip.tsx
import React from 'react';

export interface FilterChipProps {
  label: string;
  value: string;
  onRemove: () => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  value,
  onRemove,
  className = '',
  size = 'md',
}) => {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <div className={`inline-flex items-center gap-1 bg-blue-100 text-blue-800 rounded-full ${sizes[size]} ${className}`}>
      <span className="font-medium">{label}:</span>
      <span className="max-w-32 truncate">{value}</span>
      <button
        onClick={onRemove}
        className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none hover:bg-blue-200 rounded-full w-4 h-4 flex items-center justify-center"
        aria-label="Remove filter"
      >
        ×
      </button>
    </div>
  );
};
