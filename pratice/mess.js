import dotenv from 'dotenv'
dotenv.config();
import { ChatGroq } from "@langchain/groq";
import readline from "readline";
const r1=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
async function chatbot(text){
  const model=new ChatGroq({
    model:"openai/gpt-oss-120b",
    apiKey:process.env.GROQ_API_KEY,
     temperature:0.3
  })

const response=await model.stream(text);
for await (const chunk of response){
process.stdout.write(chunk.content ?? " ");
}
console.log()
}

async function getprompt() {
    r1.question("Enter you query   ",(input)=>{
        if(input.toUpperCase()=='EXIT'){
            r1.close();
        }
        else{
            chatbot(input).then(()=>getprompt());
        }
    })
}
getprompt();
