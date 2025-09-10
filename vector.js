import dotenv from 'dotenv'
dotenv.config();
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

    const model = new ChatGroq({
  model: "openai/gpt-oss-120b", // Changed to a valid Groq model
  apiKey: process.env.GROQ_API_KEY,
  temperature: 0.3
});
const prompt = ChatPromptTemplate.fromTemplate(`
Answer the user query using the provided context.
context: {context}
Question: {input}
`);
const loader=new CheerioWebBaseLoader()