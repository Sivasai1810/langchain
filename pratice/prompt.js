import dotenv from 'dotenv'
dotenv.config();
import { ChatGroq } from '@langchain/groq'
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from '@langchain/core/prompts'
try{
  const model=new ChatGroq({
    model:"openai/gpt-oss-120b",
    apiKey:process.env.GROQ_API_KEY,
     temperature:0.3
  })

// async function main() {
//   const template = ChatPromptTemplate.fromTemplate(
//     'explain the following term in simple word {topic}'
//   );

//   const messages = await template.formatMessages({ topic: "dog" });
//   console.log("Formatted messages:", messages);

//   const response = await model.call(messages);
//   console.log("AI response:", response.text);
// }

// main();
// async function chainfunciton(){
//     const template=ChatPromptTemplate.fromTemplate('explain the following term in simple words {topic}')
//  const chain=template.pipe(model);
//  const response=await chain.invoke({
//     topic:"dog"
//  })
//  console.log(response.content);
// }
// chainfunciton();

// async function frommessage(){
//     const template=ChatPromptTemplate.fromMessages([
//         SystemMessagePromptTemplate.fromTemplate("your are and assistant bot"),
//         HumanMessagePromptTemplate.fromTemplate(`explain the {topic} in simple terms `)
//     ])
// const message=await template.formatMessages({topic:"dot"})
// console.log(message)
// const response= await model.call(message)
// console.log(response.text);
// }
// frommessage();
// const prompt = ChatPromptTemplate.fromMessages([
// ]);
// async function frommessage(){
//     const template=ChatPromptTemplate.fromMessages([
//         // SystemMessagePromptTemplate.fromTemplate("your are and assistant bot"),
//         // HumanMessagePromptTemplate.fromTemplate(`explain the {topic} in simple terms `)
// //          [
// //     "system",
// //     "You are a talented chef.  Create a recipe based on a main ingredient provided by the user.",
// //   ],
// //   ["human", "{word}"],
//     ])
//     const chain = template.pipe(model);
// const response= await chain.invoke({
//     topic:"cat"
// })
// console.log(response.content);
// }
// frommessage();
}catch(err){
    console.log(err);
}