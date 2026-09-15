import { useContext, useState, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-semibold ${
    isActive
      ? "bg-orange-600 text-white"
      : "text-stone-600 hover:bg-orange-50 hover:text-orange-700"
  }`;
export function Navbar() {
  const navigate = useNavigate();
  const { favoriteIds } = useContext(FavoritesContext);
  const [query, setQuery] = useState("");
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }
    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
    setQuery("");
  };
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-4">
        <NavLink to="/" className="font-bold text-xl">
          Recipe Discovery
        </NavLink>
        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/favorites" className={navLinkClass}>
            Favorites
            {favoriteIds.length > 0 && (
              <span className="ml-2 rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-800">
                {favoriteIds.length}
              </span>
            )}
          </NavLink>
        </nav>
        <form onSubmit={handleSearch} className="flex min-w-[16rem] flex-1 gap-2 md:max-w-md md:ml-auto">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search recipes"
            className="w-full rounded-full border px-4 py-2"
          />
          <button
            type="submit"
            className="rounded-full bg-orange-600 px-4 py-2 text-white"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}