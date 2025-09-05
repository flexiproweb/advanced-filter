// src/app/page.tsx
'use client';

import { useState } from 'react';
import FilterChip from '@/components/molecules/FilterChip';
import CasesTable from '@/components/organisms/CasesTable';
import DraggableFilterModal from '@/components/organisms/DraggableFilterModal';
import Button from '@/components/atoms/Button';
import { FilterState, CaseData } from '@/types';

const initialFilters: FilterState = {
  caseNumber: '',
  caseType: '',
  reason: '',
  status: '',
  type: '',
  targetValue: '',
  appliedDate: '',
};

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
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Use current filters (real-time) instead of applied filters
  const currentActiveFiltersCount = Object.values(filters).filter(Boolean).length;

  const handleApplyFilters = () => {
    // Just close the modal, filters are already being updated in real-time
    setIsFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = { ...initialFilters };
    setFilters(clearedFilters);
  };

  const handleRemoveFilter = (field: keyof FilterState) => {
    const newFilters = { ...filters, [field]: '' };
    setFilters(newFilters);
  };

  const getActiveFilters = () => {
    const active: Array<{ key: string; value: string; field: keyof FilterState }> = [];
    
    // Use current filters instead of applied filters for real-time display
    Object.entries(filters).forEach(([field, value]) => {
      if (value && value !== '') {
        const displayNames: Record<keyof FilterState, string> = {
          caseNumber: 'Case Number',
          caseType: 'case Type', // lowercase 'c' to match image
          reason: 'Reason',
          status: 'status', // lowercase 's' to match image
          type: 'type', // lowercase 't' to match image
          targetValue: 'Target Value',
          appliedDate: 'Applied Date',
        };
        
        active.push({
          key: displayNames[field as keyof FilterState],
          value: value,
          field: field as keyof FilterState,
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
          {currentActiveFiltersCount > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">Active Filters:</span>
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
          <div className="flex justify-end mb-6">
            <Button onClick={() => setIsFilterModalOpen(true)}>
              Advanced Filters
            </Button>
          </div>

          {/* Data Table */}
          <CasesTable cases={mockCases} />
        </div>
      </div>

      {/* Draggable Filter Modal */}
      {isFilterModalOpen && (
        <DraggableFilterModal
          filters={filters}
          onFiltersChange={setFilters} // Real-time updates
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
          onClose={() => setIsFilterModalOpen(false)}
        />
      )}
    </div>
  );
}
