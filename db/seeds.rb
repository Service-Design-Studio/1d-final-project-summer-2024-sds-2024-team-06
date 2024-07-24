standard_moods = [
  { name: 'Excited', color: 'Neon green', hexcode: '#39FF14' },
  { name: 'Very happy', color: 'Yellow', hexcode: '#FFFF00' },
  { name: 'Meh', color: 'Bright blue', hexcode: '#007FFF' },
  { name: 'Tired', color: 'Black', hexcode: '#000000' },
  { name: 'Content', color: 'Brown', hexcode: '#964B00' },
  { name: 'Angry', color: 'Red', hexcode: '#FF0000' },
  { name: 'Happy', color: 'Lime green', hexcode: '#32CD32' },
  { name: 'In love', color: 'Pink', hexcode: '#FFC0CB' },
  { name: 'Unhappy', color: 'Navy blue', hexcode: '#000080' },
  { name: 'Teary', color: 'Light purple', hexcode: '#E6E6FA' },
  { name: 'Upset', color: 'Dark blue', hexcode: '#00008B' },
  { name: 'Confused', color: 'Gray', hexcode: '#808080' },
]

User.find_or_create_by(id: 1) do |user|
  user.dateLastLoggedIn = Date.today
  user.email = "test_user@example.com"
  user.password = "password" # Assuming Devise will handle the encryption
  user.password_confirmation = "password"
end

user = User.find_or_create_by(id: 2) do |user|
  user.dateLastLoggedIn = Date.today
  user.email = "bob@example.com"
  user.password = "password" # Assuming Devise will handle the encryption
  user.password_confirmation = "password"
end

User.find_or_create_by(id: 3) do |user|
  user.dateLastLoggedIn = Date.today
  user.email = "alice@example.com"
  user.password = "password" # Assuming Devise will handle the encryption
  user.password_confirmation = "password"
end

ArtPiece.create!([
  {artID: 00001,
  artTitle: "The Face of Mediation",
  artist: "Abdul Ghani Hamid",
  dateYear: 1975,
  imageURL: "https://www.nationalgallery.sg/sites/default/files/P-0233_Abd-Ghani-Hamid.jpg",
  audio:"https://www.youtube.com/watch?v=ZKiXa4kI7ns",
  captions: ""},

  {artID: 00002,
  artTitle: "Age of Full Bloom",
  artist: "San Min",
  dateYear: 1975,
  imageURL: "https://www.nationalgallery.sg/sites/default/files/blog/San%20Minn-Age%20of%20Full%20Bloom_o4.jpg",
  audio:"https://www.youtube.com/watch?v=q84AzQy-spw",
  captions: ""},
  {artID: 00002,
  artTitle: "Age of Full Bloom",
  artist: "San Min",
  dateYear: 1975,
  imageURL: "https://www.nationalgallery.sg/sites/default/files/blog/San%20Minn-Age%20of%20Full%20Bloom_o4.jpg",
  audio:"https://www.youtube.com/watch?v=q84AzQy-spw",
  captions: ""},

  {artID: 00003,
  artTitle: "Irrawaddy",
  artist: "Kim Lim",
  dateYear: 1979,
  imageURL: "https://www.roots.gov.sg/-/media/Roots/60-objects/112-irrawaddy.ashx",
  audio:"https://www.youtube.com/watch?v=7GYc_pj583M&t=2s",
  captions: ""},
  {artID: 00003,
  artTitle: "Irrawaddy",
  artist: "Kim Lim",
  dateYear: 1979,
  imageURL: "https://www.roots.gov.sg/-/media/Roots/60-objects/112-irrawaddy.ashx",
  audio:"https://www.youtube.com/watch?v=7GYc_pj583M&t=2s",
  captions: ""},

  {artID: 00004,
  artTitle: "Wanderer above the Sea of Fog",
  artist: "Caspar David Friedrich",
  dateYear: 1818,
  imageURL: "https://www.thehistoryofart.org/caspar-david-friedrich/Wanderer%20above%20the%20Sea%20of%20Fog%20Caspar%20David%20Friedrich.jpg?ezimgfmt=rs:400x512/rscb16/ngcb15/notWebP",
  audio:"https://www.youtube.com/watch?v=42CPOtE8pGU",
  captions: ""},
  {artID: 00004,
  artTitle: "Wanderer above the Sea of Fog",
  artist: "Caspar David Friedrich",
  dateYear: 1818,
  imageURL: "https://www.thehistoryofart.org/caspar-david-friedrich/Wanderer%20above%20the%20Sea%20of%20Fog%20Caspar%20David%20Friedrich.jpg?ezimgfmt=rs:400x512/rscb16/ngcb15/notWebP",
  audio:"https://www.youtube.com/watch?v=42CPOtE8pGU",
  captions: ""},

  {artID: 00005,
  artTitle: "Rain, Steam, and Speed",
  artist: "Joseph Mallord William Turner",
  dateYear: 1844,
  imageURL: "https://miro.medium.com/v2/resize:fit:786/format:webp/0*qEnR_kFsH5UpcWBT.jpg",
  audio:"https://www.youtube.com/watch?v=LQ3AC6CzlBA",
  captions: ""},
])

Journal.create!(
    user_id: user.id,
    journal_title: "Today my dog died",
    journalentry: "I am so depressed.",
    tip_title: "Process your emotions",
    tip_body: "Take the time to grieve the passing of your dog. It can be beneficial to process together with your loved ones that share good memories with your dog."
  )

Journal.create!(
  user_id: user.id,
  journal_title: "Today I got engaged!",
  journalentry: "I am so happy.",
  tip_title: "Congratulations!",
  tip_body: "Celebrate your engagement with your loved ones. It's a special moment that you'll remember for the rest of your life."
)

Journal.create!(
  user_id: user.id,
  journal_title: "Today I got fired!",
  journalentry: "I am so angry.",
  tip_title: "Sometimes things are out of our control!",
  tip_body: "Remember that you are more than just your job! Spend time with loved ones and friends, before resuming your job hunt."
)

GoalJournal.create!(
    user_id: user.id,
    journal_title: "Get better at guitar",
    journal_start: "I will start getting better at guitar by practicing 30 minutes a day.",
    journal_end: "I will stop doomscrolling tiktok",
    journal_third: "I will continue prioritising my tasks."
  )

GoalJournal.create!(
  user_id: user.id,
  journal_title: "Do better in school",
  journal_start: "I will start studying harder.",
  journal_end: "I will stop playing video games.",
  journal_third: "I will continue exercising."
)

GoalJournal.create!(
    user_id: user.id,
    journal_title: "Exercise more",
    journal_start: "I will start hitting the gym regularly",
    journal_end: "I will stop smoking cigarettes",
    journal_third: "I will continue eating well."
  )

# Create 3 Journal entries
# 3.times do |i|
#   Journal.create!(
#     user_id: user.id,
#     journal_title: "Journal Title #{i + 1}",
#     journalentry: "This is the content of journal entry #{i + 1}.",
#     tip_title: "Tip Title #{i + 1}",
#     tip_body: "This is the body of tip #{i + 1}."
#   )
# end

# # Create 3 GoalJournal entries
# 3.times do |i|
#   GoalJournal.create!(
#     user_id: user.id,
#     journal_title: "Goal Journal Title #{i + 1}",
#     journal_start: "This is the start of goal journal entry #{i + 1}.",
#     journal_end: "This is the end of goal journal entry #{i + 1}.",
#     journal_third: "This is the third part of goal journal entry #{i + 1}."
#   )
# end

standard_moods.each do |mood_attributes|
  mood = user.moods.find_or_initialize_by(name: mood_attributes[:name])
  if mood.new_record?
    mood.hexcode = mood_attributes[:hexcode]
    mood.color = mood_attributes[:color]
    if mood.save
      puts "Mood created: #{mood.name}"
    else
      puts "Failed to create mood: #{mood.errors.full_messages.join(", ")}"
    end
  end
end

def random_datetime
  start_date = Time.new(2024, 1, 1)
  end_date = Time.new(2024, 12, 31, 23, 59, 59)
  random_time = rand(start_date.to_f..end_date.to_f)
  Time.at(random_time)
end

flowers = [
  {color: "Blue", mood: "Sad", created_at: random_datetime()},
  {color: "Red", mood: "Happy", created_at: random_datetime()},
  {color: "Yellow", mood: "Excited", created_at: random_datetime()},
  {color: "Green", mood: "Happy", created_at: random_datetime()},
  {color: "Purple", mood: "Sad", created_at: random_datetime()},
  {color: "Orange", mood: "Excited", created_at: random_datetime()},
  {color: "Pink", mood: "Happy", created_at: random_datetime()},
  {color: "White", mood: "Happy", created_at: random_datetime()},
  {color: "Black", mood: "Sad", created_at: random_datetime()},
  {color: "Brown", mood: "Meh", created_at: random_datetime()}
]

flowers.each do |flower_attributes|
  user.flowers.find_or_create_by!(flower_attributes)
end