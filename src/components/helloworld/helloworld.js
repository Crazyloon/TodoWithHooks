import React, { useState } from 'react';

export default function HelloWorld () {
  const [greeting, setGreeting ] = useState('World');
  const [count, setCount] = useState(0);

  // styles
  const container = {
    padding: '50px'
  }

  return (
    <div style={container}>
      <p>Hello {greeting} version <button className='btn btn-primary' onClick={() => setCount(count + 1)}>1.{count}</button></p> 
      <input type='text' value={greeting} onChange={(e) => setGreeting(e.target.value)}></input>
    </div>
  ); 
};