import { ChatGroq } from "@langchain/groq";
import {ChatPromptTemplate}from '@langchain/core/prompts'
import {StringOutputParser} from '@langchain/core/output_parsers'
import dotenv from 'dotenv'
try{
dotenv.config();
const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
  temperature:0.2
});

// const res = await model.batch(["write a poem on india! in 5 lines","what is the captial of india"]);
// for await (const chunk of res){
//     console.log(chunk.content);
// }
// console.log(res);
// res.forEach((r,i)=>{
//     console.log(r.content);
// })
 const prompt=ChatPromptTemplate.fromTemplate("convert user text into telugu {userinput}")
// const prompt=ChatPromptTemplate.fromMessages(
//   ["system",'convert user text into telugu'],
// ["human",'{userinput}'])
// console.log(await prompt.format({userinput:"cat"}))
const parser=new StringOutputParser()
const chain=prompt.pipe(model).pipe(parser);
const response= await chain.invoke({
    userinput:"hello"
})
console.log(response);

}catch(err){
    console.log("err",err)
}