import { Recipe } from '../models/Recipe';
import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../reducers';
import { SingleRecipeComponent } from './SingleRecipeComponent';

export interface RecipeComponentProps {
	recipes: Recipe[];
	isLoading: boolean;
	hasError: boolean;
	error?: Error;
}

interface RecipeComponentParams extends RecipeComponentProps {}

class RecipeComponent extends React.Component<RecipeComponentParams, object> {
	constructor(props: RecipeComponentParams) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		const { hasError, error, isLoading, recipes } = this.props;

		if (hasError && error) {
			return <h2>Error: {error.message}</h2>;
		}

		if (isLoading) {
			return (<h2>Loading</h2>);
		}

		if (recipes.length === 0) {
			return <h2>Empty</h2>;
		}

		return (
			<ul className="list-group">
				{recipes.map((recipe) => <li key={recipe.id}><SingleRecipeComponent recipe={recipe}/></li>)}
			</ul>
		);
	}

	handleSubmit(event: any) {
		// alert('Event!');
		console.log(JSON.stringify(event));
	}
}

function mapStateToProps(state: StoreState): RecipeComponentProps {
	// console.log(JSON.stringify(state));
	return {
		...state.recipes
	};
}

export default connect(mapStateToProps)(RecipeComponent);
