import { Schema, model, models } from "mongoose";

const Userschema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },

  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already exists"],
  },
  image: {
    type: String,
  },
});

//The "model" object is provided by mongoose and is used to create new models.
//It takes two arguments: the name of the model and the schema.
//if model user already exist it assign the existing user model to the user variable
// if a model does not exist, it creates a new model with the name "User" and the schema defined above.
const User = models.User || model("User", Userschema);
export default User;
