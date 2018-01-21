import { Recipe } from './Recipe';

export interface BakedGoods {
	id: number;
	recipe: Recipe;
	bakedAt: Date;
}