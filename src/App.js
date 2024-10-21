import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import ChartComponent from './Components/ChartComponent';
import SymbolToggle from './Components/CryptoToggle';
import IntervalToggle from './Components/IntervalToggle';

const symbols = ['ethusdt', 'bnbusdt', 'dotusdt'];
const intervals = ['1m', '3m', '5m'];

const App = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(() => {
    return localStorage.getItem('selectedSymbol') || 'ethusdt';
  });
  const [selectedInterval, setSelectedInterval] = useState(() => {
    return localStorage.getItem('selectedInterval') || '1m';
  });
  const [priceData, setPriceData] = useState(() => {
    // Load existing price data from local storage or initialize as empty
    const storedData = localStorage.getItem('priceData');
    return storedData ? JSON.parse(storedData) : {};
  });

  const { lastJsonMessage } = useWebSocket(
    `wss://stream.binance.com:9443/ws/${selectedSymbol}@kline_${selectedInterval}`,
    {
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.k) {
      const candlestick = lastJsonMessage.k;
      setPriceData((prevData) => {
        const newData = {
          ...prevData,
          [selectedSymbol]: [
            ...(prevData[selectedSymbol] || []),
            {
              x: new Date(candlestick.t),
              o: parseFloat(candlestick.o),
              h: parseFloat(candlestick.h),
              l: parseFloat(candlestick.l),
              c: parseFloat(candlestick.c),
            },
          ],
        };
        // Save updated price data to local storage
        localStorage.setItem('priceData', JSON.stringify(newData));
        return newData;
      });
    }
  }, [lastJsonMessage, selectedSymbol]);

  const handleSymbolChange = (symbol) => {
    setSelectedSymbol(symbol);
    localStorage.setItem('selectedSymbol', symbol); // Save to local storage
  };

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
    localStorage.setItem('selectedInterval', interval); // Save to local storage
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto bg-gray-900 shadow-xl rounded-lg overflow-hidden p-8">
        {/* Logo and Title */}
        <div className="flex items-center justify-center mb-6">
          <img 
            src="/Images/Logo.jpg" 
            alt="Logo" 
            className="w-12 h-12 mr-4 rounded-full border border-gray-700 shadow-sm"
          />
          <h1 className="text-4xl font-extrabold tracking-wider text-gray-100">
            Binance Market Data
          </h1>
        </div>

        {/* Symbol and Interval Toggles */}
        <div className="flex justify-center items-center space-x-6 mb-8">
          <SymbolToggle
            selectedSymbol={selectedSymbol}
            onSymbolChange={handleSymbolChange}
            symbols={symbols}
          />
          <IntervalToggle
            selectedInterval={selectedInterval}
            onIntervalChange={handleIntervalChange}
            intervals={intervals}
          />
        </div>

        {/* Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-inner">
          <ChartComponent
            priceData={priceData[selectedSymbol] || []}
            selectedSymbol={selectedSymbol}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
