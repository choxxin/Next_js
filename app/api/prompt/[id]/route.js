import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
//GET read

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const Prompts = await Prompt.findById(params.id).populate("creator");
    console.log(Prompts);

    return new Response(JSON.stringify(Prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
};

//PATCH create
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to update prompt", {
      status: 500,
    });
  }
};

//Deleter

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to delete prompt", {
      status: 500,
    });
  }
};
