import { applyMiddleware, combineReducers, createStore, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { recipeReducer, RecipeReducer } from './recipes';
import { ingredientReducer, IngredientReducer } from './ingredients';

export interface StoreState extends RecipeReducer, IngredientReducer {}

// used to convert actions to plain objects, needed because we use classes as actions. Somehow.
const actionToPlainObject: Middleware = store => next => {
	return (action: any) => {
		if (action !== undefined && action !== null && typeof action === 'object') {
			return next({ ...action });
		}

		throw new Error(`action must be an object: ${JSON.stringify(action)}`);
	};
};

const rootReducer = combineReducers<StoreState>({
	recipes: recipeReducer,
	ingredients: ingredientReducer
});

export function configureStore() {
	return createStore<StoreState>(rootReducer, applyMiddleware(thunk, actionToPlainObject, createLogger()));
}