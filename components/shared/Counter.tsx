"use client"
import React, { useState } from 'react';

type CounterProps = {
    counter: number
}

const Counter = ({counter} : CounterProps) => {
  const [count, setCount] = useState<number>(counter);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
