// src/app/page.tsx or src/components/organisms/HoldManagementSystem/HoldManagementSystem.tsx
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
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(initialFilters);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // Default closed

  const activeFiltersCount = Object.values(appliedFilters).filter(Boolean).length;

  const handleApplyFilters = (newFilters: FilterState) => {
    setAppliedFilters(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = { ...initialFilters };
    setFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
  };

  const handleRemoveFilter = (field: keyof FilterState) => {
    const newFilters = { ...appliedFilters, [field]: '' };
    setAppliedFilters(newFilters);
    setFilters(newFilters);
  };

  const getActiveFilters = () => {
    const active: Array<{ key: string; value: string; field: keyof FilterState }> = [];
    
    Object.entries(appliedFilters).forEach(([field, value]) => {
      if (value && value !== '') {
        const displayNames: Record<keyof FilterState, string> = {
          caseNumber: 'Case Number',
          caseType: 'Case Type',
          reason: 'Reason',
          status: 'Status',
          type: 'Type',
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
          
          {/* Filter Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Active Filters:</span>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.length === 0 ? (
                    <span className="text-gray-500">No filters applied</span>
                  ) : (
                    activeFilters.map((filter, index) => (
                      <FilterChip
                        key={`${filter.field}-${index}`}
                        label={filter.key}
                        value={filter.value}
                        onRemove={() => handleRemoveFilter(filter.field)}
                      />
                    ))
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {activeFilters.length > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <Button onClick={() => setIsFilterModalOpen(true)}>
                  Advanced Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <CasesTable cases={mockCases} />
        </div>
      </div>

      {/* Draggable Filter Modal */}
      {isFilterModalOpen && (
        <DraggableFilterModal
          filters={filters}
          onFiltersChange={setFilters}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
          onClose={() => setIsFilterModalOpen(false)}
        />
      )}
    </div>
  );
}
