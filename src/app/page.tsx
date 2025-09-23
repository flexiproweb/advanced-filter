// src/app/page.tsx
'use client';

import { useState } from 'react';
import FilterChip from '@/components/molecules/FilterChip';
import CasesTable from '@/components/organisms/CasesTable';
import Button from '@/components/atoms/Button';
import { AdvancedFilter, useAdvancedFilter } from '@/components/AdvancedFilterSystem';
import { FilterField, FilterValues } from '@/components/AdvancedFilterSystem/types';
import { CaseData } from '@/types';
import DraggableAdvancedFilterModal from '@/components/organisms/DraggableFilterModal';

const mockCases: CaseData[] = [
  { 
    id: 1, 
    associatedCase: 'MCN_2025_0241-Scheduled Case', 
    caseType: 'Quality Deviations',
    reason: 'QA7',
    status: 'DRAFT',
    targetValue: 'Test, Tests', 
    appliedDate: '03/09/2025 15:11' 
  },
  { 
    id: 2, 
    associatedCase: 'MCN_2025_0242-Scheduled Case', 
    caseType: 'Quality Deviations',
    reason: 'QA7',
    status: 'DRAFT',
    targetValue: 'Test, Tests', 
    appliedDate: '03/09/2025 15:12' 
  },
  { 
    id: 3, 
    associatedCase: 'MCN_2025_0243-Scheduled Case', 
    caseType: 'Demo Scheduled Case',
    reason: 'BG_RS_SCH_002',
    status: 'ACTIVE',
    targetValue: 'Test, Tests', 
    appliedDate: '03/09/2025 15:13' 
  },
  { 
    id: 4, 
    associatedCase: 'MCN_2025_0244-Scheduled Case', 
    caseType: 'Production Issue',
    reason: 'QUALITY_CHECK',
    status: 'COMPLETED',
    targetValue: 'Test, Tests', 
    appliedDate: '03/09/2025 15:14' 
  },
  { 
    id: 5, 
    associatedCase: 'MCN_2025_0245-Scheduled Case', 
    caseType: 'Quality Deviations',
    reason: 'QA7',
    status: 'CANCELLED',
    targetValue: 'Test, Tests', 
    appliedDate: '03/09/2025 15:15' 
  },
];

export default function Home() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Define filter fields for the advanced filter
  const filterFields: FilterField[] = [
    {
      key: 'caseNumber',
      label: 'Case Number',
      type: 'search',
      placeholder: 'Search by case number...',
    },
    {
      key: 'caseType',
      label: 'Case Type',
      type: 'select',
      options: [
        { value: 'Quality Deviations', label: 'Quality Deviations' },
        { value: 'Demo Scheduled Case', label: 'Demo Scheduled Case' },
        { value: 'Production Issue', label: 'Production Issue' },
        { value: 'Maintenance', label: 'Maintenance' },
      ],
    },
    {
      key: 'reason',
      label: 'Reason',
      type: 'select',
      options: [
        { value: 'QA7', label: 'QA7' },
        { value: 'BG_RS_SCH_002', label: 'BG_RS_SCH_002' },
        { value: 'QUALITY_CHECK', label: 'QUALITY_CHECK' },
        { value: 'MAINTENANCE_REQUIRED', label: 'MAINTENANCE_REQUIRED' },
      ],
    },
    {
      key: 'status',
      label: 'Status',
      type: 'multiselect',
      options: [
        { value: 'DRAFT', label: 'Draft' },
        { value: 'ACTIVE', label: 'Active' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'CANCELLED', label: 'Cancelled' },
        { value: 'PENDING', label: 'Pending' },
      ],
    },
    {
      key: 'type',
      label: 'Type',
      type: 'select',
      options: [
        { value: 'urgent', label: 'Urgent' },
        { value: 'normal', label: 'Normal' },
        { value: 'low', label: 'Low Priority' },
      ],
    },
    {
      key: 'targetValue',
      label: 'Target Value',
      type: 'text',
      placeholder: 'Enter target value...',
    },
    {
      key: 'appliedDate',
      label: 'Applied Date Range',
      type: 'daterange',
    },
  ];

  // Use the advanced filter hook
  const {
    values: filterValues,
    setValues: setFilterValues,
    resetFilters,
    hasActiveFilters,
    activeFilterCount,
    getFilteredData,
  } = useAdvancedFilter(filterFields, {}, {
    persistKey: 'hold-management-filters',
  });

  // Custom filter logic for cases
  const filteredCases = getFilteredData(mockCases, (caseItem, filters) => {
    // Case Number search
    if (filters.caseNumber) {
      const searchTerm = filters.caseNumber.toLowerCase();
      if (!caseItem.associatedCase.toLowerCase().includes(searchTerm)) {
        return false;
      }
    }

    // Case Type filter
    if (filters.caseType && caseItem.caseType !== filters.caseType) {
      return false;
    }

    // Reason filter
    if (filters.reason && caseItem.reason !== filters.reason) {
      return false;
    }

    // Status multiselect filter
    if (filters.status?.length > 0 && !filters.status.includes(caseItem.status)) {
      return false;
    }

    // Target Value filter
    if (filters.targetValue) {
      const searchTerm = filters.targetValue.toLowerCase();
      if (!caseItem.targetValue.toLowerCase().includes(searchTerm)) {
        return false;
      }
    }

    // Date range filter
    if (filters.appliedDate?.start || filters.appliedDate?.end) {
      const caseDate = new Date(caseItem.appliedDate);
      if (filters.appliedDate.start && caseDate < new Date(filters.appliedDate.start)) {
        return false;
      }
      if (filters.appliedDate.end && caseDate > new Date(filters.appliedDate.end)) {
        return false;
      }
    }

    return true;
  });

  const handleApplyFilters = () => {
    setIsFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    resetFilters();
  };

  const handleRemoveFilter = (field: string) => {
    const fieldDef = filterFields.find(f => f.key === field);
    if (fieldDef) {
      const defaultValue = fieldDef.type === 'multiselect' ? [] : 
                          fieldDef.type === 'daterange' ? { start: '', end: '' } : '';
      setFilterValues({ ...filterValues, [field]: defaultValue });
    }
  };

  const getActiveFilters = () => {
    const active: Array<{ key: string; value: string; field: string }> = [];
    
    Object.entries(filterValues).forEach(([field, value]) => {
      if (value && value !== '' && (!Array.isArray(value) || value.length > 0)) {
        const fieldDef = filterFields.find(f => f.key === field);
        const displayNames: Record<string, string> = {
          caseNumber: 'Case Number',
          caseType: 'case Type',
          reason: 'Reason',
          status: 'status',
          type: 'type',
          targetValue: 'Target Value',
          appliedDate: 'Applied Date',
        };
        
        let displayValue: string;
        if (Array.isArray(value)) {
          displayValue = value.join(', ');
        } else if (typeof value === 'object' && value?.start && value?.end) {
          displayValue = `${value.start} - ${value.end}`;
        } else {
          displayValue = String(value);
        }
        
        active.push({
          key: displayNames[field] || fieldDef?.label || field,
          value: displayValue,
          field: field,
        });
      }
    });
    
    return active;
  };

  const activeFilters = getActiveFilters();

  return (
    <div className="w-full h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Hold Management System</h1>
          
          {/* Filter Section - Only show when there are active filters */}
          {hasActiveFilters && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">
                    Active Filters ({activeFilterCount}):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.map((filter, index) => (
                      <FilterChip
                        key={`${filter.field}-${index}`}
                        label={filter.key}
                        value={filter.value}
                        onRemove={() => handleRemoveFilter(filter.field)}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleClearFilters}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

          {/* Advanced Filters Button - Always visible */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredCases.length}</span> of{' '}
              <span className="font-medium">{mockCases.length}</span> cases
              {hasActiveFilters && (
                <span className="ml-2 text-blue-600">(filtered)</span>
              )}
            </div>
            <Button onClick={() => setIsFilterModalOpen(true)}>
              Advanced Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>
          </div>

          {/* Data Table */}
          <CasesTable cases={filteredCases} />
        </div>
      </div>

      {/* Advanced Filter Modal */}
      {isFilterModalOpen && (
        <DraggableAdvancedFilterModal
          fields={filterFields}
          values={filterValues}
          onChange={setFilterValues}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
          onClose={() => setIsFilterModalOpen(false)}
        />
      )}
    </div>
  );
}
