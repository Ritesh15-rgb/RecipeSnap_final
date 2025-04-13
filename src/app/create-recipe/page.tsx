'use client';

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Camera, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { identifyIngredients } from '@/ai/flows/identify-ingredients';
import { generateRecipeSuggestions } from '@/ai/flows/generate-recipe-suggestions';
import { generateDetailedRecipe } from '@/ai/flows/generate-detailed-recipe';
import { Languages } from "@/components/LanguageFilter";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Recipe} from "@/components/RecipeCard";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState<Languages>("en");
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [generatedRecipesHeading, setGeneratedRecipesHeading] = useState("Generated Recipes:"); // Default English

    useEffect(() => {
        const getCameraPermission = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({video: true});
                setHasCameraPermission(true);

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
                setHasCameraPermission(false);
                toast({
                    variant: 'destructive',
                    title: 'Camera Access Denied',
                    description: 'Please enable camera permissions in your browser settings to use this app.',
                    duration: 1000,
                });
            }
        };

        getCameraPermission();
    }, []);

    useEffect(() => {
        const updateHeading = () => {
            switch (language) {
                case "mr":
                    setGeneratedRecipesHeading("व्युत्पन्न पाककृती:"); // Marathi
                    break;
                case "hi":
                    setGeneratedRecipesHeading("उत्पन्न व्यंजन:"); // Hindi
                    break;
                case "es":
                    setGeneratedRecipesHeading("Recetas generadas:"); // Spanish
                    break;
                case "fr":
                    setGeneratedRecipesHeading("Recettes générées:"); // French
                    break;
                case "de":
                    setGeneratedRecipesHeading("Generierte Rezepte:"); // German
                    break;
                case "ja":
                    setGeneratedRecipesHeading("生成されたレシピ:"); // Japanese
                    break;
                default:
                    setGeneratedRecipesHeading("Generated Recipes:"); // English
                    break;
            }
        };

        updateHeading();
    }, [language]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setImagePreview(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };
    const generateRecipes = async () => {
        if (!imagePreview) {
            toast({
                variant: 'destructive',
                title: 'No Image Selected',
                description: 'Please upload an image to generate recipes.',
            });
            return;
        }

        setIsLoading(true);
        try {
            const ingredientResult = await identifyIngredients({photoUrl: imagePreview});
            const identifiedIngredients = ingredientResult.ingredients;
            setIngredients(identifiedIngredients);

            // 2. Generate recipe suggestions
            const recipeResult = await generateRecipeSuggestions({ingredients: identifiedIngredients, language: language});
            const recipeSuggestions = recipeResult.recipes;

            // 3. Generate detailed instructions for each recipe
            const recipesWithInstructions = await Promise.all(recipeSuggestions.map(async recipe => {
                try {
                    const detailedRecipeResult = await generateDetailedRecipe({
                        recipeName: recipe.name,
                        ingredients: recipe.ingredients,
                        language: language,
                    });
                    return {
                        ...recipe,
                        instructions: detailedRecipeResult.instructions,
                        description: detailedRecipeResult.description,
                        tipsAndTricks: detailedRecipeResult.tipsAndTricks,
                    };
                } catch (error: any) {
                    console.error(`Error generating detailed recipe for ${recipe.name}:`, error);
                    toast({
                        variant: 'destructive',
                        title: 'Error Generating Detailed Recipe',
                        description: `Failed to generate detailed recipe for ${recipe.name}. Please try again.`,
                    });
                    return {
                        ...recipe,
                        instructions: [],
                        description: 'Failed to generate description.',
                        tipsAndTricks: [],
                    };
                }
            }));

            setRecipes(recipesWithInstructions.map(recipe => ({
                id: recipe.name, // Use recipe name as ID (assuming unique)
                title: recipe.name,
                description: recipe.description || 'No description available.',
                instructions: recipe.instructions,
                tipsAndTricks: recipe.tipsAndTricks,
                calories: 200, // Replace with actual data if available
                imageUrl: 'https://picsum.photos/400/200', // Dummy image
                category: 'Generated',
                canMake: recipe.canMake,
                href: `/recipe/${encodeURIComponent(recipe.name)}`, // Add href
            })));

            toast({
                title: 'Recipes Generated!',
                description: 'Check out the delicious recipes we found for you.',
            });
        } catch (error: any) {
            console.error('Error generating recipes:', error);
            toast({
                variant: 'destructive',
                title: 'Error Generating Recipes',
                description: error.message || 'Failed to generate recipes. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCamera = () => {
    // Trigger file input click
    fileInputRef.current?.click();
  };


  return (
    <div className="max-w-md mx-auto px-4 py-6 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">Create Recipe</h1>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-bold mb-4">Upload Food Photo</h2>
        
        <div className="mb-6">
          {imagePreview ? (
            <div className="relative">
              <img 
                src={imagePreview} 
                alt="Food preview" 
                className="w-full h-64 object-cover rounded-2xl"
              />
              <button 
                onClick={() => setImagePreview(null)}
                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center h-64 bg-gray-50"
            >
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-gray-500 mb-2">Upload a photo of your food</p>
              <p className="text-xs text-gray-400">JPG, PNG or HEIC</p>
            </div>
          )}
        </div>
        
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Upload
          </Button>
          
          <Button
            className="flex-1 flex items-center justify-center gap-2 bg-primary"
            onClick={handleCamera}
            disabled={uploading}
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
            Take Photo
          </Button>
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
      </div>
      
      <Button
        className="w-full bg-primary"
        disabled={!imagePreview || isLoading}
        onClick={generateRecipes}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Analyzing Image...
          </>
        ) : (
          'Generate Recipe'
        )}
      </Button>
        {ingredients.length > 0 && (
            <div className="mt-4">
                <h3 className="text-lg font-semibold">Identified Ingredients:</h3>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
        )}

        {recipes.length > 0 && (
            <div className="mt-4">
                <h3 className="text-lg font-semibold">{generatedRecipesHeading}</h3>
                <ul>
                    {recipes.map((recipe, index) => (
                        <li key={index}>
                            <Button variant="link" onClick={() => navigate(`/recipe/${encodeURIComponent(recipe.title)}`)}>{recipe.title}</Button>
                            <p>{recipe.description}</p>
                            {recipe.tipsAndTricks && recipe.tipsAndTricks.length > 0 && (
                                <>
                                    <h4>Tips and Tricks:</h4>
                                    <ul>
                                        {recipe.tipsAndTricks.map((tip, index) => (
                                            <li key={index}>{tip}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {recipe.instructions && recipe.instructions.length > 0 && (
                                <>
                                    <h4>Instructions:</h4>
                                    <ol>
                                        {recipe.instructions.map((instruction, index) => (
                                            <li key={index}>{instruction}</li>
                                        ))}
                                    </ol>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
  );
};

export default CreateRecipe;
