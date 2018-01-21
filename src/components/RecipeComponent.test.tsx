import 'jsdom-global/register';

import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import { RecipeComponent, RecipeComponentParams, StatusText } from './RecipeComponent';
import * as React from 'react';
import { Recipe } from '../models/Recipe';

Enzyme.configure({ adapter: new Adapter() });

function setup(p: { isLoading: boolean, recipes?: Recipe[] }) {
	const props: RecipeComponentParams = {
		recipes: p.recipes ? p.recipes : [],
		isLoading: p.isLoading,
		error: undefined,
		hasError: false,
		bakeRecipe: jest.fn()
	};

	const enzymeWrapper = mount(<RecipeComponent {...props} />);

	return {
		props,
		enzymeWrapper
	};
}

describe('components', () => {
	describe('RecipeComponent', () => {
		it('should render with empty list', () => {
			const { enzymeWrapper } = setup({isLoading: false});
			let find = enzymeWrapper.find('h2');
			expect(find).toBeDefined();
			expect(find.length).toBeGreaterThanOrEqual(1);
			expect(find.text()).toBe(StatusText.EMPTY);
		});
		it('should show loading message', () => {
			const { enzymeWrapper } = setup({isLoading: true});
			let find = enzymeWrapper.find('h2');
			expect(find).toBeDefined();
			expect(find.length).toBeGreaterThanOrEqual(1);
			expect(find.text()).toBe(StatusText.LOADING);
		});
		it('should show recipes', () => {
			const recipes: Recipe[] = require('../__mock__/recipes.json');

			const { enzymeWrapper } = setup({isLoading: false, recipes: recipes});
			let find = enzymeWrapper.find('ul');
			expect(find).toBeDefined();
			expect(find.length).toBeGreaterThanOrEqual(1);
		});
	});
});
