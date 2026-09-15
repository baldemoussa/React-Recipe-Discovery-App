import { useFetch } from "../hooks/useFetch";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { CategoryCard } from "../components/CategoryCard";
import { type CategoriesResponse } from "../types/index";


export function HomePage() {

    const { data, loading, error } = useFetch<CategoriesResponse>("https://www.themealdb.com/api/json/v1/1/categories.php");

    const categories = data?.categories ?? [];

    if (loading) {
    return <Spinner label="Loading categories..." />;
    }
    if (error) {
    return <ErrorMessage message={error} />;
    }

    return (
    <div className="min-h-screen bg-stone-50 p-8">
      <h1 className="text-3xl font-bold">Recipe Discovery</h1>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
            <CategoryCard
            key={category.idCategory}
            name={category.strCategory}
            thumb={category.strCategoryThumb}
            description={category.strCategoryDescription}
            />
        ))}
        </ul>
    </div>
  );
}