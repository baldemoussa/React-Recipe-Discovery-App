import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { type MealDetail, type MealResponse } from "../types/index";

function getIngredients(meal: MealDetail) {
  const record = meal as unknown as Record<string, string | null>;
  const ingredients: { name: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = record[`strIngredient${i}`]?.trim();
    const measure = record[`strMeasure${i}`]?.trim() ?? "";
    if (name) {
      ingredients.push({ name, measure });
    }
  }
  return ingredients;
}

function getYoutubeId(url: string | null) {
  if (!url) {
    return null;
  }

  try {
    return new URL(url).searchParams.get("v");
  } catch {
    return null;
  }
}

export function RecipeDetailPage() {
  const { recipeId } = useParams();

  const { data, loading, error } = useFetch<MealResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
  );

  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  const meal = data?.meals?.[0];

 if (loading) {
    return <Spinner label="Loading recipe..." />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!meal) {
    return <p className="p-8">Recipe not found.</p>;
  }

  const favorited = isFavorite(meal.idMeal);
  const ingredients = getIngredients(meal);
  const youtubeId = getYoutubeId(meal.strYoutube);

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <Link to={`/category/${meal.strCategory}`} className="text-orange-700">
        Back to {meal.strCategory}
      </Link>
      <div className={`mt-4 grid gap-4 ${youtubeId ? "lg:grid-cols-2" : ""}`}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="aspect-video h-full w-full rounded-2xl object-cover"
        />
        {youtubeId && (
          <div className="aspect-video overflow-hidden rounded-2xl bg-stone-900">
            <iframe
              title={`${meal.strMeal} video`}
              src={`https://www.youtube.com/embed/${youtubeId}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
      <p className="mt-4 text-sm font-semibold text-orange-700">
        {meal.strArea} · {meal.strCategory}
      </p>
      <h1 className="mt-1 text-3xl font-bold">{meal.strMeal}</h1>
      <button
        type="button"
        onClick={() =>
            favorited ? removeFavorite(meal.idMeal) : addFavorite(meal.idMeal)
        }
        className="mt-4 rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white"
        >
        {favorited ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold">Ingredients</h2>
          <ul className="mt-3">
            {ingredients.map((item) => (
              <li key={item.name} className="flex justify-between border-b py-2">
                <span>{item.name}</span>
                <span className="text-stone-500">{item.measure}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Instructions</h2>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-stone-600">
            {meal.strInstructions}
          </p>
        </div>
      </div>
    </div>
  );
}