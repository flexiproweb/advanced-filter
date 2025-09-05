'use client';

import FilterChip from '@/components/molecules/FilterChip';
import Button from '@/components/atoms/Button';
import { FilterState } from '@/types';

interface FilterSectionProps {
  appliedFilters: FilterState;
  onClearAll: () => void;
  onOpenModal: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  appliedFilters,
  onClearAll,
  onOpenModal,
}) => {
  // Function to get active filters with actual values from appliedFilters
  const getActiveFilters = () => {
    const active: Array<{ key: string; value: string; field: keyof FilterState }> = [];
    
    // Check each filter field and use actual values
    if (appliedFilters.caseNumber && appliedFilters.caseNumber !== '') {
      active.push({ 
        key: 'Case Number', 
        value: appliedFilters.caseNumber,
        field: 'caseNumber'
      });
    }
    if (appliedFilters.caseType && appliedFilters.caseType !== '') {
      active.push({ 
        key: 'Case Type', 
        value: appliedFilters.caseType,
        field: 'caseType'
      });
    }
    if (appliedFilters.reason && appliedFilters.reason !== '') {
      active.push({ 
        key: 'Reason', 
        value: appliedFilters.reason,
        field: 'reason'
      });
    }
    if (appliedFilters.status && appliedFilters.status !== '') {
      active.push({ 
        key: 'Status', 
        value: appliedFilters.status,
        field: 'status'
      });
    }
    if (appliedFilters.type && appliedFilters.type !== '') {
      active.push({ 
        key: 'Type', 
        value: appliedFilters.type,
        field: 'type'
      });
    }
    if (appliedFilters.targetValue && appliedFilters.targetValue !== '') {
      active.push({ 
        key: 'Target Value', 
        value: appliedFilters.targetValue,
        field: 'targetValue'
      });
    }
    if (appliedFilters.appliedDate && appliedFilters.appliedDate !== '') {
      active.push({ 
        key: 'Applied Date', 
        value: appliedFilters.appliedDate,
        field: 'appliedDate'
      });
    }
    
    return active;
  };

  const activeFilters = getActiveFilters();

  // Handler to remove individual filters
  const handleRemoveFilter = (field: keyof FilterState) => {
    // You'll need to pass this function from the parent component
    // For now, we'll use onClearAll as a placeholder
    console.log(`Remove filter: ${field}`);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">Active Filters:</span>
        {activeFilters.length === 0 ? (
          <span className="text-gray-500">No filters applied</span>
        ) : (
          <>
            {activeFilters.map((filter, index) => (
              <FilterChip
                key={index}
                label={filter.key}
                value={filter.value}
                onRemove={() => handleRemoveFilter(filter.field)}
              />
            ))}
            <button
              onClick={onClearAll}
              className="text-blue-600 hover:text-blue-800 text-sm underline ml-2 transition-colors"
            >
              Clear All
            </button>
          </>
        )}
      </div>
      <Button onClick={onOpenModal}>Advanced Filters</Button>
    </div>
  );
};

export default FilterSection;
