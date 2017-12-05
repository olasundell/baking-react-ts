import { Action, ActionTypeKeys } from '../actions/actions';
import { RecipeComponentProps } from '../components/RecipeComponent';

export interface RecipeReducer {
	recipes: RecipeComponentProps;
}

const initialRecipeState: RecipeComponentProps = {
	recipes: [],
	isLoading: false
};

export function recipeReducer(state: RecipeComponentProps = initialRecipeState, action: Action): RecipeComponentProps {
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
