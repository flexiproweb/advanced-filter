'use client';

interface ResizeHandleProps {
  direction: string;
  onMouseDown: (direction: string, e: React.MouseEvent) => void;
  className?: string;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ direction, onMouseDown, className = '' }) => {
  const getClassName = () => {
    const baseClass = 'absolute transition-opacity';
    const hoverClass = 'opacity-0 hover:opacity-100';
    
    switch (direction) {
      case 'nw':
        return `${baseClass} -top-1 -left-1 w-4 h-4 bg-blue-500 rounded-full cursor-nw-resize ${hoverClass} shadow-lg`;
      case 'ne':
        return `${baseClass} -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full cursor-ne-resize ${hoverClass} shadow-lg`;
      case 'sw':
        return `${baseClass} -bottom-1 -left-1 w-4 h-4 bg-blue-500 rounded-full cursor-sw-resize ${hoverClass} shadow-lg`;
      case 'se':
        return `${baseClass} -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full cursor-se-resize ${hoverClass} shadow-lg`;
      case 'n':
        return `${baseClass} -top-1 left-4 right-4 h-2 cursor-n-resize ${hoverClass} hover:bg-blue-400 rounded`;
      case 's':
        return `${baseClass} -bottom-1 left-4 right-4 h-2 cursor-s-resize ${hoverClass} hover:bg-blue-400 rounded`;
      case 'w':
        return `${baseClass} -left-1 top-4 bottom-4 w-2 cursor-w-resize ${hoverClass} hover:bg-blue-400 rounded`;
      case 'e':
        return `${baseClass} -right-1 top-4 bottom-4 w-2 cursor-e-resize ${hoverClass} hover:bg-blue-400 rounded`;
      default:
        return baseClass;
    }
  };

  return (
    <div
      className={`${getClassName()} ${className}`}
      onMouseDown={(e) => onMouseDown(direction, e)}
    />
  );
};

export default ResizeHandle;
