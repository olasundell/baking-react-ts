import { RecipeIngredient } from './RecipeIngredient';

export interface Recipe {
	ingredients: { [name: string]: RecipeIngredient };
	name: string;
	id: number;
}