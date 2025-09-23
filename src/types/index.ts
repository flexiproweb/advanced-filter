// src/types/index.ts
export interface FilterState {
  caseNumber: string;
  caseType: string;
  reason: string;
  status: string;
  type: string;
  targetValue: string;
  appliedDate: string;
}

export interface CaseData {
  id: number;
  associatedCase: string;
  caseType: string;
  reason: string;
  status: string;
  targetValue: string;
  appliedDate: string;
}

// Import the advanced filter types
export * from '../components/AdvancedFilterSystem/types';


export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterChipData {
  key: string;
  value: string;
  onRemove?: () => void;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

// Updated InputProps with all valid HTML input types
export interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url' | 
         'date' | 'datetime-local' | 'month' | 'time' | 'week' | 'file' | 
         'checkbox' | 'radio' | 'range' | 'color' | 'hidden';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: FilterOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  disabled?: boolean;
}
