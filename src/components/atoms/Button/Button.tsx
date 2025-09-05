// src/components/atoms/Button/Button.tsx
'use client';

import { ButtonProps } from '@/types';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-50',
    secondary: 'bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200 focus:ring-gray-500 disabled:opacity-50',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:opacity-50',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled ? 'cursor-not-allowed' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
