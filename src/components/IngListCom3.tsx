import { Ingredient } from '../models/Ingredient';
import { connect, Dispatch } from 'react-redux';
import { StoreState } from '../reducers';
import { IngredientsError, SaveIngredientsResult } from '../actions/ingredientsActions';
import { saveIngredients as saveIngredientsAction } from '../actions/ingredientsActions';
import { bindActionCreators } from 'redux';
import * as React from 'react';
import * as ReactDataGrid from 'react-data-grid';
import Button from 'reactstrap/lib/Button';
// import * as ReactDataGridAddons from 'react-data-grid-addons';
// import { Editors } from 'react-data-grid-addons';

export interface IngredientListComponentProps {
	isLoading: boolean;
	ingredients: Ingredient[];
	hasError: boolean;
	errorMessage: string;
}

interface IngListComActions {
	saveIngredients(ingredients: Ingredient[]):
		(dispatch: Dispatch<StoreState>) => Promise<SaveIngredientsResult | IngredientsError>;
}

export interface IngredientListComponentParams extends IngListComActions, IngredientListComponentProps {}

interface IngredientListComponentState {
	ingredients: Ingredient[];
}

class IngredientListComponent extends React.Component<IngredientListComponentParams, IngredientListComponentState> {
	constructor(props: IngredientListComponentParams, state: IngredientListComponentState) {
		super(props, state);
	}

	componentDidMount() {
		console.log('Component did mount');
		if (!this.state || !this.state.ingredients) {
			this.setState({
				ingredients: this.props.ingredients
			});
		}
	}

	render() {
		const { hasError, errorMessage, isLoading, ingredients } = this.props;

		if (hasError) {
			return <h2>{errorMessage}</h2>;
		}

		if (isLoading) {
			return (<h2>Loading</h2>);
		}

		// TODO read from ws
		// const units = [
		// 	{ title: 'GRAMMES' }, { title: 'PIECES' }, { title: 'LITRES' }
		// ];

		// const { Editors } = ReactDataGridAddons;
		// const { DropDownEditor } = Plugins.Editors.DropDownEditor;

		// const PrioritiesEditor = <Editors.DropDownEditor options={units} />;
		// const PrioritiesEditor = <Editors.AutoComplete options={units} />;

		const columns = [{
			name: 'Name',
			key: 'name',
			editable: true,
		}, {
			name: 'Amount',
			key: 'amount',
			editable: true,
		}, {
			name: 'Unit',
			editable: true,
			// editor: PrioritiesEditor,
			key: 'unit'
		}];

		const rowGetter = (rowNumber: number) => ingredients[rowNumber];

		return (
			<div>
				<ReactDataGrid
					columns={columns}
					rowGetter={rowGetter}
					rowsCount={ingredients.length}
					minHeight={500}
				/>
				<Button onClick={(e) => this.save()}>Save</Button>
				<Button onClick={(e) => this.addRow()}>Add row</Button>
			</div>
		);
	}

	private save() {
		// if not, we haven't done any updates.
		if (this.state.ingredients) {
			this.props.saveIngredients(this.state.ingredients);
		}
	}

	private addRow() {
		// if (!this.state.ingredients) {
		// 	this.props.saveIngredients(this.state.ingredients);
		// }
		const { ingredients } = this.state;
		ingredients.push(new Ingredient());
		this.setState({
			ingredients: ingredients
		});
	}
}

function mapStateToProps(state: StoreState): IngredientListComponentProps {
	return {
		...state.ingredients
	};
}

function mapDispatchToProps(dispatch: Dispatch<StoreState>): IngListComActions {
	return {
		saveIngredients: bindActionCreators(saveIngredientsAction, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientListComponent);
