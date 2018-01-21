import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fetchMock from 'fetch-mock';
import { actionToPlainObject, StoreState } from './reducers';
import { Provider } from 'react-redux';

// const composeEnhancers = (<any> window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const enhancer = compose(applyMiddleware(thunk, actionToPlainObject, createLogger()));

const mockStore = configureMockStore([thunk, actionToPlainObject]);
const initialState: StoreState = {
	baking: {
		recipe: '',
		errors: [],
		success: false
	},
	recipes: {
		hasError: false,
		error: undefined,
		isLoading: false,
		recipes: []
	},
	ingredients: {
		ingredients: [],
		hasError: false,
		errorMessage: '',
		isLoading: false
	},
	bakedGoods: {
		bakedGoods: [],
		isLoading: false,
		error: undefined
	}
};

describe('async actions', () => {
	beforeEach(() => {
		fetchMock.get('http://localhost:8450/recipe', {});
		fetchMock.get('http://localhost:8440/ingredients', {});
	});

	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Provider store={mockStore(initialState)}><App/></Provider>, div);

		expect(fetchMock.called());
		console.log(fetchMock.calls());
	});
});
