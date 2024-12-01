import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface CounterProps {
  initialCount: number;
  onChange: (value: number) => void;
  minOrder: number; 
  maxOrder: number; 
}

const Counter = ({ initialCount, onChange, minOrder, maxOrder } : CounterProps) => {
  const isMinDisabled = initialCount === minOrder; 
  const isMaxDisabled = initialCount === maxOrder; 

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseInt(e.target.value, 10);
    if (!isNaN(numericValue)) {
      onChange(numericValue);
    } else if (e.target.value === "") {
      onChange(0); 
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 ">
        <Button
          onClick={() => onChange(Math.max(minOrder, initialCount - 1))} // Ensure count doesn't go below minOrder
          disabled={isMinDisabled} // Disable button if at minimum
          className={`p-3 ${isMinDisabled ? "text-gray-300" : "text-black"}`}
        >
          <FiMinus size={20}/>
        </Button>
        <div className="h-8 border-r border-gray-200"></div>
        <div className="w-10 flex self-center items-center justify-center">
          {/* <input
            type="number"
            value={5}
            onChange={handleInputChange}
            className="w-16 bg-transparent pl-[14px]"
            disabled
          /> */}
          {/* <Input type="number" className="bg-transparent border-transparent" /> */}
          {minOrder}
        </div>
        <div className="h-8 border-l border-gray-200"></div>
        <Button
          onClick={() => onChange(Math.min(maxOrder, initialCount + 1))} // Ensure count doesn't exceed maxOrder
          disabled={isMaxDisabled} // Disable button if at maximum
          className={`p-3 ${isMaxDisabled ? "text-gray-300" : "text-black"}`}
        >
          <FiPlus size={20}/>
        </Button>
      </div>
    </div>
  );
};

export default Counter;
