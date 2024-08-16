import Replicate from "replicate";
import dotenv from "dotenv";

dotenv.config();

const replicate = new Replicate({auth: process.env.REPLICATE_API_KEY});

export const generateImage = async (prompt) => {

    console.log(prompt);

    const input = {
        prompt: prompt,
        aspect_ratio: "3:2"
        
    }

    const output = await replicate.run("stability-ai/stable-diffusion-3", {input});
    console.log(output);

    return output
}