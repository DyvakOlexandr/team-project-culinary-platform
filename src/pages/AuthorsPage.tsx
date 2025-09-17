// src/pages/AuthorsPage.tsx
import React from "react";
import Header from "../components/Header";
import AuthorCard from "../components/AuthorCard";
import { popularAuthors } from "../data/recipes";
import styles from "./AuthorsPage.module.scss";
import { useNavigate } from "react-router-dom";

const AuthorsPage: React.FC = () => {

const navigate = useNavigate();
  return (
    <main className={styles.main}>
        <Header
        showSearch={true}
          showBackButton
          backButtonLabel="До списку рецептів"   // 👈 свой текст
          onBackClick={() => navigate(-1)}
      />
      <h1>Популярні автори</h1>
      <div className={styles.grid}>
        {popularAuthors.map((author) => (
          <AuthorCard
            key={author.id}
            name={author.name}
            profession={author.profession}
            recipesCount={author.recipesCount}
            followers={author.followers}
            image={author.image}
          />
        ))}
      </div>
    </main>
  );
};

export default AuthorsPage;
