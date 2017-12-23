import { Recipe } from '../models/Recipe';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { StoreState } from '../reducers';
import { SingleRecipeComponent } from './SingleRecipeComponent';
import { bindActionCreators } from 'redux';
import { bakeRecipe, bakeRecipe as bakeRecipeAction, BakeRecipeResult, RecipesError } from '../actions/recipeActions';
import Button from 'reactstrap/lib/Button';

export interface RecipeComponentProps {
	recipes: Recipe[];
	isLoading: boolean;
	hasError: boolean;
	error?: Error;
}

export interface RecipeComponentActions {
	bakeRecipe(recipe: Recipe): (dispatch: Dispatch<StoreState>) => Promise<BakeRecipeResult | RecipesError>;
}

interface RecipeComponentParams extends RecipeComponentProps, RecipeComponentActions {}

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
				{recipes.map((recipe) => <li key={recipe.id}>
					<Button onClick={(e) => this.props.bakeRecipe(recipe)}>Bake</Button>
					<SingleRecipeComponent bakeRecipe={bakeRecipe} recipe={recipe}/>
				</li>)}
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

function mapDispatchToProps(dispatch: Dispatch<StoreState>): RecipeComponentActions {
	return {
		bakeRecipe: bindActionCreators(bakeRecipeAction, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeComponent);
