import { Link } from "react-router-dom";
import { type RecipeCardProps } from "../types/index";

export function RecipeCard({ id, name, thumb }: RecipeCardProps) {
  return (
    <li>
      <Link
        to={`/recipe/${id}`}
        className="group block overflow-hidden rounded-xl bg-white p-4 ring-1 ring-stone-200 hover:-translate-y-0.5 hover:ring-orange-300"
      >
        <img
          src={thumb}
          alt={name}
          className="h-40 w-full rounded-lg object-cover transition group-hover:scale-105"
        />
        <h2 className="mt-3 font-semibold">{name}</h2>
      </Link>
    </li>
  );
}