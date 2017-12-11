import * as React from 'react';
import { Recipe } from '../models/Recipe';
import { IngredientListComponent, IngredientListComponentProps } from './IngredientListComponent';
import { Ingredient } from '../models/Ingredient';

export interface SingleRecipeComponentProps {
	recipe: Recipe;
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
				<div onClick={(e) => this.handleClick()}>
					{recipe.name}:
					<IngredientListComponent {...listState} />
					{/*<ul className={'list-group'}>*/}
					{/*{keys.map((ingrName, i) => <li key={i}>{ingrName} {recipe.ingredients[ingrName].amount} {recipe.ingredients[ingrName].type}</li>)}*/}
					{/*</ul>*/}
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