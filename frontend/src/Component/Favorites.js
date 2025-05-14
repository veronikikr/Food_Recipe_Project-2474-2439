import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../index.css";

const Favorites = ({ favorites, toggleFavorite, onBack }) => {
  const handleToggle = (meal) => {
    toggleFavorite(meal);
  };

  return (
    <div className="container">
      <h1 className="head">Your Favorites</h1>

      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      {favorites.length === 0 ? (
        <p>You have no favorite meals yet.</p>
      ) : (
        <div className="grid">
          {favorites.map((meal) => {
            if (!meal || !meal.idMeal) return null; // Προσθήκη ελέγχου για το meal

            return (
              <div key={meal.idMeal} className="image-card">
                <Link to={`/meal/${meal.idMeal}`}>
                  <img src={meal.strMealThumb} alt={meal.strMeal} />
                  <p className="meal-title">{meal.strMeal}</p>
                </Link>
                <span className="recipe-button">
                  Recipe{" "}
                  <span
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggle(meal);
                    }}
                  >
                    <FaHeart color="red" />
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
