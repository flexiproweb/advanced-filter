'use client';

import { useState } from 'react';
import ModalHeader from '@/components/molecules/ModalHeader';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { FilterState, FilterOption } from '@/types';

interface FilterModalProps {
  isOpen: boolean;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApply: (filters: FilterState) => void;
  onClose: () => void;
}

const filterOptions = {
  caseType: [
    { value: '', label: 'Choose...' },
    { value: 'demo_scheduled', label: 'Demo Scheduled Case' },
    { value: 'regular', label: 'Regular Case' },
  ] as FilterOption[],
  reason: [
    { value: '', label: 'Choose...' },
    { value: 'inventory', label: 'Inventory Issue' },
    { value: 'quality', label: 'Quality Check' },
  ] as FilterOption[],
  status: [
    { value: '', label: 'Choose...' },
    { value: 'completed', label: 'COMPLETED' },
    { value: 'pending', label: 'PENDING' },
    { value: 'in_progress', label: 'IN PROGRESS' },
  ] as FilterOption[],
  type: [
    { value: '', label: 'Choose...' },
    { value: 'inventory_hold', label: 'Inventory Hold' },
    { value: 'quality_hold', label: 'Quality Hold' },
  ] as FilterOption[],
};

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  filters,
  onFiltersChange,
  onApply,
  onClose,
}) => {
  // Fix: Use panelState and dragState from the hook
  const {
    panelState,
    dragState,
    handleDragStart,
  } = useDragAndDrop({
    x: 0, // Center the modal initially
    y: 0,
    width: 384, // w-96 = 24rem = 384px
    height: 600,
    isMinimized: false,
    isCollapsed: false,
  });

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleApply = () => {
    onApply(filters);
  };

  const handleClear = () => {
    const clearedFilters: FilterState = {
      caseNumber: '',
      caseType: '',
      reason: '',
      status: '',
      type: '',
      targetValue: '',
      appliedDate: '', // Don't forget this property
    };
    onFiltersChange(clearedFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-xl w-96 max-w-[90vw] max-h-[90vh] overflow-hidden"
        style={{
          // Fix: Use panelState.x and panelState.y instead of position.x and position.y
          transform: `translate(${panelState.x}px, ${panelState.y}px)`,
          cursor: dragState.isDragging ? 'grabbing' : 'default',
        }}
      >
        <ModalHeader
                  title="Advanced Filters"
                  filterCount={activeFiltersCount} // Fix: Use actual filter count
                  onClose={onClose}
                  onMouseDown={handleDragStart}
                  isDragging={dragState.isDragging} // Fix: Use dragState.isDragging
                  isMinimized={false} onToggleCollapse={function (): void {
                      throw new Error('Function not implemented.');
                  } } onToggleMinimize={function (): void {
                      throw new Error('Function not implemented.');
                  } } onReset={function (): void {
                      throw new Error('Function not implemented.');
                  } } onClear={function (): void {
                      throw new Error('Function not implemented.');
                  } }        />

        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          <FormField
            label="Case Number"
            placeholder="Enter case number"
            value={filters.caseNumber}
            onChange={(value) => updateFilter('caseNumber', value)}
          />

          <FormField
            label="Case Type"
            type="select"
            options={filterOptions.caseType}
            value={filters.caseType}
            onChange={(value) => updateFilter('caseType', value)}
          />

          <FormField
            label="Reason"
            type="select"
            options={filterOptions.reason}
            value={filters.reason}
            onChange={(value) => updateFilter('reason', value)}
          />

          <FormField
            label="Status"
            type="select"
            options={filterOptions.status}
            value={filters.status}
            onChange={(value) => updateFilter('status', value)}
          />

          <FormField
            label="Type"
            type="select"
            options={filterOptions.type}
            value={filters.type}
            onChange={(value) => updateFilter('type', value)}
          />

          <FormField
            label="Target Value"
            placeholder="Enter target value"
            value={filters.targetValue}
            onChange={(value) => updateFilter('targetValue', value)}
          />

          <FormField
            label="Applied Date"
            inputType="date"
            value={filters.appliedDate}
            onChange={(value) => updateFilter('appliedDate', value)}
          />
        </div>

        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <Button onClick={handleApply} className="flex-1">
            Apply Filters
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
