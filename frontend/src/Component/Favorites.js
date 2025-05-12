import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../index.css";

const Favorites = ({ favorites, toggleFavorite, onBack }) => {
  const [userFavorites, setUserFavorites] = useState(favorites);

  // Αυτόματο φόρτωμα αγαπημένων από το localStorage κατά την εκκίνηση
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setUserFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Ενημέρωση του localStorage όταν τα αγαπημένα αλλάζουν
  useEffect(() => {
    if (userFavorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(userFavorites));
    }
  }, [userFavorites]);

  return (
    <div className="container">
      <h1 className="head">Your Favorites</h1>

      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      {userFavorites.length === 0 ? (
        <p>You have no favorite meals yet.</p>
      ) : (
        <div className="grid">
          {userFavorites.map((meal) => (
            <div key={meal.idMeal} className="image-card">
              <Link to={`/meal/${meal.idMeal}`}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <p className="meal-title">{meal.strMeal}</p>
                <span className="recipe-button">
                  Recipe{" "}
                  <span
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(meal);
                      // Ενημέρωση των αγαπημένων όταν τα toggles
                      const updatedFavorites = userFavorites.includes(meal)
                        ? userFavorites.filter((f) => f.idMeal !== meal.idMeal)
                        : [...userFavorites, meal];
                      setUserFavorites(updatedFavorites);
                    }}
                  >
                    <FaHeart color="red" />
                  </span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
