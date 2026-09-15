import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { RecipeCard } from "../components/RecipeCard";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { type MealsResponse } from "../types/index";

export function CategoryPage() {
  const { categoryName } = useParams();
  const { data, loading, error } = useFetch<MealsResponse>(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);

  const recipes = data?.meals ?? [];

 if (loading) {
  return <Spinner label="Loading recipes..." />;
}
if (error) {
  return <ErrorMessage message={error} />;
}

    return (
    <div className="min-h-screen bg-stone-50 p-8">
      <Link to="/" className="text-orange-700">
        Back to categories
      </Link>
      <h1 className="mt-3 text-3xl font-bold">{categoryName}</h1>
      <p className="mt-2 text-stone-500">{recipes.length} recipes</p>
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
    </div>
  );
}