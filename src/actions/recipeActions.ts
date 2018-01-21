import { ActionTypeKeys } from './actions';
import { Recipe } from '../models/Recipe';
import { Dispatch } from 'react-redux';
import { StoreState } from '../reducers';
import { BakingResult } from '../models/BakingResult';
import { fetchBakedGoods } from './bakedGoodsActions';

export type RecipeActions = RequestRecipes | ReceiveRecipes | RecipesError | BakeRecipeResult | BakeRecipeRequest;

export class RequestRecipes {
	readonly type = ActionTypeKeys.REQUEST_RECIPES;
}

export class ReceiveRecipes {
	readonly type = ActionTypeKeys.RECEIVE_RECIPES;
	constructor(public payload: Recipe[]) {}
}

export class RecipesError {
	readonly type = ActionTypeKeys.RECIPES_ERROR;
	constructor(public payload: Error) {}
}

export class BakeRecipeRequest {
	readonly type = ActionTypeKeys.BAKE_RECIPE_REQUEST;
	constructor(public payload: Recipe) {}
}

export class BakeRecipeResult {
	readonly type = ActionTypeKeys.BAKE_RECIPE_RESULT;
	constructor(public payload: BakingResult) {}
}

export function fetchRecipes(): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(new RequestRecipes());

		return fetch('http://localhost:8450/recipe')
			.then(response => response.json())
			.then(json => dispatch(new ReceiveRecipes(json)))
			.catch((e: Error) => dispatch(new RecipesError(e)));
	};
}

export function bakeRecipe(recipe: Recipe): (dispatch: Dispatch<StoreState>)
	=> Promise<BakeRecipeResult | RecipesError> {

	return async (dispatch: Dispatch<StoreState>) => {
		console.log(`Shakin and bakin ${recipe.name}`);

		dispatch(new BakeRecipeRequest(recipe));

		return fetch(`http://localhost:8460/bake/${recipe.name}`, {
			method: 'POST'
		})
			.then(response => response.json())
			.then(json => {
				dispatch(fetchBakedGoods());
				return dispatch(new BakeRecipeResult(json));
			})
			.catch((e: Error) => dispatch(new RecipesError(e)));
	};
}