import dotenv from 'dotenv'
dotenv.config();
import { ChatGroq } from '@langchain/groq'
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from '@langchain/core/prompts'
import {StructuredOutputParser}from '@langchain/core/output_parsers'
import { CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";
import { StringOutputParser} from '@langchain/core/output_parsers';
try{
  const model=new ChatGroq({
    model:"openai/gpt-oss-120b",
    apiKey:process.env.GROQ_API_KEY,
     temperature:0.3
  })
async function stringoutput(){
const prompt=ChatPromptTemplate.fromTemplate('explain {topic} in simple terms');
const output=new StringOutputParser();
const chain = prompt.pipe(model).pipe(output);
const response=await chain.invoke({
topic:"cat"
})
console.log(response)
}
async function ccommaseparatedoutput(){
    const prompt=ChatPromptTemplate.fromMessages([
        'Provide 5 synonyms of {item}, seperated by comma'
    ])
    const output=new CommaSeparatedListOutputParser();
const chain = prompt.pipe(model).pipe(output);
const response=await chain.invoke({
item:"cat"
})
console.log(response)
// output [ 'feline', 'kitty', 'tom', 'moggy', 'puss' ]
}
async function fromnames(){
      const prompt=ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(`your an a assiantant  to the ai-email when user enter the prompt find the recient email and subject and message from the prompt`),
    HumanMessagePromptTemplate.fromTemplate(`Extract information from the following phrase.\n{format_instructions}\n{phrase}`)
    ])
    const output=StructuredOutputParser.fromNamesAndDescriptions({
        recipentemail:"recipentmemail",
        recipentsubject:"recipentsubject",
        recipentmessage:"recipent message"

    });
const chain = prompt.pipe(model).pipe(output);
const response=await chain.invoke({
phrase:"i want to send a email to the person@gmail.com and message is the project deadline and subject is there will a meeting tommorow on this project",
format_instructions:output.getFormatInstructions()
})
console.log(response)
}
// fromnames();

}catch(err){
    console.log(err);
}