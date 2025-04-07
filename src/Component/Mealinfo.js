import React from "react";
import { useParams } from "react-router-dom";

const Mealinfo = () => {
  const { mealid } = useParams();
  console.log(mealid);

  const getInfo= () =>{
     const get= 
  }
  return <div>Mealinfo</div>;
};

export default Mealinfo;
