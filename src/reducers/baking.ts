import { BakingResult } from '../models/BakingResult';
import { Action, ActionTypeKeys } from '../actions/actions';

export interface BakingReducer {
	baking: BakingResult;
}

const initial: BakingResult = {
	errors: [],
	recipe: '',
	success: false
};

export function bakingReducer(state: BakingResult = initial, action: Action): BakingResult {
	switch (action.type) {
		case ActionTypeKeys.BAKE_RECIPE_RESULT:
			return {
				...action.payload
			};
		default:
			return {
				...state
			};
	}
}
