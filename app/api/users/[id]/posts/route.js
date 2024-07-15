import { connectToDB } from "@utils/database";
import prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const Prompts = await prompt
      .find({ creator: params.id })
      .populate("creator");
    //  if(!Prompts){
    //     throw new Error;
    //  }

    return new Response(JSON.stringify(Prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
