import React from 'react';

const CryptoToggle = ({ selectedSymbol, onSymbolChange, symbols }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
      <label htmlFor="symbol" className="text-lg font-semibold text-gray-300">
        Select Coin:
      </label>
      <select
        id="symbol"
        value={selectedSymbol}
        onChange={(e) => onSymbolChange(e.target.value)}
        className="bg-gray-800 text-white p-2 rounded-md border border-gray-600 shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
      >
        {symbols.map((symbol) => (
          <option key={symbol} value={symbol} className="bg-gray-700 text-white">
            {symbol.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CryptoToggle;
