import {GoogleGenerativeAI} from "@google/generative-ai";
import dotenv from 'dotenv';
import {generateImage} from '../AI/stability.js';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || '')

const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash', generationConfig: {"response_mime_type": "application/json"}});


async function generatePost(theme) {

    const promptMain = `
    Task:You are a professional Instagram content creator. Your task is to create emotional and engaging posts based on themes provided by the user. When the user provides you with a theme or a story, you should write a beautiful and touching text for the post and provide a detailed description for a photo idea suitable for use with Stable Diffusion. Remember, the text should be captivating and inspiring to attract the audience's attention.

    Output must be in this JSON format.
    Example: 
    Input JSON: 
        {
        "theme": "Create a post about how cats and dogs become friends."
        }
    Output JSON:
        {
        "post_text": "Today, I want to share an incredibly touching story about true friendship between a cat and a dog. 🐱❤️🐶 This friendship proves that true friends can come in all shapes and sizes. They play together, sleep together, and even share their food! Sometimes, it seems like they have their own language, understanding each other without words. 🌟✨\n\nDo you have amazing examples of such friendships among your pets? Share your stories in the comments! 🥰",
        "photo_description": "A dog and cat growing up together, playing or cuddling."
        }


    User Input:
    {
        "theme": "${theme}"
    }
    `

    try{
        const promtResult = await model.generateContent(promptMain)
        
        const post_text = promtResult.response.text()
        
        const jsonResult = JSON.parse(post_text)

        const image = await generateImage(jsonResult.photo_description)

        return {
            post_text: jsonResult.post_text,
            photo_description: jsonResult.photo_description,
            image: image
        }
    }
    catch(err){
        console.error(err)
    }
}

export default generatePost;
