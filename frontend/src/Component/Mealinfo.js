import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../index.css";

const Mealinfo = () => {
  const { mealid } = useParams();
  const [info, setInfo] = useState(null);

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
      <Link to="/" className="home-button2">
        ← Home
      </Link>

      {!info ? (
        <p>Data Not Found</p>
      ) : (
        <div className="mealInfo">
          <img src={info.strMealThumb} alt={info.strMeal} />
          <div>
            <h1>Recipe Details</h1>
            <p className="recipe-name">{info.strMeal}</p>
            <h3>Instructions</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: info.strInstructions.replace(/STEP/g, "<br><br>STEP"),
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Mealinfo;
