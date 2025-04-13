'use server';
/**
 * @fileOverview Generates detailed, step-by-step recipe instructions based on a recipe name and a specified language.
 *
 * - generateDetailedRecipe - A function that generates detailed recipe instructions in a given language.
 * - GenerateDetailedRecipeInput - The input type for the generateDetailedRecipe function.
 * - GenerateDetailedRecipeOutput - The return type for the generateDetailedRecipe function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateDetailedRecipeInputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe for which to generate instructions.'),
  ingredients: z.array(z.string()).describe('The ingredients of the recipe.'),
  language: z.string().describe('The language in which to generate the recipe instructions.').optional().default('English'),
});
export type GenerateDetailedRecipeInput = z.infer<typeof GenerateDetailedRecipeInputSchema>;

const GenerateDetailedRecipeOutputSchema = z.object({
  instructions: z.array(
    z.string().describe('A list of detailed, step-by-step instructions for the recipe.')
  ).describe('The detailed, step-by-step instructions for the recipe.'),
  description: z.string().describe('A detailed description of the recipe, including its origin and cultural significance.').optional(),
  tipsAndTricks: z.array(z.string()).describe('A list of tips and tricks for perfecting the recipe.').optional(),
});
export type GenerateDetailedRecipeOutput = z.infer<typeof GenerateDetailedRecipeOutputSchema>;

export async function generateDetailedRecipe(input: GenerateDetailedRecipeInput): Promise<GenerateDetailedRecipeOutput> {
  return generateDetailedRecipeFlow(input);
}

const formatInstructions = ai.defineTool({
  name: 'formatInstructions',
  description: 'Formats a list of instructions into a numbered, step-by-step format.',
  inputSchema: z.object({
    instructions: z.array(z.string()).describe('A list of instructions to format.'),
    language: z.string().describe('The language to format the instructions in.'),
  }),
  outputSchema: z.array(z.string()).describe('A list of formatted, numbered instructions.'),
}, async input => {
  // Simply number the instructions for formatting
  return input.instructions.map((instruction, index) => `${index + 1}. ${instruction}`);
});

const prompt = ai.definePrompt({
  name: 'generateDetailedRecipePrompt',
  input: {
    schema: z.object({
      recipeName: z.string().describe('The name of the recipe for which to generate instructions.'),
      ingredients: z.array(z.string()).describe('The ingredients of the recipe.'),
      language: z.string().describe('The language in which to generate the recipe instructions.').optional().default('English'),
    }),
  },
  output: {
    schema: z.object({
      instructions: z.array(
        z.string().describe('A list of detailed, step-by-step instructions for the recipe.')
      ).describe('The detailed, step-by-step instructions for the recipe.'),
      description: z.string().describe('A detailed description of the recipe, including its origin and cultural significance.').optional(),
      tipsAndTricks: z.array(z.string()).describe('A list of tips and tricks for perfecting the recipe.').optional(),
    }),
  },
  prompt: `You are an expert chef, skilled at providing clear, concise, and easy-to-follow recipe instructions.
Generate detailed, step-by-step instructions for the recipe "{{recipeName}}" in {{{language}}} language, using the ingredients: {{{ingredients}}}.  Also include a detailed description of the recipe, including its origin and cultural significance, and a list of tips and tricks for perfecting the recipe.`,
  tools: [formatInstructions],
});

const generateDetailedRecipeFlow = ai.defineFlow<
  typeof GenerateDetailedRecipeInputSchema,
  typeof GenerateDetailedRecipeOutputSchema
>(
  {
    name: 'generateDetailedRecipeFlow',
    inputSchema: GenerateDetailedRecipeInputSchema,
    outputSchema: GenerateDetailedRecipeOutputSchema,
  },
  async input => {
    const promptResult = await prompt(input);
    const formattedInstructions = await formatInstructions({instructions: promptResult.output!.instructions, language: input.language});
    return {instructions: formattedInstructions, description: promptResult.output!.description, tipsAndTricks: promptResult.output!.tipsAndTricks};
  }
);
