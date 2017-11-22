import { createActionCreator } from 'react-redux-typescript/jsnext/v2/create-action-creator';
import { Recipe } from '../models/Recipe';
import { StoreState } from '../reducers';
import { Dispatch } from 'redux';

export enum ActionTypeKeys {
	REQUEST_RECIPES = 'REQUEST_RECIPES',
	RECEIVE_RECIPES = 'RECEIVE_RECIPES'
}

export const actionCreators = {
	requestRecipes: createActionCreator(ActionTypeKeys.REQUEST_RECIPES),
	receiveRecipes: createActionCreator(ActionTypeKeys.RECEIVE_RECIPES, (state: Recipe[]) => {
		return state;
	})
};

type S<T> = { response: T };

type QRecipesResponse = S<{ recipes: Recipe[] }>;

export type Action = ({ type: ActionTypeKeys.REQUEST_RECIPES }) |
	({ type: ActionTypeKeys.RECEIVE_RECIPES, payload: Recipe[] } & QRecipesResponse);

export function fetchRecipes(): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(actionCreators.requestRecipes());
		// return zipkinFetch('http://localhost:8700/recipe')
		return fetch('http://localhost:8700/recipe')
			.then(response => response.json())
			.then(json => dispatch(actionCreators.receiveRecipes(json)));
	};
}