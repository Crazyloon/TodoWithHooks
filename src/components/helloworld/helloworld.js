import React, { useState } from 'react';

export default function HelloWorld () {
  const [greeting, setGreeting ] = useState('World');
  const [count, setCount] = useState(0);

  return (
    <div className='text-center flex flex-column'>
      <p className='font-weight-bold'>
        Hello {greeting}, version <button className='btn btn-primary' onClick={() => setCount(count + 1)}> 1.{count} </button>
      </p> 
      <input className='form-control m-auto w-50' type='text' value={greeting} onChange={(e) => setGreeting(e.target.value)}></input>
    </div>
  ); 
};