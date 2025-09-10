import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
// Corrected import path below
import { Document } from "@langchain/core/documents";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGroq({
  model: "openai/gpt-oss-120b", // Changed to a valid Groq model
  apiKey: process.env.GROQ_API_KEY,
  temperature: 0.3
});

const prompt = ChatPromptTemplate.fromTemplate(`
Answer the user's question from the following context:
context:{context}
Question: {input}
`);

const documentA = new Document({
  pageContent: "his name is sivasai"
});

const chain = await createStuffDocumentsChain({ // createStuffDocumentsChain is async
  llm: model,
  prompt,
});

// Use .invoke() instead of the older .call()
const response = await chain.invoke({
  input: "who is he",
  context: [documentA] // Pass documents in the 'context' key
});

console.log(response);


