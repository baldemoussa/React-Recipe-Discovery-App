import { Link } from "react-router-dom";
import { type CategoryCardProps } from "../types/index";

export function CategoryCard({ name, thumb, description }: CategoryCardProps) {
  return (
    <li>
      <Link
        to={`/category/${name}`}
        className="group block overflow-hidden rounded-xl bg-white p-4 ring-1 ring-stone-200 hover:-translate-y-0.5 hover:ring-orange-300"
      >
        <img
          src={thumb}
          alt={name}
          className="h-40 w-full rounded-lg object-cover transition group-hover:scale-105"
        />
        <h2 className="mt-3 text-xl font-semibold">{name}</h2>
        <p className="mt-1 line-clamp-3 text-sm text-stone-500">{description}</p>
      </Link>
    </li>
  );
}