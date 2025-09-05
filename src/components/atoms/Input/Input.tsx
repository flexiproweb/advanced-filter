'use client';

import { InputProps } from '@/types';
import { cn } from '@/lib/utils';

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
  disabled = false,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={cn(
        'w-full px-3 py-2 border border-gray-300 rounded-md',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        'disabled:bg-gray-100 disabled:cursor-not-allowed',
        className
      )}
    />
  );
};

export default Input;
