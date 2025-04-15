import React from "react";
import { NavLink } from "react-router-dom";
import "../index.css";

const Mealcards = ({ detail, onReset }) => {
  return (
    <div>
      {/* Κουμπί Home */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="home-button" onClick={onReset}>
          Home
        </button>
      </div>

      <div className="meals-container">
        {detail?.length > 0 &&
          detail.map((curItem) => (
            <div key={curItem.idMeal} className="meal-card">
              <NavLink to={`/meal/${curItem.idMeal}`}>
                <img
                  src={curItem.strMealThumb}
                  alt={curItem.strMeal}
                  className="meal-img"
                />
              </NavLink>
              <p className="meal-name">{curItem.strMeal}</p>
              <NavLink to={`/meal/${curItem.idMeal}`}>
                <button className="recipe-btn">Recipe</button>
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Mealcards;
