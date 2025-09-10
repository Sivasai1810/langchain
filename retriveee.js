import { ChatGroq } from "@langchain/groq";
import dotenv from 'dotenv'
dotenv.config();
import {ChatPromptTemplate}from '@langchain/core/prompts'
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { Document } from "@langchain/core/documents";
import { HfInference } from "@huggingface/inference"
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import {RecursiveCharacterTextSplitter} from 'langchain/text_splitter'
import { createRetrievalChain } from "langchain/chains/retrieval";
// import { StructuredOutputParser} from "@langchain/core/output_parsers";
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
const hf = new HfInference(process.env.hf_API_KEY, { enableLogging: false   });
// const documentA=new Document({
//     // pageContent:'llk is nothing but a origanzation and its full-form large-level-karpur'
//     pageContent:'full-form of nnvk naveen narayana venkata kesave'
// })
const loader=new  CheerioWebBaseLoader(
    "https://python.langchain.com/docs/concepts/lcel/"
)
const docs=await loader.load()
const chain =await createStuffDocumentsChain({
    llm:model,
    prompt,
})

const cleanDocs = docs.map(doc => new Document({
  pageContent: doc.pageContent.replace(/<[^>]*>/g, ''), // remove HTML tags
  metadata: doc.metadata || {} // optional, but ensures no undefined errors
}));

const splitter=new RecursiveCharacterTextSplitter({
    chunkSize: 500,
  chunkOverlap: 50
})
const splitDocs = await splitter.splitDocuments(cleanDocs);
class HuggingFaceEmbeddings {
  async embedQuery(text) {
    const response = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text,
    });
    // response is a nested array, flatten it
    return response[0];
  }

  async embedDocuments(texts) {
    const vectors = [];
    for (const text of texts) {
      const vec = await this.embedQuery(text);
      vectors.push(vec);
    }
    return vectors;
  }
}

// Usage
const embeddings = new HuggingFaceEmbeddings();
const vectorstore=await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
)
const retriever=vectorstore.asRetriever({
    k:2
})
const retrievalchain=await createRetrievalChain({
    combineDocsChain:chain,
    retriever
})
// const relevantDocs = await retriever.getRelevantDocuments("What is LangChain?");
// console.log(relevantDocs);
const response=await retrievalchain.invoke({
    input:"what is langchain",
// context:docs
})
// console.log(splitDocs[0].pageContent.length);
// console.log(splitDocs[1].pageContent.length);
// console.log(splitDocs[3].pageContent.length);
// console.log(splitDocs[43].pageContent.length);
// console.log(splitDocs.length)
console.log(response.answer)