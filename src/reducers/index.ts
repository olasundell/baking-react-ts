import { applyMiddleware, combineReducers, createStore, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { Action, ActionTypeKeys } from '../actions/actions';
import { RecipeComponentProps } from '../components/RecipeComponent';
import { createLogger } from 'redux-logger';

export interface StoreState extends RecipeReducer {}

interface RecipeReducer {
	recipes: RecipeComponentProps;
}

const initialRecipeState: RecipeComponentProps = {
	recipes: [],
	isLoading: false
};

function recipeReducer(state: RecipeComponentProps = initialRecipeState, action: Action): RecipeComponentProps {
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
	recipes: recipeReducer
});

export function configureStore() {
	return createStore<StoreState>(rootReducer, applyMiddleware(thunk, actionToPlainObject, createLogger()));
}