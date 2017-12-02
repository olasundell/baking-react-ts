import { Recipe } from '../models/Recipe';
import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../reducers';

export interface RecipeComponentProps {
	recipes: Recipe[];
	isLoading: boolean;
}

interface RecipeComponentParams extends RecipeComponentProps {}

class RecipeComponent extends React.Component<RecipeComponentParams, object> {
	constructor(props: RecipeComponentParams) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		const { isLoading, recipes } = this.props;

		if (isLoading) {
			return (<h2>Loading</h2>);
		}

		return (
			<div>Choose recipe:&nbsp;
				<select>
					{recipes.map((r) => <option key={r.id}>{r.name}</option>)}
				</select>
				<button type="button" onClick={this.handleSubmit}>Bake!</button>
			</div>
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
		recipes: state.recipes.recipes,
		isLoading: state.recipes.isLoading,
	};
}

export default connect(mapStateToProps)(RecipeComponent);
