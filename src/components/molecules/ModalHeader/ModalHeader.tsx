// src/components/molecules/ModalHeader/ModalHeader.tsx
'use client';

import { Filter, Move } from 'lucide-react';
import Icon from '@/components/atoms/Icon';
import PanelControls from '@/components/molecules/PanelControls';

interface ModalHeaderProps {
  title: string;
  filterCount?: number;
  isMinimized: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onToggleCollapse: () => void;
  onToggleMinimize: () => void;
  onReset: () => void;
  onClear: () => void;
  onClose?: () => void; // Add this prop
  isDragging?: boolean;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  filterCount = 0,
  isMinimized,
  onMouseDown,
  onToggleCollapse,
  onToggleMinimize,
  onReset,
  onClear,
  onClose, // Add this
  isDragging = false,
}) => {
  return (
    <div
      className={`flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white select-none ${
        isMinimized ? 'rounded-xl' : 'rounded-t-xl'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Drag handle - only this icon should trigger dragging */}
        <div
          className="cursor-grab active:cursor-grabbing hover:bg-blue-600 p-1 rounded"
          onMouseDown={onMouseDown}
          title="Drag to move"
        >
          <Icon icon={Move} size={18} className="text-blue-200" />
        </div>
        <Icon icon={Filter} size={18} />
        <span className="font-semibold">{title}</span>
        {filterCount > 0 && (
          <span className="bg-blue-800 text-xs px-2 py-1 rounded-full font-medium">
            {filterCount}
          </span>
        )}
      </div>
      
      <PanelControls
        isMinimized={isMinimized}
        onToggleCollapse={onToggleCollapse}
        onToggleMinimize={onToggleMinimize}
        onReset={onReset}
        onClear={onClear}
        // onClose={onClose} // Pass the close function
      />
    </div>
  );
};

export default ModalHeader;
