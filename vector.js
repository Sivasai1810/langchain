import dotenv from 'dotenv'
dotenv.config();
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
    const model = new ChatGroq({
  model: "llama-3.3-70b-versatile", // Changed to a valid Groq model
  apiKey: process.env.GROQ_API_KEY,
  temperature: 0.3
});

const prompt = ChatPromptTemplate.fromTemplate(`
Answer the user query using the provided context.
If the answer is not in the context, say "I don't know."
context: {context}
Question: {input}
`);
const loader=new CheerioWebBaseLoader(
"https://js.langchain.com/docs/concepts/text_splitters/"
)
const docs=await loader.load();
const chain=await createStuffDocumentsChain({
  llm:model,
  prompt:prompt
})
// const splitter=new CharacterTextSplitter({
//   chunkSize:500,
//   chunkOverlap:10,
// })
// const texts= await splitter.splitDocuments(docs);
const splitter=new RecursiveCharacterTextSplitter({
  chunkSize:700,
  chunkOverlap:20,
})
const texts=await splitter.splitDocuments(docs);
const embeddings=new HuggingFaceInferenceEmbeddings({
  apiKey:process.env.HF_API_KEY,
  model: "sentence-transformers/all-MiniLM-L6-v2",
    provider: "hf-inference"
})
  const vectorstore=await MemoryVectorStore.fromDocuments(texts,embeddings);
  const retrieval=vectorstore.asRetriever(2);
const query="who is ambhani"
const relevantDocs=await retrieval.getRelevantDocuments(query);
const response=await chain.invoke({
  input:query,
    documents: relevantDocs,
})

 console.log(response);
console.log(docs[0].pageContent.length);
console.log(texts.length);
console.log(texts[0].pageContent.length)
console.log(texts[1].pageContent.length)
console.log(texts[2].pageContent.length)
console.log(texts[24].pageContent.length)




