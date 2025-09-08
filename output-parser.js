// import { ChatGroq } from "@langchain/groq";
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import {StringOutputParser,ListOutputParser} from '@langchain/core/output_parsers'
// import dotenv from "dotenv"
// dotenv.config()
// try{
//  async function stringoutput(){
//     const model=new ChatGroq({
//         model:"openai/gpt-oss-120b",
//      apiKey:process.env.GROQ_API_KEY,
//      temperature:0.7,
//     })
// const prompt=ChatPromptTemplate.fromTemplate("provide 5 synonyms seperated by commos for following word {userinput} as a json list")
// // const parser=new StringOutputParser()
// const parser=new ListOutputParser()
// const chain =prompt.pipe(model).pipe(parser)
// return await chain.invoke({
//     userinput:"cat"
// })

// }
// const output= await stringoutput()
// console.log(output);
// }
// catch(err){
//     console.log("unable to get output",err)
// }

import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";
import {} from '@langchain/output_parsers'
import dotenv from "dotenv";
dotenv.config();

async function stringoutput() {
  const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY,
    temperature: 0.7,
  });

  // Force JSON array output
  const prompt = ChatPromptTemplate.fromTemplate(
    "Provide 5 synonyms for the word '{userinput}' as a JSON list"
  );

  const parser = new CommaSeparatedListOutputParser();
  const chain = prompt.pipe(model).pipe(parser);

  return await chain.invoke({ userinput: "cat" });
}

(async () => {
  try {
    const output = await stringoutput();
    console.log(output);
  } catch (err) {
    console.log("unable to get output", err);
  }
})();
