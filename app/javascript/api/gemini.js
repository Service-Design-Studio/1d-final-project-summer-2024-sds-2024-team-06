
const { GoogleGenerativeAI, FunctionDeclarationSchemaType } = require('@google/generative-ai');


const genAI = new GoogleGenerativeAI("AIzaSyAH3YXSUGpEAiSQncfZAEIyfwTAQEOdLAM"); // Use environment variable for API key

async function generateTip(input_text) {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
        systemInstruction: "As a mindfulness Advisor for Adolescents, provide a tip based on their journal writings. The tips should be positive and encouraging. The output must be in JSON, consisting of a concise title that summarizes the tip and description of the tip. If input lacks specific information, provide a general tip using a random theme from mindfulness practices, self-care strategies, emotional awareness, resilience building, or fostering positive relationships. There should not be any reference to any chat history.",
      });

      const generationConfig = {
        temperature: 0.9,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
       
        responseSchema: {
            type: FunctionDeclarationSchemaType.ARRAY,
            items: {
              type: FunctionDeclarationSchemaType.OBJECT,
              properties: {
                title: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
                description: {
                    type: FunctionDeclarationSchemaType.STRING,
                  },
                number: {
                    type: FunctionDeclarationSchemaType.INTEGER,
                    },
              },
              required: ['title', 'description', 'number'],
            },
        },
        safetySettings: {
            
            explicitContentFilter: true,    // Enable explicit content filter
            
            hateSpeechFilter: true,         // Enable hate speech detection
           
            violenceHarmFilter: true,       // Enable violence and harm prevention
           
          }
        

      };
    
    // Define the prompt
    let prompt = input_text

    // Generate content
    let result = await model.generateContent(prompt);
    

    // Log the result

    console.log(result.response.text());
    
    }
    catch (error) {
    console.error('Error generating content:', error);
    }
  
}

// Call the function
generateTip("asfhkashfkka");

