'use client';

import {Menu, Search} from 'lucide-react';
import {useState} from 'react';
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4 mb-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Menu className="cursor-pointer" onClick={toggleMenu}/>
            </SheetTrigger>
            <SheetContent className="w-64">
              <div className="py-4">
                <h4 className="mb-4 font-semibold">Menu</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="hover:text-blue-500">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/recipes" className="hover:text-blue-500">
                      Recipes
                    </a>
                  </li>
                  <li>
                    <a href="/ingredients" className="hover:text-blue-500">
                      Ingredients
                    </a>
                  </li>
                  <li>
                    <a href="/settings" className="hover:text-blue-500">
                      Settings
                    </a>
                  </li>
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="text-xl font-bold">
          <Search/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
