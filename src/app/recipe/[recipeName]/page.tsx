'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import React from 'react';

const RecipeDetailPage = ({params}: { params: { recipeName: string } }) => {
  // Placeholder recipe data
  const recipe = {
    name: params.recipeName.replace(/%20/g, " "),
    ingredients: [
      '1 cup flour',
      '1/2 cup sugar',
      '1/4 cup butter',
      '1 egg',
      '1/2 tsp baking powder',
    ],
    instructions:
      '1. Preheat oven to 350°F.\n2. Mix dry ingredients together.\n3. Add wet ingredients and mix well.\n4. Bake for 20 minutes.',
    imageUrl: 'https://picsum.photos/400/200', // Dummy image URL
  };

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
          <Textarea value={recipe.instructions} readOnly className="min-h-[150px]" />
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeDetailPage;
