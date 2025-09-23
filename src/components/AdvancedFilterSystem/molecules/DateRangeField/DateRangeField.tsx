// src/components/AdvancedFilterSystem/molecules/DateRangeField/DateRangeField.tsx
import React from 'react';
import { FilterLabel } from '../../atoms/FilterLabel/FilterLabel';
import { FilterInput } from '../../atoms/FilterInput/FilterInput';
import { DateRange } from '../../types';

export interface DateRangeFieldProps {
  label: string;
  value: DateRange;
  onChange: (value: DateRange) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const DateRangeField: React.FC<DateRangeFieldProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  error,
  size = 'md',
}) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, start: e.target.value });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, end: e.target.value });
  };

  return (
    <div className="space-y-1">
      <FilterLabel required={required} size={size}>
        {label}
      </FilterLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <FilterInput
          type="date"
          value={value?.start || ''}
          onChange={handleStartDateChange}
          disabled={disabled}
          placeholder="Start date"
          size={size}
        />
        <FilterInput
          type="date"
          value={value?.end || ''}
          onChange={handleEndDateChange}
          disabled={disabled}
          placeholder="End date"
          size={size}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
