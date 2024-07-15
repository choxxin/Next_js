import mongoose, { Schema, model, models } from "mongoose";
import User from "./user";

const promptSchema = new Schema({
  creator: {
    type: "string",
    ref: User,
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});
const prompt = models.prompt || model("prompt", promptSchema);
export default prompt;
