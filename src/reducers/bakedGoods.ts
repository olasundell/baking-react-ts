import { BakedGoodsComponentProps } from '../components/BakedGoodsComponent';
import { Action, ActionTypeKeys } from '../actions/actions';

export interface BakedGoodsReducer {
	bakedGoods: BakedGoodsComponentProps;
}

const initialBakedGoodsState: BakedGoodsComponentProps = {
	bakedGoods: [],
	isLoading: false,
	error: undefined
};

export function bakedGoodsReducer(state: BakedGoodsComponentProps = initialBakedGoodsState, action: Action):
					BakedGoodsComponentProps {
	switch (action.type) {
		case ActionTypeKeys.REQUEST_BAKED_GOODS:
			return {
				...state,
				isLoading: true
			};
		case ActionTypeKeys.RECEIVE_BAKED_GOODS:
			return {
				...state,
				isLoading: false,
				bakedGoods: action.payload
			};
		case ActionTypeKeys.BAKED_GOODS_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload
			};
		default:
			return state;
	}
}
