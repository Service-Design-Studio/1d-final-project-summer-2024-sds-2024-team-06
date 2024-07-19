// geminiClient.js

// Define the Gemini API endpoint and your API key
const API_URL = '/api/generated'; // Replace with the actual endpoint if different
const API_KEY = 'AIzaSyAH3YXSUGpEAiSQncfZAEIyfwTAQEOdLAM'; // Replace with your actual API key

// Function to call the Gemini API
const callGeminiAPI = async (prompt) => {
    console.log("called")
  try {
    // Prepare the request options
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    });

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the JSON response
    const data = await response.json();

    // Output the response data as JSON
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
};


