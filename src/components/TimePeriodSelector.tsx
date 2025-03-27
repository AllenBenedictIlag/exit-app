import React, { useState, useEffect } from 'react';
import { getDataForPeriod } from '../utils/dataGenerator';

interface TimePeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({ 
  selectedPeriod, 
  onPeriodChange 
}) => {
  const timePeriods = ['T123', 'T124', 'T125', 'T126', 'T127', 'T128'];
  
  return (
    <div className="time-period-selector">
      <select 
        value={selectedPeriod} 
        onChange={(e) => onPeriodChange(e.target.value)}
        className="form-select"
        style={{ 
          padding: '8px 12px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '120px'
        }}
      >
        {timePeriods.map((period) => (
          <option key={period} value={period}>
            {period}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimePeriodSelector; 