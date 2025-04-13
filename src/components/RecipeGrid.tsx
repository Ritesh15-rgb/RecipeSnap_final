'use client';

import { Recipe } from './RecipeCard';
import RecipeCard from './RecipeCard';

interface RecipeGridProps {
  recipes: Recipe[];
  category: string;
  title: string;
}

const RecipeGrid = ({ recipes, category, title }: RecipeGridProps) => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;
