'use client';

import { SelectProps } from '@/types';
import { cn } from '@/lib/utils';

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  className,
  disabled = false,
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={cn(
        'w-full px-3 py-2 border border-gray-300 rounded-md',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        'disabled:bg-gray-100 disabled:cursor-not-allowed',
        className
      )}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
