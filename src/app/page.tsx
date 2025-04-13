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
import {useSearchParams} from "next/navigation";
import {Utensils } from 'lucide-react';
import { Salad, Carrot, Apple, ChefHat } from 'lucide-react';

const recipesData = [
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
  },
];

type Category =
  | 'All'
  | 'Vegetable'
  | 'Rice'
  | 'Fruit'
  | 'Breakfast'
  | 'Seafood'
  | 'Fast Food'
  | 'Dessert'
  | 'Beverages';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const {toast} = useToast();

  useEffect(() => {
    // In a real app, we would fetch from an API
    setRecipes(recipesData);

    // Display welcome toast on initial load
    toast({
      title: 'Welcome to Springy Salads!',
      description: 'Discover healthy and delicious recipes',
      duration: 3000,
    });
  }, []);

  const featuredRecipes =
    activeCategory === 'All'
      ? recipes
      : recipes.filter(r => r.category === activeCategory);

  const popularRecipes = recipes.filter(r => r.calories > 200);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className="max-w-md mx-auto px-4 pb-20 bg-gray-50 min-h-screen">
      <Navbar />

      <div className="mb-4">
        <h1 className="text-4xl font-bold">Springy Salads</h1>
        <p className="text-gray-400">Healthy and nutritious food recipes</p>
      </div>

      <CategoryFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {featuredRecipes.length > 0 && (
        <RecipeGrid
          recipes={featuredRecipes}
          category={activeCategory}
          title={`${activeCategory} Recipes`}
        />
      )}

      <PopularRecipes recipes={popularRecipes} />

      <CameraButton />

    </div>
  );
};

export default Index;
