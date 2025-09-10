import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";
import {StructuredOutputParser} from '@langchain/core/output_parsers'
import zod from 'zod'
import dotenv from "dotenv";
dotenv.config();

async function stringoutput() {
  const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY,
    temperature: 0.7,
  });
//  const parser =StructuredOutputParser.fromNamesAndDescriptions
// ({
//   email:"recipent email",
//   subject:"recipent subject",
//   body:"recipent body"
//  })
const parser=StructuredOutputParser.fromZodSchema(
  zod.object({
recipe:zod.string().describe("recipe name"),
ingredients:zod.array(zod.string()).describe("recipe ingredients")
  })
)
  // Force JSON array output
    // Extract the email, subject, and body from this text:
  const prompt = ChatPromptTemplate.fromTemplate(`
     Extract the recipe name, and ingredients from this text:
    {userprompt}
    Return ONLY valid JSON.
    {format_instructions}
    `
  );

   const chain = prompt.pipe(model).pipe(parser)

  // return await chain.invoke({ userprompt: `i want to send a email to person1@gmail.com subject is project submission and rearding body is 
  //    deadline of project submission is tommorow`,
  //  format_instructions: parser.getFormatInstructions()
  // });

    return await chain.invoke({ userprompt: `the recipe is egg fry and ingredients are eggs,tomaotes,onion,salt`,
   format_instructions: parser.getFormatInstructions()
  });
  
  
}

(async () => {
  try {
    const output = await stringoutput();
// console.log(output.recipe);
// console.log(output.ingredients);
// console.log(output.body);
  } catch (err) {
    console.log("unable to get output", err);
  }
})();
