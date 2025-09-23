// src/components/AdvancedFilterSystem/organisms/AdvancedFilter/AdvancedFilter.tsx
import React, { useState, useMemo } from 'react';
import { FilterButton } from '../../atoms/FilterButton/FilterButton';
import { FilterField as FilterFieldComponent } from '../../molecules/FilterField/FilterField';
import { FilterChip } from '../../molecules/FilterChip/FilterChip';
import { DateRangeField } from '../../molecules/DateRangeField/DateRangeField';
import { BooleanField } from '../../molecules/BooleanField/BooleanField';
import { AdvancedFilterProps, FilterField, FilterPreset } from '../../types';
import { FilterHelpers } from '../../utils/filterHelpers';

export const AdvancedFilter: React.FC<AdvancedFilterProps> = ({
  fields,
  values,
  onChange,
  onApply,
  onReset,
  onFieldChange,
  
  // Layout & Display
  layout = 'grid',
  gridColumns = 3,
  showActiveFilters = true,
  showApplyButton = true,
  showResetButton = true,
  showClearAllButton = false,
  
  // Behavior
  realTimeFilter = false,
  collapsible = false,
  defaultCollapsed = false,
  
  // Styling
  className = '',
  theme = 'light',
  size = 'md',
  
  // Advanced Features
  enableExport = false,
  enablePresets = false,
  presets = [],
  persistKey,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [showPresets, setShowPresets] = useState(false);

  const handleFieldChange = (key: string, value: any) => {
    const newValues = { ...values, [key]: value };
    onChange(newValues);
    onFieldChange?.(key, value, newValues);

    if (realTimeFilter) {
      onApply?.(newValues);
    }
  };

  const handleReset = () => {
    const resetValues = FilterHelpers.generateDefaultValues(fields);
    onChange(resetValues);
    onReset?.();
  };

  const handleApply = () => {
    onApply?.(values);
  };

  const handleClearAll = () => {
    const clearedValues = FilterHelpers.generateDefaultValues(fields);
    onChange(clearedValues);
  };

  const activeFilters = useMemo(() => {
    return Object.entries(values).filter(([key, value]) =>
      FilterHelpers.hasActiveFilter(key, value)
    );
  }, [values]);

  const getLayoutClasses = () => {
    const baseClass = 'gap-4';
    switch (layout) {
      case 'horizontal':
        return `flex flex-wrap items-end ${baseClass}`;
      case 'vertical':
        return `flex flex-col ${baseClass}`;
      case 'grid':
        return `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-${gridColumns} ${baseClass}`;
      case 'compact':
        return `grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2`;
      default:
        return `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ${baseClass}`;
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-800 border-gray-700 text-white';
      case 'minimal':
        return 'bg-transparent border-gray-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const renderField = (field: FilterField) => {
    // Check conditional visibility
    if (field.conditional && !field.conditional(values)) {
      return null;
    }

    const fieldValue = values[field.key];

    if (field.type === 'daterange') {
      return (
        <DateRangeField
          key={field.key}
          label={field.label}
          value={fieldValue || { start: '', end: '' }}
          onChange={(value) => handleFieldChange(field.key, value)}
          disabled={field.disabled}
          required={field.required}
          size={size}
        />
      );
    }

    if (field.type === 'boolean') {
      return (
        <BooleanField
          key={field.key}
          label={field.label}
          value={fieldValue}
          onChange={(value) => handleFieldChange(field.key, value)}
          disabled={field.disabled}
          required={field.required}
          size={size}
        />
      );
    }

    return (
      <FilterFieldComponent
        key={field.key}
        field={field}
        value={fieldValue}
        onChange={(value) => handleFieldChange(field.key, value)}
        size={size}
      />
    );
  };

  const renderActiveFilters = () => {
    if (!showActiveFilters || activeFilters.length === 0) return null;

    return (
      <div className="border-b pb-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">
            Active Filters ({activeFilters.length})
          </h4>
          {showClearAllButton && (
            <FilterButton
              variant="ghost"
              size="xs"
              onClick={handleClearAll}
            >
              Clear All
            </FilterButton>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {activeFilters.map(([key, value]) => {
            const field = fields.find(f => f.key === key);
            let displayValue: string;

            if (Array.isArray(value)) {
              displayValue = value.join(', ');
            } else if (typeof value === 'object' && value?.start && value?.end) {
              displayValue = `${value.start} - ${value.end}`;
            } else {
              displayValue = String(value);
            }

            return (
              <FilterChip
                key={key}
                label={field?.label || key}
                value={displayValue}
                onRemove={() => {
                  const defaultValue = FilterHelpers.getDefaultValue(field!);
                  handleFieldChange(key, defaultValue);
                }}
                size={size === 'lg' ? 'md' : 'sm'}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const renderActionButtons = () => {
    if (realTimeFilter && !enableExport && !enablePresets) return null;

    return (
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t">
        <div className="flex gap-2">
          {enablePresets && (
            <FilterButton
              variant="ghost"
              size={size}
              onClick={() => setShowPresets(!showPresets)}
            >
              Presets
            </FilterButton>
          )}
          {enableExport && (
            <FilterButton
              variant="ghost"
              size={size}
              onClick={() => {
                const exported = FilterHelpers.exportFilters(values);
                navigator.clipboard.writeText(exported);
                // You could show a toast here
              }}
            >
              Export
            </FilterButton>
          )}
        </div>

        <div className="flex gap-2">
          {showResetButton && (
            <FilterButton
              variant="secondary"
              size={size}
              onClick={handleReset}
            >
              Reset
            </FilterButton>
          )}
          {showApplyButton && !realTimeFilter && (
            <FilterButton
              variant="primary"
              size={size}
              onClick={handleApply}
            >
              Apply Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
            </FilterButton>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`advanced-filter border rounded-lg shadow-sm ${getThemeClasses()} ${className}`}>
      {/* Header */}
      {collapsible && (
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">
            Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </h3>
          <FilterButton
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
            )}
          </FilterButton>
        </div>
      )}

      {/* Content */}
      {(!collapsible || !isCollapsed) && (
        <div className="p-4">
          {renderActiveFilters()}

          {/* Preset Selection */}
          {enablePresets && showPresets && presets.length > 0 && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <h5 className="text-sm font-medium mb-2">Load Preset:</h5>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <FilterButton
                    key={preset.id}
                    variant="ghost"
                    size="xs"
                    onClick={() => onChange(preset.values)}
                  >
                    {preset.name}
                  </FilterButton>
                ))}
              </div>
            </div>
          )}

          {/* Filter Fields */}
          <div className={getLayoutClasses()}>
            {fields.map(renderField)}
          </div>

          {renderActionButtons()}
        </div>
      )}
    </div>
  );
};
