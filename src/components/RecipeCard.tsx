'use client';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  calories: number;
  imageUrl: string;
  category: string;
  canMake?: boolean; // Add optional canMake property
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({recipe}: RecipeCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img className="w-full h-48 object-cover" src={recipe.imageUrl} alt={recipe.title}/>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{recipe.title}</h3>
        <p className="text-gray-600 text-sm">{recipe.description}</p>
        <p className="text-gray-500 text-xs mt-2">Calories: {recipe.calories}</p>
        {recipe.canMake !== undefined && (
          <p className="text-green-500 text-xs mt-2">
            {recipe.canMake ? 'You can make this recipe!' : 'You might not have all ingredients.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
