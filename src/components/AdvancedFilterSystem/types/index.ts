// src/components/AdvancedFilterSystem/types/index.ts
export interface FilterOption {
  value: string | number | boolean;
  label: string;
  disabled?: boolean;
}

export interface FilterField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'date' | 'daterange' | 'boolean' | 'search';
  options?: FilterOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  validation?: (value: any) => string | null;
  dependencies?: string[];
  conditional?: (values: FilterValues) => boolean;
  min?: number;
  max?: number;
  step?: number;
  searchable?: boolean; // For select fields
  clearable?: boolean;
}

export interface FilterValues {
  [key: string]: any;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface AdvancedFilterProps {
  fields: FilterField[];
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  onApply?: (values: FilterValues) => void;
  onReset?: () => void;
  onFieldChange?: (key: string, value: any, allValues: FilterValues) => void;
  
  // Layout & Display Options
  layout?: 'horizontal' | 'vertical' | 'grid' | 'compact';
  gridColumns?: number;
  showActiveFilters?: boolean;
  showApplyButton?: boolean;
  showResetButton?: boolean;
  showClearAllButton?: boolean;
  
  // Behavior Options
  realTimeFilter?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  
  // Styling Options
  className?: string;
  theme?: 'light' | 'dark' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  
  // Advanced Features
  enableExport?: boolean;
  enablePresets?: boolean;
  presets?: FilterPreset[];
  persistKey?: string; // localStorage key
}

export interface FilterPreset {
  id: string;
  name: string;
  values: FilterValues;
  description?: string;
}

export interface FilterHookReturn {
  values: FilterValues;
  setValues: (values: FilterValues) => void;
  updateField: (key: string, value: any) => void;
  resetFilters: () => void;
  clearField: (key: string) => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
  getFilteredData: <T>(data: T[], customLogic?: (item: T, filters: FilterValues) => boolean) => T[];
  exportFilters: () => string;
  importFilters: (filterString: string) => void;
  saveAsPreset: (name: string, description?: string) => FilterPreset;
  loadPreset: (preset: FilterPreset) => void;
  validationErrors: Record<string, string>;
}
