import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../reducers';
import { Ingredient } from '../models/Ingredient';

export interface IngredientListComponentProps {
	isLoading: boolean;
	ingredients: Ingredient[];
}

class IngredientListComponent extends React.Component<IngredientListComponentProps, object> {
	render() {
		const { isLoading, ingredients } = this.props;

		if (isLoading) {
			return (<h2>Loading</h2>);
		}
		return <ul className="list-group">
			{ingredients.map((ing, i) => <li key={i}>{ing.name} {ing.amount} {ing.unit}</li>)}
		</ul>;
	}
}

function mapStateToProps(state: StoreState): IngredientListComponentProps {
	// console.log(JSON.stringify(state));
	return {
		ingredients: state.ingredients.ingredients,
		isLoading: state.ingredients.isLoading,
	};
}

export default connect(mapStateToProps)(IngredientListComponent);
