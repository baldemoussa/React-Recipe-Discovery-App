import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import { useFetch } from "../hooks/useFetch";
import { ErrorMessage } from "../components/ErrorMessage";
import { RecipeCard } from "../components/RecipeCard";
import { Spinner } from "../components/Spinner";
import { type MealResponse } from "../types/index";

function FavoriteCard({ id }: { id: string }) {
  const { data, loading, error } = useFetch<MealResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const meal = data?.meals?.[0];
  if (loading) {
    return (
      <li className="rounded-xl bg-white p-4">
        <Spinner label="Loading..." />
      </li>
    );
  }
  if (error || !meal) {
    return (
      <li>
        <ErrorMessage message={error ?? "Could not load recipe."} />
      </li>
    );
  }
  return (
        <RecipeCard
          id={meal.idMeal}
          name={meal.strMeal}
          thumb={meal.strMealThumb}
        />
      );
}
export function FavoritesPage() {
  const { favoriteIds } = useContext(FavoritesContext);
  if (favoriteIds.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 p-8">
        <Link to="/" className="text-orange-700">
          Back to categories
        </Link>
        <h1 className="mt-3 text-3xl font-bold">Favorites</h1>
        <p className="mt-3 text-stone-500">
          No favorites yet. Open a recipe and tap Add to Favorites.
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <Link to="/" className="text-orange-700">
        Back to categories
      </Link>
      <h1 className="mt-3 text-3xl font-bold">Favorites</h1>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteIds.map((id) => (
          <FavoriteCard key={id} id={id} />
        ))}
      </ul>
    </div>
  );
}