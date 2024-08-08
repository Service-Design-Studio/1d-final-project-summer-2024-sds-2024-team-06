require 'capybara/cucumber'

When('I click the EchoesWithin button') do
  find_button('echoesWithin').click

end

Then('I should be redirected to the EchoesWithin page') do
  expect(page).to have_current_path('/echoes-within')
end

Then('I will hear an audio prompt begin to play') do ##and?
  is_speaking = page.evaluate_script('window.speechSynthesis.speaking')
  expect(is_speaking).to be true
end

When('I click the "Publish" button') do
  click_on 'Publish'
end

Given('I am on the EchoesWithin page') do
  visit '/echoes-within'
end

When('I draw on the canvas') do
  canvas = find('#react-sketch-canvas')
  canvas_width = page.evaluate_script("document.getElementById('react-sketch-canvas').offsetWidth").to_i
  canvas_height = page.evaluate_script("document.getElementById('react-sketch-canvas').offsetHeight").to_i
  find('#brush').click
  
  canvas.hover
  canvas.click

  find("#eraser").click
  canvas.hover
  canvas.click
end

Then('I should see my brushstroke applied onto the background image') do
  expect(page).to have_css('#react-sketch-canvas')
end

When('I require guidance and click the next prompt arrow') do
  find_button('nextPrompt').click
end

Then('the next audio prompt will play') do
  is_speaking = page.evaluate_script('window.speechSynthesis.speaking')
  expect(is_speaking).to be true
end

Given('I have completed my Drawing') do
  visit '/echoes-within'
end

And('I filled in a caption') do
  step 'I click "Publish to journal"'
  find("input[placeholder=\"Time you enjoy wasting is not wasted time...\"]").set('I feel happy')
end

Then('I will redirected to the journal entry page') do
  sleep 3
  user = User.find_by('email': 'bob@example.com')
  latest_echoes_journal = user.echoes_journals.last
  expect(page).to have_current_path("/journal/#{latest_echoes_journal.id}?type=echo")
  expect(page).to have_content(latest_echoes_journal.journal_title)
end

And('a pop-up will appear saying Drawing saved') do
  sleep 2
  expect(page).to have_text('Drawing saved!')
end

When('I click "Publish to journal"') do
  find('#publish').click
end

Then('a pop-up will appear asking the user to caption their work') do
  expect(page).to have_text("Write a caption for your drawing")
end

When('I click the exit cross button at the top of the screen') do
  find('#close').click
end

Then('a pop-up will appear ensuring the user wants to leave') do
  expect(page).to have_text("Are you leaving?")
end
