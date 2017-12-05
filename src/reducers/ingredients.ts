import { Action, ActionTypeKeys } from '../actions/actions';
import { IngredientListComponentProps } from '../components/IngredientListComponent';

export interface IngredientReducer {
	ingredients: IngredientListComponentProps;
}

const initialIngredientState: IngredientListComponentProps = {
	ingredients: [],
	isLoading: false
};

export function ingredientReducer(state: IngredientListComponentProps = initialIngredientState,
								action: Action): IngredientListComponentProps {
	switch (action.type) {
		case ActionTypeKeys.REQUEST_INGREDIENTS:
			return {
				...state,
				isLoading: true,
				ingredients: [],
			};
		case ActionTypeKeys.RECEIVE_INGREDIENTS:
			return {
				...state,
				isLoading: false,
				ingredients: action.payload
			};
		default:
			return state;
	}
}
