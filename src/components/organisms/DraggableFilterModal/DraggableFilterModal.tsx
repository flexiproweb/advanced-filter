// src/components/organisms/DraggableAdvancedFilterModal.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AdvancedFilter } from '@/components/AdvancedFilterSystem';
import { FilterField, FilterValues } from '@/components/AdvancedFilterSystem/types';
import Button from '@/components/atoms/Button';

interface DraggableAdvancedFilterModalProps {
  fields: FilterField[];
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  onClose: () => void;
}

const DraggableAdvancedFilterModal: React.FC<DraggableAdvancedFilterModalProps> = ({
  fields,
  values,
  onChange,
  onApplyFilters,
  onClearFilters,
  onClose,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Center the modal on first render
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2,
      });
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('drag-handle')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart.x, dragStart.y]);

  const activeFilterCount = Object.values(values).filter(value => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(v => v !== '' && v !== null);
    }
    return value !== '' && value !== null && value !== undefined;
  }).length;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className={`fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200 ${
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: '900px',
          maxWidth: '90vw',
          maxHeight: '80vh',
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Header */}
        <div className="drag-handle flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Advanced Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AdvancedFilter
            fields={fields}
            values={values}
            onChange={onChange}
            layout="grid"
            gridColumns={2}
            showActiveFilters={false} // We show them in the main page
            showApplyButton={false} // We have custom buttons
            showResetButton={false}
            realTimeFilter={true}
            className="border-0 shadow-none bg-transparent p-0"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClearFilters}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Clear All Filters
          </button>
          <div className="flex gap-3">
            <Button 
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={onApplyFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Apply Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DraggableAdvancedFilterModal;
