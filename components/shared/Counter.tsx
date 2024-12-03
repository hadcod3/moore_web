'use client';

import React, { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { Button } from '../ui/button';

interface CounterProps {
  initialCount: number;
  onChange: (value: number) => void;
  minOrder: number;
  maxOrder: number;
}

const Counter = ({ initialCount, onChange, minOrder, maxOrder }: CounterProps) => {
  const [count, setCount] = useState(initialCount);

  const handleIncrement = () => {
    const newCount = Math.min(maxOrder, count + 1);
    setCount(newCount);
    onChange(newCount);
  };

  const handleDecrement = () => {
    const newCount = Math.max(minOrder, count - 1);
    setCount(newCount);
    onChange(newCount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseInt(e.target.value, 10);
    if (!isNaN(numericValue)) {
      const clampedValue = Math.max(minOrder, Math.min(maxOrder, numericValue));
      setCount(clampedValue);
      onChange(clampedValue);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
        <Button
          onClick={handleDecrement}
          disabled={count === minOrder}
          className={`p-3 ${count === minOrder ? 'text-gray-300' : 'text-black'}`}
        >
          <FiMinus size={20} />
        </Button>
        <div className="h-8 border-r border-gray-200"></div>
        <div className="w-20 flex self-center items-center justify-center">
          <input
            type="number"
            value={count}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
              }
            }}
            className="w-16 bg-transparent text-center outline-none border-none appearance-none"
          />
        </div>
        <div className="h-8 border-l border-gray-200"></div>
        <Button
          onClick={handleIncrement}
          disabled={count === maxOrder}
          className={`p-3 ${count === maxOrder ? 'text-gray-300' : 'text-black'}`}
        >
          <FiPlus size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Counter;
