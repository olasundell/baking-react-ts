import { Recipe } from '../models/Recipe';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Action, ActionTypeKeys } from '../actions/actions';
import { RecipeComponentProps } from '../components/RecipeComponent';
import { createLogger } from 'redux-logger';

export interface StoreState {
	recipes: Recipe[];
	isLoading: boolean;
}

const initialState: StoreState = {
	recipes: [],
	isLoading: false,
};

function recipeReducer(state: StoreState = initialState, action: Action): RecipeComponentProps {
	switch (action.type) {
		case ActionTypeKeys.REQUEST_RECIPES:
			return Object.assign({}, state, {
				isLoading: true,
				recipes: [],
			});
		case ActionTypeKeys.RECEIVE_RECIPES:
			return Object.assign({}, state, {
				isLoading: false,
				recipes: action.payload
			});
		default:
			return state;
	}
}

export function configureStore() {
	return createStore<StoreState>(recipeReducer, applyMiddleware(thunk, createLogger()));
}