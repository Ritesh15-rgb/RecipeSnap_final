'use client';

import {Book, Heart, Home, Menu, Search, Settings, Upload, User} from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex justify-between items-center py-4">
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] sm:w-[350px] pt-12">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
          </SheetHeader>
          
          <nav className="mt-8">
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Home className="h-5 w-5" />
                  <span className="text-lg">Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/recipes" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Book className="h-5 w-5" />
                  <span className="text-lg">All Recipes</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/favorites" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span className="text-lg">Favorites</span>
                </Link>
              </li>

              <li>
              <Link href="/camera" 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors">
                <Upload className="h-6 w-6" />
                <span className="text-lg">Upload Photo</span>
              </Link>
              </li>
              
              <div className="border-t my-4"></div>
              
              <li>
                <Link 
                  href="/profile" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="text-lg">My Profile</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/settings" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span className="text-lg">Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
      
      
      <div className="flex items-center gap-2">
        
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Search className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;

