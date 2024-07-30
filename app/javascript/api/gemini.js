const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI("AIzaSyAH3YXSUGpEAiSQncfZAEIyfwTAQEOdLAM"); // Use environment variable for API key

async function generateTip(input_text) {
  try {
    // Initialize the model
    let model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      systemInstruction: "As a mindfulness Advisor for Adolescents, provide a tip based on their journal writings. The tips should be positive and encouraging. The output must be in JSON, consisting of a concise title that summarizes the tip and description of the tip. If input lacks specific information, provide a general tip using a random theme from mindfulness practices, self-care strategies, emotional awareness, resilience building, or fostering positive relationships. There should not be any reference to any chat history.Helplines shoud be in singapore context.The tips should just not contain any questions."
    });

    // Define the generation configuration
    const generationConfig = {
      temperature: 0.9,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
        },
        required: ["title", "description"],
      }
    };

    // Generate content
    let result = await model.generateContent(input_text, generationConfig);
    result = result.response.text().replace("```json\n", "").replace("\n```", "");
    result = JSON.parse(result)
    // Adds new line & parses it as json
    //result = JSON.parse(result).description.replace(/([.!?])/g, '$1\n')
    console.log(result)
    return result;

  } catch (error) { 
    console.error('Error generating content:', error);
    return error;
  }
}

async function guideMe(input_text) {
    try {
      // Initialize the model
      let model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
        systemInstruction: "As a Journaling Guide for Adolescents, support the journaling process by asking insightful and reflective questions to encourage self-exploration and deeper understanding. If there is insufficent information based on the input, response with questions to get the adolsecents started in an encouraging tone. Avoid giving solutions, advice, or therapeutic interventions. If dangerous thoughts are suggested, acknowledge the concern empathetically, encourage reflective questions, and gently suggest seeking support from trusted adults or mental health professionals(Helplines shoud be in singapore context.). Ensure that responses are sensitive and do not exacerbate distress. Output responses in JSON format, and avoid referencing chat history.Helplines shoud be in singapore context."
      });
  
      // Define the generation configuration
      const generationConfig = {
        temperature: 0.2,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            response: { type: "string" },
          },
          required: ["response"],
        }
      };
  
      // Generate content
      let result = await model.generateContent(input_text, generationConfig);
      result = result.response.text().replace("```json\n", "").replace("\n```", "");
      console.log(result);
      return JSON.parse(result);
  
    } catch (error) {
      console.error('Error generating content:', error);
      return error;
    }
  }
  


  async function galleryTip(input_text) {
    try {
      // Initialize the model
      let model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
        systemInstruction: "You are an expert art critic providing constructive and encouraging feedback on user-generated art descriptions. Focus on the user's observations, thoughts, and emotions. Avoid leading questions or requests for additional information. Maintain a supportive and informative tone throughout the interaction.Any provided helplines shoud be in singapore context. The output should be in JSON format. There should not be any reference to chat history."
      });
  
      // Define the generation configuration
      const generationConfig = {
        temperature: 0.7,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            response: { type: "string" },
          },
          required: ["response"],
        }
      };
  
      // Generate content
      let result = await model.generateContent(input_text, generationConfig);
      
      result = result.response.text().replace("```json\n", "").replace("\n```", "");
      return JSON.parse(result);
  
    } catch (error) {
      console.error('Error generating content:', error);
      return error;
    }
  }



  async function echoTip(input_text) {
    try {
      // Initialize the model
      let model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
        systemInstruction: "You are an art critic specializing in providing age-appropriate, constructive, and encouraging feedback to adolescents on their thoughts about their artwork. Analyze the text for depth, creativity, and coherence and offer direct suggestions for improvement without asking questions. Maintain a supportive and informative tone throughout the interaction. If the user's emotional state seems to be negatively impacted, provide relevant helplines specific to Singapore.Provide feedback in a single JSON object with a 'response' key containing the entire feedback.There should be no references to chat history."
      });
  
      // Define the generation configuration
      const generationConfig = {
        temperature: 0.7,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            response: { type: "string" },
          },
          required: ["response"],
        }
      };
  
      // Generate content
      let result = await model.generateContent(input_text, generationConfig);
      
      result = result.response.text().replace("```json\n", "").replace("\n```", "");
      console.log(JSON.parse(result))
      return JSON.parse(result);
  
    } catch (error) {
      console.error('Error generating content:', error);
      return error;
    }
  }



// Export both functions
module.exports = {
    generateTip,
    guideMe,
    galleryTip,
    echoTip
  };


// Call the function
//generateTip("i wonder what i can do later");
//guideMe("I felt a bit depressed, finding life meaningless I'm worried about recurring of illness")
//galleryTip("red dressfoldarmcross")
//echoTip("")
