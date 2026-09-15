import { createContext } from "react";
import { type FavoritesContextType } from "../types/index";

export const FavoritesContext = createContext<FavoritesContextType>({
  favoriteIds: [],
  addFavorite: () => {
    console.warn("addFavorite is not implemented");
  },
  removeFavorite: () => {
    console.warn("removeFavorite is not implemented");
  },
  isFavorite: () => false,
});