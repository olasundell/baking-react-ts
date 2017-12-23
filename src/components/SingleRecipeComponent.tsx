import * as React from 'react';
import { Recipe } from '../models/Recipe';
import { IngredientListComponent, IngredientListComponentProps } from './IngredientListComponent';
import { Ingredient } from '../models/Ingredient';
import Button from 'reactstrap/lib/Button';
import { Dispatch } from 'react-redux';
import { StoreState } from '../reducers';
import { BakeRecipeResult, RecipesError } from '../actions/recipeActions';

export interface SingleRecipeComponentProps {
	recipe: Recipe;
	bakeRecipe(recipe: Recipe): (dispatch: Dispatch<StoreState>) => Promise<BakeRecipeResult | RecipesError>;
}

interface SingleRecipeComponentState {
	open: boolean;
}

export class SingleRecipeComponent extends React.Component<SingleRecipeComponentProps, SingleRecipeComponentState> {
	constructor(props: SingleRecipeComponentProps, state: SingleRecipeComponentState) {
		super(props, state);
		this.state = {
			open: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState({open: !this.state.open});
	}

	bake(recipe: Recipe) {
		this.props.bakeRecipe(recipe);
	}

	render() {
		const { recipe } = this.props;
		const { open } = this.state;

		if (open && recipe.ingredients) {
			let keys = Object.keys(recipe.ingredients);
			const listState: IngredientListComponentProps = {
				isLoading: false,
				errorMessage: '',
				hasError: false,
				ingredients: keys.map((key, i) => Object.assign(new Ingredient(), {
					amount: recipe.ingredients[key].amount,
					unit: recipe.ingredients[key].type,
					name: key,
					id: i
				}))
			};

			return (
				<div>
					<div onClick={(e) => this.handleClick()}>
						{recipe.name}:
						<IngredientListComponent {...listState} />
					</div>
					<Button onClick={(e) => this.bake(recipe)}>Shake and Bake</Button>
				</div>
			);
		}
		return (
			<div onClick={(e) => this.handleClick()}>{recipe.name}</div>
		);
	}
// {/*<ul className={'list-group'}>*/}
// {/*{Array.from(map.entries()).map(*/}
// (ingredient, i) => <li key={i}>{JSON.stringify(ingredient)}</li>
// )}
// {/*</ul>*/}
}