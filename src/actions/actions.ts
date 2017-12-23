import { RecipeActions } from './recipeActions';
import { IngredientsActions } from './ingredientsActions';

export enum ActionTypeKeys {
	BAKE_RECIPE_RESULT = 'BAKE_RECIPE_RESULT',
	BAKE_RECIPE_REQUEST = 'BAKE_RECIPE_REQUEST',
	REQUEST_RECIPES = 'REQUEST_RECIPES',
	RECIPES_ERROR = 'RECIPES_ERROR',
	RECEIVE_RECIPES = 'RECEIVE_RECIPES',
	ADD_RECIPE = 'ADD_RECIPE',

	REQUEST_INGREDIENTS = 'REQUEST_INGREDIENTS',
	INGREDIENTS_ERROR = 'INGREDIENTS_ERROR',
	RECEIVE_INGREDIENTS = 'RECEIVE_INGREDIENTS',
	ADD_INGREDIENT = 'ADD_INGREDIENT',

}
export type Action = IngredientsActions | RecipeActions;
// const responseOrError = (response: Response, dispatch: Dispatch<StoreState>): Promise<{}> => {
// 	if (response.ok) {
// 		return response.json().then((json) => dispatch(new ReceiveIngredients(json)));
// 	} else {
// 		dispatch(new IngredientsError(response.statusText));
// 		return Promise.resolve({});
// 	}
// }
