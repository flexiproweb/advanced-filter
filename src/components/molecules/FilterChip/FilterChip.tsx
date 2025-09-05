'use client';

import { X } from 'lucide-react';
import Icon from '@/components/atoms/Icon';

interface FilterChipProps {
  label: string;
  value: string;
  onRemove: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, value, onRemove }) => {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200">
      <span className="font-medium">{label.replace(/([A-Z])/g, ' $1').trim()}:</span>
      <span>{value}</span>
      <button
        onClick={onRemove}
        className="ml-1 hover:text-blue-900 p-0.5 rounded-full hover:bg-blue-200 transition-colors"
      >
        <Icon icon={X} size={12} />
      </button>
    </span>
  );
};

export default FilterChip;
