'use client';

import {useState, useEffect} from 'react';
import Navbar from '@/components/Navbar';
import CategoryFilter from '@/components/CategoryFilter';
import RecipeGrid from '@/components/RecipeGrid';
import PopularRecipes from '@/components/PopularRecipes';
import CameraButton from '@/components/CameraButton';
import {Recipe} from '@/components/RecipeCard';
import {useToast} from '@/hooks/use-toast';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Languages} from "@/components/LanguageFilter";
import {useRouter} from "next/navigation";
import {Search} from "lucide-react";

const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Chicken Fried Rice',
    description: 'So irresistibly delicious',
    calories: 250,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    category: 'Vegetable',
  },
  {
    id: '2',
    title: 'Pasta Bolognese',
    description: 'True Italian classic',
    calories: 200,
    imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8',
    category: 'Rice',
  },
  {
    id: '3',
    title: 'Garlic Potatoes',
    description: 'Crispy Garlic Roasted Potatoes',
    calories: 150,
    imageUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf',
    category: 'Vegetable',
  },
  {
    id: '4',
    title: 'Fruit Salad',
    description: 'Sweet and refreshing mix',
    calories: 120,
    imageUrl: 'https://images.unsplash.com/photo-1568158879083-c42860933ed7',
    category: 'Fruit',
  },
  {
    id: '5',
    title: 'Avocado Toast',
    description: 'Perfect breakfast option',
    calories: 180,
    imageUrl: 'https://images.unsplash.com/photo-1588137378633-dea1168d0ce6',
    category: 'Breakfast',
  },
  {
    id: '6',
    title: 'Grilled Salmon',
    description: 'Fresh and healthy seafood',
    calories: 220,
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
    category: 'Seafood',
  },
  {
    id: '7',
    title: 'Chocolate Cake',
    description: 'Rich and decadent dessert',
    calories: 350,
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
    category: 'Dessert',
  },
  {
    id: '8',
    title: 'Iced Coffee',
    description: 'Refreshing cold brew',
    calories: 90,
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
    category: 'Beverages',
  }
];

type Category = 'All' | 'Vegetable' | 'Rice' | 'Fruit' | 'Breakfast' | 'Seafood' | 'Fast Food' | 'Dessert' | 'Beverages';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const {toast} = useToast();
  const [language, setLanguage] = useState<Languages>("en");
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    // In a real app, we would fetch from an API
    setRecipes(mockRecipes);

    // Display welcome toast on initial load
    toast({
      title: "Welcome to Springy Salads!",
      description: "Discover healthy and delicious recipes",
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    // Mock API call for search
    const fetchSearchResults = async () => {
      if (searchTerm) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const results = mockRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const featuredRecipes = activeCategory === 'All'
    ? recipes
    : recipes.filter(r => r.category === activeCategory);

  const popularRecipes = recipes.filter(r => r.calories > 200);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="max-w-md mx-auto px-4 pb-20 bg-secondary min-h-screen">
      <Navbar onSearch={handleSearch}/>

      <div className="mb-4">
        <h1 className="text-4xl font-bold">Springy Salads</h1>
        <p className="text-gray-400">Healthy and nutritious food recipes</p>
      </div>

      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select language"/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Spanish</SelectItem>
          <SelectItem value="fr">French</SelectItem>
          <SelectItem value="de">German</SelectItem>
          <SelectItem value="ja">Japanese</SelectItem>
          <SelectItem value="hi">Hindi</SelectItem>
          <SelectItem value="mr">Marathi</SelectItem>
        </SelectContent>
      </Select>

      <CategoryFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {searchTerm && searchResults.length > 0 && (
        <RecipeGrid
          recipes={searchResults}
          category="Search Results"
          title={`Search Results for "${searchTerm}"`}
        />
      )}

      {searchTerm && searchResults.length === 0 && (
        <div className="mb-4">
          <p>No recipes found for "{searchTerm}".</p>
        </div>
      )}

      {!searchTerm && featuredRecipes.length > 0 && (
        <RecipeGrid
          recipes={featuredRecipes}
          category={activeCategory}
          title={`${activeCategory} Recipes`}
        />
      )}

      {!searchTerm && <PopularRecipes recipes={popularRecipes}/>}

      <CameraButton/>
    </div>
  );
};

export default Index;
