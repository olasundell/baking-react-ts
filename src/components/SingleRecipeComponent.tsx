import * as React from 'react';
import { Recipe } from '../models/Recipe';

export interface SingleRecipeComponentProps {
	recipe: Recipe;
}

interface SingleRecipeComponentState {
	visible: boolean;
}

export class SingleRecipeComponent extends React.Component<SingleRecipeComponentProps, SingleRecipeComponentState> {
	constructor(props: SingleRecipeComponentProps, state: SingleRecipeComponentState) {
		super(props, state);
		this.state = {
			visible: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState({visible: !this.state.visible});
	}
	render() {
		const { recipe } = this.props;
		return (
			<div>{recipe.name}</div>
		);
	}
}