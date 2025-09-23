// src/components/AdvancedFilterSystem/molecules/FilterField/FilterField.tsx
import React from 'react';
import { FilterLabel } from '../../atoms/FilterLabel/FilterLabel';
import { FilterInput } from '../../atoms/FilterInput/FilterInput';
import { FilterSelect } from '../../atoms/FilterSelect/FilterSelect';
import { FilterField as FilterFieldType } from '../../types';

export interface FilterFieldProps {
  field: FilterFieldType;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FilterField: React.FC<FilterFieldProps> = ({
  field,
  value,
  onChange,
  error,
  size = 'md',
}) => {
  const fieldId = `filter-${field.key}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = field.type === 'number' ? 
      (e.target.value === '' ? '' : Number(e.target.value)) : 
      e.target.value;
    onChange(newValue);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (field.type === 'multiselect') {
      const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
      onChange(selectedValues);
    } else {
      onChange(e.target.value);
    }
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'number':
      case 'date':
      case 'search':
        return (
          <FilterInput
            type={field.type === 'search' ? 'text' : field.type}
            value={value}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            disabled={field.disabled}
            error={error}
            min={field.min}
            max={field.max}
            step={field.step}
            size={size}
            icon={field.type === 'search' ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            ) : undefined}
          />
        );

      case 'select':
        return (
          <FilterSelect
            value={value}
            onChange={handleSelectChange}
            options={field.options || []}
            placeholder={field.placeholder}
            disabled={field.disabled}
            error={error}
            size={size}
          />
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            <div className="max-h-32 overflow-y-auto border rounded-lg p-2 bg-gray-50">
              {field.options?.map((option) => (
                <label key={String(option.value)} className="flex items-center space-x-2 py-1">
                  <input
                    type="checkbox"
                    checked={value?.includes(option.value) || false}
                    onChange={(e) => {
                      const currentValue = value || [];
                      const newValue = e.target.checked
                        ? [...currentValue, option.value]
                        : currentValue.filter((v: any) => v !== option.value);
                      onChange(newValue);
                    }}
                    disabled={option.disabled || field.disabled}
                    className="text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-1">
      <FilterLabel 
        htmlFor={fieldId} 
        required={field.required}
        size={size}
      >
        {field.label}
      </FilterLabel>
      {renderField()}
    </div>
  );
};
