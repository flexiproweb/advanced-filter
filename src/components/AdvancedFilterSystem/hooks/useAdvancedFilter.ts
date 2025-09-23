// src/components/AdvancedFilterSystem/hooks/useAdvancedFilter.ts
import { useState, useCallback, useMemo, useEffect } from 'react';
import { FilterValues, FilterField, FilterHookReturn, FilterPreset } from '../types';
import { FilterHelpers } from '../utils/filterHelpers';

interface UseAdvancedFilterOptions {
  debounceMs?: number;
  persistKey?: string;
  onValidationChange?: (errors: Record<string, string>) => void;
}

export const useAdvancedFilter = (
  fields: FilterField[],
  initialValues?: FilterValues,
  options?: UseAdvancedFilterOptions
): FilterHookReturn => {
  const { debounceMs = 0, persistKey, onValidationChange } = options || {};

  // Generate default values
  const defaultValues = useMemo(() => {
    const generated = FilterHelpers.generateDefaultValues(fields);
    
    // Load from localStorage if persistKey is provided
    if (persistKey) {
      const stored = FilterHelpers.loadFromLocalStorage(persistKey);
      if (stored) {
        return { ...generated, ...stored, ...initialValues };
      }
    }
    
    return { ...generated, ...initialValues };
  }, [fields, initialValues, persistKey]);

  const [values, setValues] = useState<FilterValues>(defaultValues);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [presets, setPresets] = useState<FilterPreset[]>([]);

  // Persist to localStorage
  useEffect(() => {
    if (persistKey) {
      FilterHelpers.saveToLocalStorage(persistKey, values);
    }
  }, [values, persistKey]);

  // Validation
  useEffect(() => {
    const errors: Record<string, string> = {};
    fields.forEach(field => {
      const error = FilterHelpers.validateField(field, values[field.key]);
      if (error) {
        errors[field.key] = error;
      }
    });
    setValidationErrors(errors);
    onValidationChange?.(errors);
  }, [values, fields, onValidationChange]);

  const updateField = useCallback((key: string, value: any) => {
    setValues(prev => ({ ...prev, [key]: value }));
  }, []);

  const setValuesWrapper = useCallback((newValues: FilterValues) => {
    setValues(newValues);
  }, []);

  const resetFilters = useCallback(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  const clearField = useCallback((key: string) => {
    const field = fields.find(f => f.key === key);
    if (field) {
      updateField(key, FilterHelpers.getDefaultValue(field));
    }
  }, [fields, updateField]);

  const hasActiveFilters = useMemo(() => {
    return FilterHelpers.countActiveFilters(values) > 0;
  }, [values]);

  const activeFilterCount = useMemo(() => {
    return FilterHelpers.countActiveFilters(values);
  }, [values]);

  const getFilteredData = useCallback(<T,>(
    data: T[],
    customLogic?: (item: T, filters: FilterValues) => boolean
  ): T[] => {
    if (!hasActiveFilters) return data;

    if (customLogic) {
      return data.filter(item => customLogic(item, values));
    }

    return FilterHelpers.applyDefaultFilter(data, values);
  }, [values, hasActiveFilters]);

  const exportFilters = useCallback(() => {
    return FilterHelpers.exportFilters(values);
  }, [values]);

  const importFilters = useCallback((filterString: string) => {
    const imported = FilterHelpers.importFilters(filterString);
    setValues({ ...defaultValues, ...imported });
  }, [defaultValues]);

  const saveAsPreset = useCallback((name: string, description?: string): FilterPreset => {
    const preset: FilterPreset = {
      id: `preset_${Date.now()}`,
      name,
      values: { ...values },
      description,
    };
    setPresets(prev => [...prev, preset]);
    return preset;
  }, [values]);

  const loadPreset = useCallback((preset: FilterPreset) => {
    setValues(preset.values);
  }, []);

  return {
    values,
    setValues: setValuesWrapper,
    updateField,
    resetFilters,
    clearField,
    hasActiveFilters,
    activeFilterCount,
    getFilteredData,
    exportFilters,
    importFilters,
    saveAsPreset,
    loadPreset,
    validationErrors,
  };
};
