import { useState } from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID.js";
import {useNavigate} from "react-router-dom"
export const CreateRecipe=()  => {
  const userID=useGetUserID();
  console.log("User ID:", userID);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID, 
  });
  const navigate=useNavigate();
 
  const handleChange=(event)=>{
    const {name,value}=event.target;
    setRecipe({...recipe,[name]:value});
  };
  const handleIngredientChange=(event,idx)=>{
    const {value}=event.target;
    const ingredients=recipe.ingredients;
    ingredients[idx]=value;
    setRecipe({...recipe,ingredients});
   
  };

  const addIngredient=()=>{
    setRecipe({...recipe,ingredients:[...recipe.ingredients,""]})
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting Recipe:", recipe); // Debugging step
    try {
      const response = await axios.post("http://localhost:3001/recipes", recipe);
      console.log("Server Response:", response.data); // Check response
      alert("Recipe created");  //When the recipe gets created then using navigate function we directly jump to home page to check recipes
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
    }
  };
  
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name"> Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" onChange={handleChange}></textarea>
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
  <input 
    key={idx} 
    type="text" 
    name="ingredients" 
    value={ingredient} 
    onChange={(event) => handleIngredientChange(event, idx)} 
  />
))}

        <button onClick={addIngredient} type="button">Add ingredient</button>
        <label htmlFor="instructions">Instructions</label>  
        <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>
        <label htmlFor="imageUrl">Image URL</label> 
        <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange}/>
        <label htmlFor="cookingTime">Cooking Time</label>   
        <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />

        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
