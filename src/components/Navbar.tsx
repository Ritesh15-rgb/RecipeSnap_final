'use client';

import {Menu, Search} from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 mb-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">
          <Menu/>
        </div>
        <div className="text-xl font-bold">
        <Search/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

