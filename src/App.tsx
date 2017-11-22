import * as React from 'react';
import './App.css';
import RecipeComponent from './components/RecipeComponent';
import { Recipe } from './models/Recipe';
import { StoreState } from './reducers';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRecipes as fetchRecipesAction } from './actions/actions';

interface AppProps {
	fetchRecipes(): (dispatch: Dispatch<StoreState>) => Promise<Recipe[]>;
}

class App extends React.Component<AppProps> {
	constructor(props: AppProps) {
		super(props);
		props.fetchRecipes();
	}

	render() {
		return (
			<div>
				<RecipeComponent />
			</div>
		);
	}
}

function mapStateToProps(state: StoreState) {
	return {
		...state,
	};
}

function mapDispatchToProps(dispatch: Dispatch<StoreState>) {
	return {
		fetchRecipes: bindActionCreators(fetchRecipesAction, dispatch),
	};
}

export default connect<{}, {}, AppProps>(mapStateToProps, mapDispatchToProps)(App) as React.ComponentClass<{}>;
