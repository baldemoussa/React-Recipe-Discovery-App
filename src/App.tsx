import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CategoryPage } from "./pages/CategoryPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { HomePage } from "./pages/HomePage";
import { RecipeDetailPage } from "./pages/RecipeDetailPage";
import { SearchPage } from "./pages/SearchPage";
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;