require 'capybara/cucumber'

When('I click the EchoesWithin button') do
  find_button('echoesWithin').click

end

Then('I should be redirected to the EchoesWithin page') do
  expect(page).to have_current_path('/echoes-within')
end

Then('I will hear an audio prompt begin to play') do ##and?
  # Code to verify that an audio prompt begins to play
  # This might require JavaScript execution or checking for an audio element
  # expect(page).to have_selector('audio')
  is_speaking = page.evaluate_script('window.speechSynthesis.speaking')
  expect(is_speaking).to be true
end

Given('I am on the EchoesWithin page') do
  visit '/echoes-within'
end

When('I draw on the canvas') do
  # Code to simulate drawing on the canvas
  # This might require JavaScript execution to simulate drawing
  # page.execute_script("simulateDrawingOnCanvas()")
end

Then('I should see my brushstroke applied onto the background image') do
  # Code to verify that the brushstroke is applied to the background image
  # expect(page).to have_selector('canvas.brushstroke-applied')
end

When('I require guidance and click the next prompt arrow') do
  find_button('nextPrompt').click
end

Then('the next audio prompt will play') do
  # Code to verify that the next audio prompt plays
  # expect(page).to have_selector('audio')

  is_speaking = page.evaluate_script('window.speechSynthesis.speaking')
  expect(is_speaking).to be true

end

Given('I have completed my Drawing') do
  # Code to ensure the drawing is completed
  # page.execute_script("completeDrawing()")
end

When('I click Publish to journal') do
  find_button('#publish').click
end

Then('a pop-up will appear asking the user to caption their work') do
  expect(page).to have_selector('.popup', text: 'caption your work')
end

Then('the user will be redirected to the journalentrieshistory page') do
  expect(page).to have_current_path('/journalentrieshistory')
end #And?

When('I click the exit cross button at the top of the screen') do
  find('.exit-cross-button').click
end

Then('a pop-up will appear ensuring the user wants to leave') do
  expect(page).to have_selector('.pop-up-confirmation')
end
