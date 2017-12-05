import { Recipe } from '../models/Recipe';
import { StoreState } from '../reducers';
import { Dispatch } from 'redux';
import { Ingredient } from '../models/Ingredient';

export enum ActionTypeKeys {
	REQUEST_RECIPES = 'REQUEST_RECIPES',
	RECIPES_ERROR = 'RECIPES_ERROR',
	RECEIVE_RECIPES = 'RECEIVE_RECIPES',
	ADD_RECIPE = 'ADD_RECIPE',

	REQUEST_INGREDIENTS = 'REQUEST_INGREDIENTS',
	INGREDIENTS_ERROR = 'INGREDIENTS_ERROR',
	RECEIVE_INGREDIENTS = 'RECEIVE_INGREDIENTS',
	ADD_INGREDIENT = 'ADD_INGREDIENT',

}

class RequestRecipes {
	readonly type = ActionTypeKeys.REQUEST_RECIPES;
}

class ReceiveRecipes {
	readonly type = ActionTypeKeys.RECEIVE_RECIPES;
	constructor(public payload: Recipe[]) {}
}

class RecipesError {
	readonly type = ActionTypeKeys.RECIPES_ERROR;
	constructor(public payload: string) {}
}

class RequestIngredients {
	readonly type = ActionTypeKeys.REQUEST_INGREDIENTS;
}

class ReceiveIngredients {
	readonly type = ActionTypeKeys.RECEIVE_INGREDIENTS;
	constructor(public payload: Ingredient[]) {}
}

class IngredientsError {
	readonly type = ActionTypeKeys.INGREDIENTS_ERROR;
	constructor(public payload: string) {}
}

export type Action = RequestRecipes | ReceiveRecipes | RecipesError |
	RequestIngredients | ReceiveIngredients | IngredientsError;

export function fetchRecipes(): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(new RequestRecipes());
		// return zipkinFetch('http://localhost:8700/recipe')
		return fetch('http://localhost:8450/recipe')
			.then(response => response.json())
			.then(json => dispatch(new ReceiveRecipes(json)))
			.catch((e: Error) => dispatch(new RecipesError(e.message)));
	};
}

export function fetchIngredients(): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(new RequestIngredients());
		// return zipkinFetch('http://localhost:8700/recipe')
		return fetch('http://localhost:8440/ingredients')
			.then((response) => response.json())
			.then((json) => dispatch(new ReceiveIngredients(json)))
			.catch((e: Error) => dispatch(new IngredientsError(e.message)));
	};
}

// const responseOrError = (response: Response, dispatch: Dispatch<StoreState>): Promise<{}> => {
// 	if (response.ok) {
// 		return response.json().then((json) => dispatch(new ReceiveIngredients(json)));
// 	} else {
// 		dispatch(new IngredientsError(response.statusText));
// 		return Promise.resolve({});
// 	}
// }
