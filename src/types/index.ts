export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDetail extends MealSummary {
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string | null;
}

export interface MealsResponse {
  meals: MealSummary[] | null;
}

export interface MealResponse {
  meals: MealDetail[] | null;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface FavoritesContextType {
  favoriteIds: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export interface CategoryCardProps {
  name: string;
  thumb: string;
  description: string;
}

export interface RecipeCardProps {
  id: string;
  name: string;
  thumb: string;
}
