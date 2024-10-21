import React from 'react';

const IntervalToggle = ({ selectedInterval, onIntervalChange, intervals }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
      <label htmlFor="interval" className="text-lg font-semibold text-gray-300">
        Select Interval:
      </label>
      <select
        id="interval"
        value={selectedInterval}
        onChange={(e) => onIntervalChange(e.target.value)}
        className="bg-gray-800 text-white p-2 rounded-md border border-gray-600 shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
      >
        {intervals.map((interval) => (
          <option key={interval} value={interval} className="bg-gray-700 text-white">
            {interval}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IntervalToggle;
