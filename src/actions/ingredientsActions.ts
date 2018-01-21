import { ActionTypeKeys } from './actions';
import { Ingredient } from '../models/Ingredient';
import { Dispatch } from 'react-redux';
import { StoreState } from '../reducers';
import { IngredientUpdateResult } from '../models/IngredientUpdateResult';

export type IngredientsActions = PutSaveIngredients | RequestIngredients | ReceiveIngredients | IngredientsError;

export class PutSaveIngredients {
	readonly type = ActionTypeKeys.PUT_SAVE_INGREDIENTS;
	constructor(public payload: Ingredient[]) {}
}

export class SaveIngredientsResult {
	readonly type = ActionTypeKeys.SAVE_INGREDIENTS_RESULT;
	constructor(public payload: IngredientUpdateResult) {}
}

export class RequestIngredients {
	readonly type = ActionTypeKeys.REQUEST_INGREDIENTS;
}

export class ReceiveIngredients {
	readonly type = ActionTypeKeys.RECEIVE_INGREDIENTS;
	constructor(public payload: Ingredient[]) {}
}

export class IngredientsError {
	readonly type = ActionTypeKeys.INGREDIENTS_ERROR;
	constructor(public payload: string) {}
}

export function fetchIngredients(): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(new RequestIngredients());

		return fetch('http://localhost:8440/ingredients')
			.then((response) => response.json())
			.then((json) => dispatch(new ReceiveIngredients(json)))
			.catch((e: Error) => dispatch(new IngredientsError(e.message)));
	};
}

export function saveIngredients(ingredients: Ingredient[]):
		(dispatch: Dispatch<StoreState>) => Promise<SaveIngredientsResult | IngredientsError> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(new PutSaveIngredients(ingredients));

		console.log(JSON.stringify(ingredients));

		return fetch('http://localhost:8440/ing2', {
			method: 'PUT',
			body: JSON.stringify(ingredients),
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((json) => dispatch(new SaveIngredientsResult(json)))
			.catch((e: Error) => dispatch(new IngredientsError(e.message)));
	};
}