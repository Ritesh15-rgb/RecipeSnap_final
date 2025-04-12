
'use client';

import {useState} from 'react';
import {identifyIngredients} from '@/ai/flows/identify-ingredients';
import {generateRecipeSuggestions} from '@/ai/flows/generate-recipe-suggestions';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {Info} from "lucide-react"
import {Badge} from "@/components/ui/badge";
import {Toaster} from "@/components/ui/toaster";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<
    {
      name: string;
      ingredients: string[];
      instructions: string;
      canMake: boolean;
    }[]
  >([]);
  const [loadingIngredients, setLoadingIngredients] = useState(false);
  const [loadingRecipes, setLoadingRecipes] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const identifyIngredientsFromImage = async () => {
    if (!image) return;

    setLoadingIngredients(true);
    try {
      const result = await identifyIngredients({photoUrl: image});
      setIngredients(result.ingredients);
    } catch (error) {
      console.error('Error identifying ingredients:', error);
    } finally {
      setLoadingIngredients(false);
    }
  };

  const generateRecipeSuggestionsFromIngredients = async () => {
    if (!ingredients.length) return;

    setLoadingRecipes(true);
    try {
      const result = await generateRecipeSuggestions({ingredients: ingredients});
      setRecipes(result.recipes);
    } catch (error) {
      console.error('Error generating recipe suggestions:', error);
    } finally {
      setLoadingRecipes(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-secondary">
        <Toaster />
      <h1 className="text-3xl font-bold mb-4 text-primary">RecipeSnap</h1>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl">
        {/* Image Upload Section */}
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Upload Ingredients Image</CardTitle>
            <CardDescription>Upload an image of your ingredients to get started.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
            {image && (
              <img src={image} alt="Uploaded ingredients" className="max-w-full h-auto rounded-md" />
            )}
            <Button onClick={identifyIngredientsFromImage} disabled={loadingIngredients} className="mt-4 bg-accent text-primary-foreground hover:bg-accent-foreground">
              {loadingIngredients ? 'Identifying Ingredients...' : 'Identify Ingredients'}
            </Button>
          </CardContent>
        </Card>

        {/* Identified Ingredients Section */}
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Identified Ingredients</CardTitle>
            <CardDescription>Here are the ingredients identified from the image.</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingIngredients && <p>Loading ingredients...</p>}
            {!loadingIngredients && ingredients.length === 0 && image && (
              <Alert variant="info">
                <Info className="h-4 w-4" />
                <AlertTitle>No ingredients identified!</AlertTitle>
                <AlertDescription>
                  Please try another image.
                </AlertDescription>
              </Alert>
            )}
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <Badge key={index}>{ingredient}</Badge>
              ))}
            </div>
            <Button onClick={generateRecipeSuggestionsFromIngredients} disabled={loadingRecipes || ingredients.length === 0} className="mt-4 bg-accent text-primary-foreground hover:bg-accent-foreground">
              {loadingRecipes ? 'Generating Recipes...' : 'Generate Recipe Suggestions'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recipe Suggestions Section */}
      {recipes.length > 0 && (
        <div className="w-full max-w-4xl mt-8">
          <h2 className="text-2xl font-bold mb-4 text-primary">Recipe Suggestions</h2>
          <div className="flex flex-col gap-4">
            {recipes.map((recipe, index) => (
              <Card key={index} className="bg-card text-card-foreground shadow-md">
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
                    {recipe.canMake ? null : <Badge variant="destructive">Missing Ingredients</Badge>}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea value={recipe.instructions} readOnly className="min-h-[100px]"/>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

    