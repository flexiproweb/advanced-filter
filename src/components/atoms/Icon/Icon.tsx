'use client';

import { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 20,
  className = '',
  onClick,
}) => {
  return (
    <IconComponent
      size={size}
      className={`${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    />
  );
};

export default Icon;
