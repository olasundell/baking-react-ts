import { Recipe } from '../models/Recipe';
import * as React from 'react';
import { connect } from 'react-redux';

export interface RecipeComponentProps {
	recipes: Recipe[];
	isLoading: boolean;
}

interface RecipeComponentParams extends RecipeComponentProps {}

class RecipeComponent extends React.Component<RecipeComponentParams, object> {
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
			</div>
		);
	}
}

function mapStateToProps(state: any) {
	// console.log(JSON.stringify(state));
	return {
		recipes: state.recipes,
		isLoading: state.isLoading,
	};
}

export default connect(mapStateToProps)(RecipeComponent);
