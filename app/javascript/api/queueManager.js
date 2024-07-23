const async = require('async');
const { generateTip, guideMe } = require('./gemini');

// Create a queue with a concurrency of 1
const queue = async.queue(async (task, callback) => {
  try {
    const result = await task.fn(task.inputText);
    if (result && result.response) {
      console.log(`${task.type} Result:`, result.response);
      callback(null, result.response); // Signal task completion
    } else {
      console.error('Response is undefined or does not contain the response property');
      callback(null, null); // Signal task completion with null result
    }
  } catch (error) {
    console.error('Error processing task:', error);
    callback(error); // Signal task completion with error
  }
}, 1);


// Function to enqueue tasks for guideMe
function enqueueGuideMe(inputText) {
  queue.push({ type: 'guideMe', fn: guideMe, inputText });
}

// Function to enqueue tasks for generateTip
function enqueueGenerateTip(inputText) {
  queue.push({ type: 'generateTip', fn: generateTip, inputText });
}

// Export the enqueue functions
module.exports = {
  enqueueGuideMe,
  enqueueGenerateTip,
};

