'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import React from 'react';

const RecipeDetailPage = ({params}: { params: { recipeName: string } }) => {
  // Placeholder recipe data
  // Use React.use() to unwrap the params object
  const recipeName = params.recipeName.replace(/%20/g, " ");
  const recipe = {
    name: recipeName,
    ingredients: [
      '1 cup flour',
      '1/2 cup sugar',
      '1/4 cup butter',
      '1 egg',
      '1/2 tsp baking powder',
    ],
    instructions: [
      '1. Preheat oven to 350°F.',
      '2. Mix dry ingredients together.',
      '3. Add wet ingredients and mix well.',
      '4. Bake for 20 minutes.',
    ],
    imageUrl: 'https://picsum.photos/400/200', // Dummy image URL
  };

  // Error handling if recipe doesn't exist
  if (!recipe) {
    return (
      <div className="flex flex-col items-center min-h-screen p-4 bg-secondary">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Recipe not found.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-secondary">
      <Card className="w-full max-w-2xl bg-card text-card-foreground shadow-md">
        <CardHeader>
          <CardTitle>{recipe.name}</CardTitle>
          <CardDescription>
            Ingredients:{' '}
            {recipe.ingredients.map((ingredient, i) => (
              <span key={i}>
                {ingredient}
                {i < recipe.ingredients.length - 1 ? ', ' : ''}
              </span>
            ))}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-auto rounded-md"
          />
          {recipe.instructions && recipe.instructions.length > 0 ? (
            recipe.instructions.map((instruction, index) => (
              <Textarea key={index} value={instruction} readOnly className="min-h-[50px]" />
            ))
          ) : (
            <Textarea value="No instructions available." readOnly className="min-h-[150px]" />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeDetailPage;
    
