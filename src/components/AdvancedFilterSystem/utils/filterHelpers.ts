// src/components/AdvancedFilterSystem/utils/filterHelpers.ts
import { FilterValues, FilterField, FilterOption } from '../types';

export class FilterHelpers {
  static getDefaultValue(field: FilterField): any {
    switch (field.type) {
      case 'multiselect':
        return [];
      case 'daterange':
        return { start: '', end: '' };
      case 'boolean':
        return null;
      case 'number':
        return '';
      default:
        return '';
    }
  }

  static generateDefaultValues(fields: FilterField[]): FilterValues {
    const defaults: FilterValues = {};
    fields.forEach(field => {
      defaults[field.key] = this.getDefaultValue(field);
    });
    return defaults;
  }

  static hasActiveFilter(key: string, value: any): boolean {
    if (value === null || value === undefined || value === '') return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value.start !== undefined && value.end !== undefined) {
      return value.start !== '' || value.end !== '';
    }
    return true;
  }

  static countActiveFilters(values: FilterValues): number {
    return Object.entries(values).filter(([key, value]) => 
      this.hasActiveFilter(key, value)
    ).length;
  }

  static validateField(field: FilterField, value: any): string | null {
    if (field.required && !this.hasActiveFilter(field.key, value)) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      return field.validation(value);
    }

    if (field.type === 'number' && value !== '' && value !== null) {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return `${field.label} must be a number`;
      }
      if (field.min !== undefined && numValue < field.min) {
        return `${field.label} must be at least ${field.min}`;
      }
      if (field.max !== undefined && numValue > field.max) {
        return `${field.label} must be at most ${field.max}`;
      }
    }

    return null;
  }

  static applyDefaultFilter<T>(data: T[], values: FilterValues): T[] {
    return data.filter(item => {
      return Object.entries(values).every(([key, value]) => {
        if (!this.hasActiveFilter(key, value)) return true;

        const itemValue = (item as any)[key];

        // Handle null/undefined item values
        if (itemValue === null || itemValue === undefined) {
          return false;
        }

        // Array-based filters (multiselect)
        if (Array.isArray(value)) {
          if (Array.isArray(itemValue)) {
            return value.some(v => itemValue.includes(v));
          }
          return value.includes(itemValue);
        }

        // Date range filter
        if (typeof value === 'object' && value.start && value.end) {
          const itemDate = new Date(itemValue);
          const startDate = new Date(value.start);
          const endDate = new Date(value.end);
          return itemDate >= startDate && itemDate <= endDate;
        }

        // Text search (case-insensitive, partial match)
        if (typeof itemValue === 'string' && typeof value === 'string') {
          return itemValue.toLowerCase().includes(value.toLowerCase());
        }

        // Boolean filter
        if (typeof value === 'boolean') {
          return itemValue === value;
        }

        // Exact match for other types
        return itemValue === value;
      });
    });
  }

  static exportFilters(values: FilterValues): string {
    try {
      return btoa(JSON.stringify(values));
    } catch {
      return '';
    }
  }

  static importFilters(filterString: string): FilterValues {
    try {
      return JSON.parse(atob(filterString));
    } catch {
      return {};
    }
  }

  static saveToLocalStorage(key: string, values: FilterValues): void {
    try {
      localStorage.setItem(key, JSON.stringify(values));
    } catch {
      // Silently fail
    }
  }

  static loadFromLocalStorage(key: string): FilterValues | null {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
}
