import dotenv from "dotenv"
dotenv.config();
import { HfInference } from "@huggingface/inference";
const embbedd=new HfInference(process.env.HF_API_KEY)
async function embeddings(text) {
    const response=await embbedd.featureExtraction({
        model:"sentence-transformers/paraphrase-MiniLM-L3-v2",
        inputs:text
    })
    console.log(response);
}
embeddings("hello world")