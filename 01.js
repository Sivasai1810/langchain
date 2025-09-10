import { ChatGroq } from "@langchain/groq";
import { CommaSeparatedListOutputParser, StringOutputParser, StructuredOutputParser } from "@langchain/core/output_parsers";
import zod from 'zod';
import dotenv from 'dotenv'
dotenv.config();
import {ChatPromptTemplate}from '@langchain/core/prompts'
 async function models(){
    const detials=new ChatGroq({
        model:"openai/gpt-oss-120b",
        apiKey:process.env.GROQ_API_KEY,
        temperature:0.7
    })
return detials
}
 async function prompts(){
    // const promptmodel=ChatPromptTemplate.fromTemplate(`generate a joke on user input {word}`)
    //    const promptmodel=ChatPromptTemplate.fromMessages([
    //     ["system","Generate a joke based on a word provided by human "],
    //     ["human","{word}"]
    //    ])
    // const promptmodel=ChatPromptTemplate.fromTemplate(`
    //     generate a 5 synonyms of the following {word}`)
    const promptmodel=ChatPromptTemplate.fromTemplate(`
        extract the emails and subjects and bodysfrom {userpromt}
        formatting instruction:{formatting_instruction}
         `)
return promptmodel
}
const model= await models()
const prompt= await prompts()
// for clean single string output
//  const parser=new StringOutputParser();
// if the output contains array in structed output in the structuredoutputparser use the zod
//  const parser=new CommaSeparatedListOutputParser();
// const parser=StructuredOutputParser.fromNamesAndDescriptions({
//     email:"the recipent email from the user",
//     subject:"subject of the recipent from the user",
//     body:"recipent body from the user"
// })
// if the user want to send muitiple emails to different users
const parser=StructuredOutputParser.fromZodSchema(
    zod.object({
        email:zod.array(zod.string()).describe("recipent emails"),
        subject:zod.array(zod.string()).describe("recipent subjects"),
        body:zod.array(zod.string()).describe("recipent bodys")
    })
)
 const chain=prompt.pipe(model).pipe(parser)
const response=await chain.invoke({
   userpromt:`i want to send a email to person1@gmail.com  and person2@gmail.com  and person3@gmail.com  
    subject of first recipent is project1 submission subject of first recipent is project2 submission subject of first recipent is project3 submission
    body of first recipent is project1 deadline and body of second recipent is project2 deadline and body of third recipent is project3 deadline`,
   formatting_instruction:parser.getFormatInstructions()
})
console.log(response)