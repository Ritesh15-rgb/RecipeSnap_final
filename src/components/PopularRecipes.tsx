'use client';

import { Recipe } from './RecipeCard';
import RecipeCard from './RecipeCard';

interface PopularRecipesProps {
  recipes: Recipe[];
}

const PopularRecipes = ({ recipes }: PopularRecipesProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Popular Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default PopularRecipes;
