import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import RecipesPage from "./pages/RecipePage"; // <-- убедись, что компонент называется так
import RecipePage from "./pages/RecipePage"; // страница конкретного рецепта
import ProductInfoPage from "./pages/ProductInfoPage";
import MealPlannerPage from "./pages/MealPlannerPage";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <Router basename="/team-project-culinary-platform">
      <div className={styles.app}>
        <Sidebar />
        <div className={styles.content}>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<RecipesPage />} /> {/* страница со списком рецептов */}
              <Route path="/recipe/:id" element={<RecipePage />} /> {/* конкретный рецепт */}
              <Route path="/product/:id" element={<ProductInfoPage />} />
              <Route path="/planner" element={<MealPlannerPage />} /> {/* планировщик */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
