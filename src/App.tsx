import * as React from 'react';
import RecipeComponent from './components/RecipeComponent';
import { Recipe } from './models/Recipe';
import { StoreState } from './reducers';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRecipes as fetchRecipesAction } from './actions/recipeActions';
import { fetchIngredients as fetchIngredientsAction } from './actions/ingredientsActions';
import { TabContent } from 'reactstrap';
import TabPane from 'reactstrap/lib/TabPane';
import NavLink from 'reactstrap/lib/NavLink';
import NavItem from 'reactstrap/lib/NavItem';
import Nav from 'reactstrap/lib/Nav';
import * as classNames from 'classnames';
// import AllIngredientsListComponent from './components/IngredientListComponent';
import AllIngredientsListComponent from './components/IngListCom2';
import { Ingredient } from './models/Ingredient';

interface AppProps {
	fetchRecipes(): (dispatch: Dispatch<StoreState>) => Promise<Recipe[]>;
	fetchIngredients(): (dispatch: Dispatch<StoreState>) => Promise<Ingredient[]>;
}

interface AppState {
	activeTab: string;
}

class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.toggle = this.toggle.bind(this);

		this.state = {
			activeTab: '1'
		};
	}

	componentDidMount() {
		this.props.fetchRecipes();
		this.props.fetchIngredients();
	}

	toggle(tab: string) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	render() {
		return (
				<div>
					<Nav tabs={true}>
						<NavItem>
							<NavLink
								className={classNames({ active: this.state.activeTab === '1' })}
								onClick={() => { this.toggle('1'); }}
							>
								Recipes
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								className={classNames({ active: this.state.activeTab === '2' })}
								onClick={() => { this.toggle('2'); }}
							>
								Ingredients
							</NavLink>
						</NavItem>
					</Nav>
					<TabContent activeTab={this.state.activeTab}>
						<TabPane tabId="1">
							{'1' === this.state.activeTab && <RecipeComponent/>}
						</TabPane>
						<TabPane tabId="2">
							{'2' === this.state.activeTab && <AllIngredientsListComponent />}
						</TabPane>
					</TabContent>
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
		fetchIngredients: bindActionCreators(fetchIngredientsAction, dispatch)
	};
}

export default connect<{}, {}, AppProps>(mapStateToProps, mapDispatchToProps)(App) as React.ComponentClass<{}>;
