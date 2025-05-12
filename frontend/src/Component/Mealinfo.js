import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../index.css";

const Mealinfo = () => {
  const { mealid } = useParams();
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const fromSearch = location.state?.fromSearch;

  useEffect(() => {
    const getInfo = async () => {
      const get = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
      );
      const jsonData = await get.json();
      setInfo(jsonData.meals[0]);
    };

    getInfo();
  }, [mealid]);

  return (
    <div>
      <button className="home-button2" onClick={() => navigate("/")}>
        ← Home
      </button>

      <button
        className="back-button"
        onClick={() => {
          if (fromSearch) {
            navigate("/", { state: { scrollToResults: true } });
          } else {
            navigate(-1);
          }
        }}
      >
        ← Back
      </button>

      {!info ? (
        <p>Data Not Found</p>
      ) : (
        <div className="mealInfo">
          <img src={info.strMealThumb} alt={info.strMeal} />
          <span>
            <h1>Recipe Details</h1>
            <p className="recipe-name">{info.strMeal}</p>
            <h3>Instructions</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: info.strInstructions.replace(/STEP/g, "<br><br>STEP"),
              }}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default Mealinfo;
