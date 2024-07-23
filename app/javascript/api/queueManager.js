const async = require('async');
const { generateTip, guideMe } = require('./gemini');

// Create a queue with a concurrency of 1
const queue = async.queue(async (task, callback) => {
  try {
    // Execute the task's function
    const result = await task.fn(task.inputText);
    console.log(`${task.type} Result:`, result);
    callback();
  } catch (error) {
    console.error('Error processing task:', error);
    callback(error);
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

