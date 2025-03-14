/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | string): string {
    if (!date) return 'N/A';
    
    const d = typeof date === 'string' ? new Date(date) : date;
    
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  /**
   * Format a date with time
   */
  export function formatDateTime(date: Date | string): string {
    if (!date) return 'N/A';
    
    const d = typeof date === 'string' ? new Date(date) : date;
    
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  /**
   * Capitalize the first letter of each word in a string
   */
  export function capitalizeWords(str: string): string {
    if (!str) return '';
    
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  /**
   * Format a snake_case or kebab-case string to a readable format
   */
  export function formatSnakeCase(str: string): string {
    if (!str) return '';
    
    return str
      .replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  /**
   * Format a number as a percentage
   */
  export function formatPercentage(value: number, decimalPlaces = 1): string {
    return `${value.toFixed(decimalPlaces)}%`;
  }
  
  /**
   * Format a number as currency (USD)
   */
  export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
  
  /**
   * Calculate the difference between two dates in days
   */
  export function daysBetween(date1: Date | string, date2: Date | string): number {
    const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
    const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
    
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }
  
  /**
   * Truncate a string to a maximum length and add ellipsis if needed
   */
  export function truncateString(str: string, maxLength: number): string {
    if (!str) return '';
    if (str.length <= maxLength) return str;
    
    return str.slice(0, maxLength) + '...';
  }
  
  /**
   * Calculate the percentage change between two values
   */
  export function percentageChange(oldValue: number, newValue: number): number {
    if (oldValue === 0) return newValue > 0 ? 100 : 0;
    
    return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
  }
  
  /**
   * Get a rating label based on a numerical value
   */
  export function getRatingLabel(rating: number): string {
    const labels: Record<number, string> = {
      1: 'Very Dissatisfied',
      2: 'Dissatisfied',
      3: 'Neutral',
      4: 'Satisfied',
      5: 'Very Satisfied'
    };
    
    return labels[rating] || 'Not Rated';
  }
  
  /**
   * Get a color based on a rating value
   */
  export function getRatingColor(rating: number): string {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    if (rating >= 1) return 'text-red-600';
    return 'text-gray-600';
  }
  
  /**
   * Generate a random ID (for demo purposes)
   */
  export function generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }
  
  /**
   * Check if a string is a valid email
   */
  export function isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }