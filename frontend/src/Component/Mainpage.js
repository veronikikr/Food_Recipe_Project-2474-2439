import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const MainPage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [randomMeals, setRandomMeals] = useState([]);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate(); // για προαιρετικό redirect

  const handleInput = (e) => setSearch(e.target.value);

  const handleSearch = async () => {
    if (search.trim() === "") {
      setMsg("Please enter a dish name.");
      return;
    }
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
    const data = await res.json();
    if (data.meals) {
      setResults(data.meals);
      setMsg("");
    } else {
      setResults([]);
      setMsg("No recipes found.");
    }
  };

  const fetchRandomMeals = async () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${randomLetter}`
    );
    const data = await res.json();
    if (data.meals) {
      const shuffled = data.meals.sort(() => 0.5 - Math.random());
      setRandomMeals(shuffled.slice(0, 12));
    }
  };

  // ✅ Αυτό καθαρίζει τα πάντα όταν πατάς Home
  const handleReset = () => {
    setSearch("");
    setResults([]);
    setMsg("");
    // navigate("/") // προαιρετικά
  };

  useEffect(() => {
    fetchRandomMeals();
  }, []);

  const mealsToShow = results.length > 0 ? results : randomMeals;

  return (
    <div className="container">
      <h1 className="head">Tasty</h1>

      <div className="searchBar">
        <input
          type="text"
          placeholder="Enter Dish"
          value={search}
          onChange={handleInput}
        />
        <button onClick={handleSearch}>Search</button>

        {/* ✅ Εμφανίζεται μόνο όταν υπάρχουν αποτελέσματα */}
        {results.length > 0 && (
          <button className="home-button" onClick={handleReset}>
            Home
          </button>
        )}
      </div>

      <h4 className="error">{msg}</h4>

      <div className="grid">
        {mealsToShow.map((meal) => (
          <div key={meal.idMeal} className="image-card">
            {results.length > 0 ? (
              <a href={`/meal/${meal.idMeal}`}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              </a>
            ) : (
              <img src={meal.strMealThumb} alt={meal.strMeal} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
