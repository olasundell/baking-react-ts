import { ActionTypeKeys } from './actions';
import { BakedGoods } from '../models/BakedGoods';
import { Dispatch } from 'react-redux';
import { StoreState } from '../reducers';

export type BakedGoodsActions = RequestBakedGoods | ReceiveBakedGoods | BakedGoodsError;

export class RequestBakedGoods {
	readonly type = ActionTypeKeys.REQUEST_BAKED_GOODS;
}

export class ReceiveBakedGoods {
	readonly type = ActionTypeKeys.RECEIVE_BAKED_GOODS;
	constructor(public payload: BakedGoods[]) {}
}

export class BakedGoodsError {
	readonly type = ActionTypeKeys.BAKED_GOODS_ERROR;
	constructor(public payload: Error) {}
}

function transform(json: any[]): BakedGoods[] {
	return json.map((j) => {
		const split = j.bakedAt.split('[');
		console.log(split);

		return {
			id: j.id,
			recipe: j.recipe,
			bakedAt: new Date(Date.parse(split[0]))
		};
	});
}

export function fetchBakedGoods(): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(new RequestBakedGoods());
		console.log('Fetching baked goods');

		return fetch('http://localhost:8410/store')
			.then((response) => response.json())
			.then((json) => transform(json))
			.then((json) => dispatch(new ReceiveBakedGoods(json)))
			.catch((e: Error) => dispatch(new BakedGoodsError(e)));
	};
}
