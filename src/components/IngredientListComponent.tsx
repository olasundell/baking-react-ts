import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../reducers';
import { Ingredient } from '../models/Ingredient';
import Table from 'reactstrap/lib/Table';

export interface IngredientListComponentProps {
	isLoading: boolean;
	ingredients: Ingredient[];
	hasError: boolean;
	errorMessage: string;
}

export class IngredientListComponent extends React.Component<IngredientListComponentProps, object> {
	static row(ingredient: Ingredient, row: number): JSX.Element {
		return (
			<tr key={row}>
				<td>{ingredient.name}</td>
				<td>{ingredient.amount}</td>
				<td>{ingredient.unit}</td>
			</tr>
		);
	}

	constructor(props: IngredientListComponentProps) {
		super(props);
	}

	render() {
		const { hasError, errorMessage, isLoading, ingredients } = this.props;

		if (hasError) {
			return <h2>{errorMessage}</h2>;
		}

		if (isLoading) {
			return (<h2>Loading</h2>);
		}

		return (
			<Table striped={true}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Amount</th>
						<th>Unit</th>
					</tr>
				</thead>
				<tbody>
					{ingredients.map((ingredient, i) => IngredientListComponent.row(ingredient, i))}
				</tbody>
			</Table>
		);
	}

}

function mapStateToProps(state: StoreState): IngredientListComponentProps {
	// console.log(JSON.stringify(state));
	return {
		...state.ingredients
	};
}

export default connect(mapStateToProps)(IngredientListComponent);
