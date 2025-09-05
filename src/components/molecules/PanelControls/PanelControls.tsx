// src/components/molecules/PanelControls/PanelControls.tsx
'use client';

import { GripHorizontal, Minimize2, Maximize2, RotateCcw, X } from 'lucide-react';
import Icon from '@/components/atoms/Icon';

interface PanelControlsProps {
  isMinimized: boolean;
  onToggleCollapse: () => void;
  onToggleMinimize: () => void;
  onReset: () => void; // Position reset
  onClear: () => void; // Filter reset
  onClose?: () => void;
}

const PanelControls: React.FC<PanelControlsProps> = ({
  isMinimized,
  onToggleCollapse,
  onToggleMinimize,
  onReset,
  onClear,
  onClose,
}) => {
  return (
    <div className="flex items-center gap-1 no-drag">
      <button
        onClick={onToggleCollapse}
        className="p-2 hover:bg-blue-600 rounded-lg transition-colors"
        title="Toggle content"
      >
        <Icon icon={GripHorizontal} size={16} />
      </button>
      <button
        onClick={onToggleMinimize}
        className="p-2 hover:bg-blue-600 rounded-lg transition-colors"
        title={isMinimized ? "Maximize" : "Minimize"}
      >
        <Icon icon={isMinimized ? Maximize2 : Minimize2} size={16} />
      </button>
      <button
        onClick={onReset}
        className="p-2 hover:bg-blue-600 rounded-lg transition-colors"
        title="Reset position to center"
      >
        <Icon icon={RotateCcw} size={16} />
      </button>
      <button
        onClick={onClear}
        className="p-2 hover:bg-blue-600 rounded-lg transition-colors"
        title="Clear all filters"
      >
        <Icon icon={X} size={16} />
      </button>
      {onClose && (
        <button
          onClick={onClose}
          className="p-2 hover:bg-red-600 rounded-lg transition-colors ml-1 border-l border-blue-500"
          title="Close filter panel"
        >
          <Icon icon={X} size={16} />
        </button>
      )}
    </div>
  );
};

export default PanelControls;
