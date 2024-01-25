import React from 'react';
import { useMoralis } from 'react-moralis';

const Navbar = () => {

  const {enableWeb3} = useMoralis()

  return (
    <nav className="flex flex-row items-center justify-between p-6 bg-violet-700">
      <div className="text-left font-bold text-2xl text-white">
        <h1>Navbar Heading</h1>
      </div>
    
      <div className="text-right">
        <button className="bg-black text-violet-700 px-4 py-2 rounded">Button</button>
      </div>
    </nav>
  );
};

export default Navbar;
