import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Favorites from "./Favorites.js";
import "../index.css";

const MainPage = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [randomMeals, setRandomMeals] = useState([]);
  const [msg, setMsg] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Παιχνιδοποίηση
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState("Newbie");
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const savedFavorites = sessionStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const user = sessionStorage.getItem("loggedInUser");
    if (user) setLoggedInUser(user);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (location.state?.scrollToResults) {
      setTimeout(() => {
        const grid = document.querySelector(".grid");
        if (grid) grid.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    fetchRandomMeals();
  }, []);

  useEffect(() => {
    const savedResults = sessionStorage.getItem("searchResults");
    const savedQuery = sessionStorage.getItem("searchQuery");
    if (savedResults && savedQuery) {
      setResults(JSON.parse(savedResults));
      setSearch(savedQuery);
    }
  }, []);

  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        setLoginSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess]);

  const handleInput = (e) => setSearch(e.target.value);

  const handleSearch = async () => {
    if (search.trim() === "") {
      setMsg("Please enter a dish name.");
      return;
    }
    try {
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
      sessionStorage.setItem("searchResults", JSON.stringify(data.meals));
      sessionStorage.setItem("searchQuery", search);
    } catch (error) {
      setMsg("An error occurred. Please try again.");
    }
  };

  const fetchRandomMeals = async () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let allMeals = [];

    while (allMeals.length < 12) {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${randomLetter}`
      );
      const data = await res.json();
      if (data.meals) {
        const newMeals = data.meals.filter(
          (meal) => !allMeals.find((m) => m.idMeal === meal.idMeal)
        );
        allMeals = [...allMeals, ...newMeals];
      }
      if (allMeals.length > 50) break;
    }

    const shuffled = allMeals.sort(() => 0.5 - Math.random());
    setRandomMeals(shuffled.slice(0, 12));
  };

  const calculateLevel = (pts) => {
    if (pts >= 200) return "Master Chef";
    if (pts >= 100) return "Chef Apprentice";
    if (pts >= 50) return "Explorer";
    return "Newbie";
  };

  const updateBadges = (pts) => {
    const earned = [];
    if (pts >= 10) earned.push("🔰 First 10 points");
    if (pts >= 50) earned.push("🍳 Cooking Enthusiast");
    if (pts >= 100) earned.push("🥘 Meal Master");
    if (pts >= 200) earned.push("🏆 Legend");
    setBadges(earned);
  };

  const addPoints = (amount) => {
    setPoints((prev) => {
      const newPoints = prev + amount;
      setLevel(calculateLevel(newPoints));
      updateBadges(newPoints);

      // 👉 TODO: Στείλε τους νέους πόντους στο backend εδώ όταν φτιαχτεί
      // await fetch('/api/updatePoints', { method: 'POST', body: JSON.stringify({ user: loggedInUser, points: newPoints }) });

      return newPoints;
    });
  };

  const toggleFavorite = (meal) => {
    if (!meal || !meal.idMeal) return;
    const exists = favorites.some((fav) => fav.idMeal === meal.idMeal);
    let updatedFavorites;

    if (exists) {
      updatedFavorites = favorites.filter((fav) => fav.idMeal !== meal.idMeal);
    } else {
      updatedFavorites = [...favorites, meal];
      addPoints(5); // 🎯 δώσε πόντους μόνο όταν προσθέτει αγαπημένο
    }

    setFavorites(updatedFavorites);
  };

  const handleReset = () => {
    setSearch("");
    setResults([]);
    setMsg("");
    sessionStorage.removeItem("searchResults");
    sessionStorage.removeItem("searchQuery");
  };

  const handleShowFavorites = () => setShowFavorites(true);
  const handleBackHome = () => setShowFavorites(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setLoginError(false);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    setUsername("");
    setPassword("");
    setLoginError(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (
      !savedUser ||
      savedUser.username !== username ||
      savedUser.password !== password
    ) {
      setLoginError(true);
      setLoginSuccess(false);
      return;
    }

    setLoginError(false);
    setLoginSuccess(true);
    setLoggedInUser(savedUser.username);
    sessionStorage.setItem("loggedInUser", savedUser.username);
    setShowLoginModal(false);
    setUsername("");
    setPassword("");

    setPoints(10); // 🎁 Αρχικοί πόντοι
    setLevel(calculateLevel(10));
    updateBadges(10);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    sessionStorage.removeItem("loggedInUser");
    setPoints(0);
    setLevel("Newbie");
    setBadges([]);
  };

  const handleRegisterClick = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newUser = { email, username: regUsername, password: regPassword };
    localStorage.setItem("registeredUser", JSON.stringify(newUser));
    setShowRegister(false);
    setEmail("");
    setRegUsername("");
    setRegPassword("");
  };

  const mealsToShow = results.length > 0 ? results : randomMeals;

  if (showFavorites) {
    return (
      <Favorites
        favorites={Array.from(favorites)}
        toggleFavorite={toggleFavorite}
        onBack={handleBackHome}
      />
    );
  }

  return (
    <div className="container">
      <h1 className="head">Tasty</h1>

      {loginSuccess && (
        <div className="login-success-banner">✅ Login successful!</div>
      )}

      {loggedInUser ? (
        <>
          <div className="user-bar">
            <span className="user-greeting">
              Welcome, <span className="username">{loggedInUser}</span>
            </span>
            <span className="user-level"> | Level: {level}</span>
            <span className="user-points"> | Points: {points}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {badges.length > 0 && (
            <div className="badges-container">
              <strong>Badges:</strong>{" "}
              {badges.map((badge, idx) => (
                <span key={idx} className="badge">
                  {badge}
                </span>
              ))}
            </div>
          )}
        </>
      ) : (
        <button onClick={handleLoginClick} className="login-button">
          Login
        </button>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {loginError && (
                <p className="error-message">Incorrect username or password.</p>
              )}
              <button type="submit">Login</button>
              <button type="button" onClick={handleCloseLoginModal}>
                Close
              </button>
            </form>
            <div className="register-link">
              <span>Not an account yet?</span>{" "}
              <button onClick={handleRegisterClick}>Register</button>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="reg-email">Email</label>
                <input
                  type="email"
                  id="reg-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="reg-username">Username</label>
                <input
                  type="text"
                  id="reg-username"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="reg-password">Password</label>
                <input
                  type="password"
                  id="reg-password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Register</button>
              <button type="button" onClick={handleCloseRegister}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="searchBar">
        <span
          onClick={handleShowFavorites}
          style={{ cursor: "pointer", marginRight: "10px" }}
        >
          <FaHeart color="red" fontSize="xx-large" />
        </span>
        <input
          type="text"
          placeholder="Enter Dish"
          value={search}
          onChange={handleInput}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
        {results.length > 0 && (
          <button className="home-button" onClick={handleReset}>
            Home
          </button>
        )}
      </div>

      {msg && results.length === 0 && <h4 className="error">{msg}</h4>}

      <div className="grid">
        {mealsToShow.map((meal) => {
          if (!meal || !meal.idMeal) return null;
          const isFav = favorites.some((fav) => fav.idMeal === meal.idMeal);

          return (
            <div key={meal.idMeal} className="image-card">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              {results.length > 0 && (
                <>
                  <p className="meal-title">{meal.strMeal}</p>
                  <div className="recipe-container">
                    <Link
                      to={`/meal/${meal.idMeal}`}
                      state={{ fromSearch: true }}
                    >
                      <button className="recipe-button">Recipe</button>
                    </Link>
                    <button
                      className="favorite-button"
                      onClick={() => toggleFavorite(meal)}
                    >
                      <FaHeart color={isFav ? "red" : "gray"} />
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;
