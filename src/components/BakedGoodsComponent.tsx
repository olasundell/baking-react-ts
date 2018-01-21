import * as React from 'react';
import { BakedGoods } from '../models/BakedGoods';
import Table from 'reactstrap/lib/Table';
import { StoreState } from '../reducers';
import { connect } from 'react-redux';
import { StatusText } from './RecipeComponent';

export interface BakedGoodsComponentProps {
	isLoading: boolean;
	bakedGoods: BakedGoods[];
	error?: Error;
}

interface BakedGoodsComponentParams extends BakedGoodsComponentProps {
}

class BakedGoodsComponent extends React.Component<BakedGoodsComponentParams, object> {
	render() {
		const { isLoading, bakedGoods } = this.props;

		if (isLoading) {
			return <h2>Loading...</h2>;
		}

		if (!bakedGoods || bakedGoods.length === 0) {
			return <h2>{StatusText.EMPTY}</h2>;
		}

		return (
		<Table striped={true}>
			<thead>
			<tr>
				<th>Recipe</th>
				<th>Baked at</th>
			</tr>
			</thead>
			<tbody>
				{bakedGoods.map((goods, i) => this.row(goods, i))}
			</tbody>
		</Table>
		);
	}

	private row(goods: BakedGoods, i: number) {
		return (
			<tr key={i}>
				<td>{goods.recipe.name}</td>
				<td>{goods.bakedAt.toISOString()}</td>
			</tr>
		);
	}
}

function mapStateToProps(state: StoreState): BakedGoodsComponentProps {
	return {
		...state.bakedGoods
	};
}

export default connect(mapStateToProps)(BakedGoodsComponent);
