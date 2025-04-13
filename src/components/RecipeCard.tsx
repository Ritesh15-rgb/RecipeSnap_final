'use client';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  calories: number;
  imageUrl: string;
  category: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img className="w-full h-48 object-cover" src={recipe.imageUrl} alt={recipe.title} />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{recipe.title}</h3>
        <p className="text-gray-600 text-sm">{recipe.description}</p>
        <p className="text-gray-500 text-xs mt-2">Calories: {recipe.calories}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
