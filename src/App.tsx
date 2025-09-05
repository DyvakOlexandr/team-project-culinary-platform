import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage";
import styles from "./App.module.scss";
import ProductInfoPage from "./pages/ProductInfoPage";
import MealPlannerPage from "./pages/MealPlannerPage";

const App: React.FC = () => {
  return (
    <Router basename="/team-project-culinary-platform">
      <div className={styles.app}>
        <Sidebar />
        <div className={styles.content}>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<RecipePage />} /> 
              <Route path="/recipe/:id" element={<RecipePage />} />
              <Route path="/product/:id" element={<ProductInfoPage />} />
              <Route path="/planner" element={<MealPlannerPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
