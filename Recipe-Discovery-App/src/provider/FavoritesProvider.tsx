import { type ReactNode } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<string[]>(
    "favoriteRecipeIds",
    []
  );
  const addFavorite = (id: string) => {
    setFavoriteIds((current) =>
      current.includes(id) ? current : [...current, id]
    );
  };
  const removeFavorite = (id: string) => {
    setFavoriteIds((current) => current.filter((item) => item !== id));
  };
  const isFavorite = (id: string) => favoriteIds.includes(id);
  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}