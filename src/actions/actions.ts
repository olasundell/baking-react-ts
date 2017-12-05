import { Recipe } from '../models/Recipe';
import { StoreState } from '../reducers';
import { Dispatch } from 'redux';
import { Ingredient } from '../models/Ingredient';

export enum ActionTypeKeys {
	REQUEST_RECIPES = 'REQUEST_RECIPES',
	RECEIVE_RECIPES = 'RECEIVE_RECIPES',
	ADD_RECIPE = 'ADD_RECIPE',

	REQUEST_INGREDIENTS = 'REQUEST_INGREDIENTS',
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

class RequestIngredients {
	readonly type = ActionTypeKeys.REQUEST_INGREDIENTS;
}

class ReceiveIngredients {
	readonly type = ActionTypeKeys.RECEIVE_INGREDIENTS;
	constructor(public payload: Ingredient[]) {}
}

export type Action = RequestRecipes | ReceiveRecipes | RequestIngredients | ReceiveIngredients;

export function fetchRecipes(): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(new RequestRecipes());
		// return zipkinFetch('http://localhost:8700/recipe')
		return fetch('http://localhost:8450/recipe')
			.then(response => response.json())
			.then(json => dispatch(new ReceiveRecipes(json)));
	};
}

export function fetchIngredients(): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(new RequestIngredients());
		// return zipkinFetch('http://localhost:8700/recipe')
		return fetch('http://localhost:8440/ingredients')
			.then(response => response.json())
			.then(json => dispatch(new ReceiveIngredients(json)));
	};
}
