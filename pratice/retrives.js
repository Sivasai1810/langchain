import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";
import {StructuredOutputParser} from '@langchain/core/output_parsers'
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter, TokenTextSplitter } from "langchain/text_splitter";
import dotenv from "dotenv";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio"
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf"

dotenv.config();
try{
  const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY,
    temperature: 0.3,
  })
const prompt =ChatPromptTemplate.fromTemplate(
`answer of the question  should be based on the context if the not there print not avaiable
 context:{context} 
 question:{input}`

)
const chain=await createStuffDocumentsChain({
    llm:model,
    prompt:prompt
})
// const documentA=new  Document({
//   pageContent:"his name is swmay siva sai and his from nit india"
// })
// FOR THE SINGLE DOCUMENT QUERY WE NEED TO USE THE INVOKE BASIC SYNTAX FOR const chain =prompt.pipe(model)
// const response=await chain.invoke({
//     context:documentA,
//     input:"what is his age"
// })
// FOR MULTIPLE
// const documents=[
//     new Document({pageContent:"his name is swmay siva sai and his from nit india"}),
//     new Document({pageContent:"his age is 33"}),
// ]
// const response=await chain.invoke({
//     context:documents,
//  OR
// CREATE TWO DOCUMENTS context:[documentA,documentB]
//     input:"what is his wife "
// })

// QUERY RESPONSE FORM THE WEBSITE LOAD
const loader=new  CheerioWebBaseLoader(
 "https://python.langchain.com/docs/concepts/lcel/"
)
const doc=await loader.load();
const splitter= new RecursiveCharacterTextSplitter({
    chunkSize:500,
    chunkOverlap:50
})
const splitdocs=await splitter.splitDocuments(doc)
const splitpagecontent=splitdocs.map(doc=>doc.pageContent);
const embeddings=new HuggingFaceInferenceEmbeddings({
    model:"sentence-transformers/paraphrase-MiniLM-L3-v2",
     task: "feature-extraction",
     apiKey:process.env.HF_API_KEY
})


// const vectors=await embeddings.embedDocuments(splitpagecontent)
// console.log(vectors.length)
// console.log(splitdocs.length)
// console.log(splitdocs[0].pageContent.length);
// console.log(splitdocs[8].pageContent.length);
// const response=await chain.invoke({
//     context:doc,
//     input:"what us modi"
// })
// console.log(response);
}catch(err){
    console.log(err);
}