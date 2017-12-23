import { ActionTypeKeys } from './actions';
import { Ingredient } from '../models/Ingredient';
import { Dispatch } from 'react-redux';
import { StoreState } from '../reducers';

export type IngredientsActions = RequestIngredients | ReceiveIngredients | IngredientsError;

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
