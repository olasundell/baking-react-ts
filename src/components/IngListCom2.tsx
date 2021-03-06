import { Ingredient } from '../models/Ingredient';
import { StoreState } from '../reducers';
import { connect, Dispatch } from 'react-redux';
import * as React from 'react';
import ReactTable from 'react-table';
import { bindActionCreators } from 'redux';
import { IngredientsError, SaveIngredientsResult } from '../actions/ingredientsActions';
import { saveIngredients as saveIngredientsAction } from '../actions/ingredientsActions';
import Button from 'reactstrap/lib/Button';

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
		this.renderEditable = this.renderEditable.bind(this);
	}

	renderEditable(cellInfo: any) {
		return (
			<div
				style={{ backgroundColor: '#fafafa' }}
				contentEditable={true}
				suppressContentEditableWarning={true}
				onBlur={(e: any) => {
					const data = [...this.state.ingredients];
					data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
					this.setState({ ingredients: data });
				}}
				dangerouslySetInnerHTML={{
					__html: this.props.ingredients[cellInfo.index][cellInfo.column.id]
				}}
			/>
		);
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

		// TODO these should be read from the web service instead
		const columns = [{
			Header: 'Name',
			accessor: 'name',
			Cell: this.renderEditable
		}, {
			Header: 'Amount',
			accessor: 'amount',
			Cell: this.renderEditable
		}, {
			id: 'unit', // Required because our accessor is not a string
			Header: 'Unit',
			accessor: (d: Ingredient) => d.unit, // Custom value accessors!
			Cell: this.renderEditable
		}];

		return (
			<div>
				<ReactTable
					data={ingredients}
					columns={columns}
					defaultPageSize={10}
					className={'-striped -highlight'}
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
