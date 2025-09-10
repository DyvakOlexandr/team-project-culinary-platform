import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import RecipesPage from "./pages/RecipePage";
import RecipePage from "./pages/RecipePage";
import ProductInfoPage from "./pages/ProductInfoPage";
import MealPlannerPage from "./pages/MealPlannerPage";
import SavedPage from "./pages/SavedPage"; // <-- добавляем нашу страницу
import styles from "./App.module.scss";
import CollectionPage from "./pages/CollectionPage";

const App: React.FC = () => {
  return (
    <Router basename="/team-project-culinary-platform">
      <div className={styles.app}>
        <Sidebar />
        <div className={styles.content}>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/recipe/:id" element={<RecipePage />} />
              <Route path="/product/:id" element={<ProductInfoPage />} />
              <Route path="/planner" element={<MealPlannerPage />} />
              <Route path="/saved" element={<SavedPage />} /> {/* новый маршрут */}
              <Route path="/collection/:id" element={<CollectionPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
