import { Link, useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { ErrorMessage } from "../components/ErrorMessage";
import { RecipeCard } from "../components/RecipeCard";
import { Spinner } from "../components/Spinner";
import { type MealsResponse } from "../types/index";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.trim() ?? "";
  const { data, loading, error } = useFetch<MealsResponse>(
    query
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
      : null
  );
  const recipes = data?.meals ?? [];
  if (!query) {
    return <p className="p-8">Type a recipe name to search.</p>;
  }
if (loading) {
  return <Spinner label="Searching..." />;
}
if (error) {
  return <ErrorMessage message={error} />;
}
  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <Link to="/" className="text-orange-700">
        Back to categories
      </Link>
      <h1 className="mt-3 text-3xl font-bold">{query}</h1>
      <p className="mt-2 text-stone-500">{recipes.length} results</p>
      {recipes.length === 0 ? (
        <p className="mt-6 text-stone-500">No recipes matched that search.</p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
            <RecipeCard
            key={recipe.idMeal}
            id={recipe.idMeal}
            name={recipe.strMeal}
            thumb={recipe.strMealThumb}
            />
        ))}
        </ul>
      )}
    </div>
  );
}