import express from "express"; // api
import cors from "cors"; // rules btw front end and backend
import mongoose from "mongoose"; // database
import { userRouter } from "./routes/users.js"; // api
import { recipesRouter } from "./routes/recipes.js"; 
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

app.use("/recipes",recipesRouter);



mongoose.connect(
  "mongodb+srv://Ankith:MyRecipeApp100@recipes.mjewt.mongodb.net/RecipeApp?retryWrites=true&w=majority&appName=recipes"
);

app.listen(3001, () => console.log("SERVER STARTED"));
