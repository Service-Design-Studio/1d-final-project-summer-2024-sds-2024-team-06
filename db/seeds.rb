
# # daily_login = [{:name => 'Angry', :color => 'G', :updated_at => '25-June-2024'},
# #         {:name => 'Happy', :color => 'Yellow', :updated_at => '26-June-2024'},
# #         {:name => 'Sad', :color => 'Blue', :updated_at => '27-June-2024'},
# #           {:name => 'Bored', :color => 'Grey', :updated_at => '29-June-2024'},
# #           {:name => 'Sad', :color => 'Blue', :updated_at => '30-June-2024'},
# #           {:name => 'Excited', :color => 'Orange', :updated_at => '31-June-2024'},
# #           {:name => 'Meh', :color => 'Light_Gray', :updated_at => '01-July-2024'},
# #           {:name => 'Happy', :color => 'Yellow', :updated_at => '03-July-2024'},

# # #ABOVE NEEDS TO HAVE MORE ATTRIBUTES, HEXCODE, USERID, ETC.

# #      ]

# # daily_login.each do |mood|
# #   Mood.create!(mood)
# # end

# # standard_moods = [
# #   { name: 'Excited', color: 'Neon green', hexcode: '#39FF14' },
# #   { name: 'Very happy', color: 'Yellow', hexcode: '#FFFF00' },
# #   { name: 'Meh', color: 'Bright blue', hexcode: '#007FFF' },
# #   { name: 'Tired', color: 'Black', hexcode: '#000000' },
# #   { name: 'Content', color: 'Brown', hexcode: '#964B00' },
# #   { name: 'Angry', color: 'Red', hexcode: '#FF0000' },
# #   { name: 'Happy', color: 'Lime green', hexcode: '#32CD32' },
# #   { name: 'In love', color: 'Pink', hexcode: '#FFC0CB' },
# #   { name: 'Unhappy', color: 'Navy blue', hexcode: '#000080' },
# #   { name: 'Teary', color: 'Light purple', hexcode: '#E6E6FA' },
# #   { name: 'Upset', color: 'Dark blue', hexcode: '#00008B' },
# #   { name: 'Confused', color: 'Gray', hexcode: '#808080' },
# # ]

# # standard_moods.each do |mood_attributes|
# #   Mood.find_or_create_by!(mood_attributes)
# # end

# # seed users every fresh pull

# # User.find_each do |user|
# #   Mood.all.each do |mood|
# #     mood.user_id = user.id
# #     user.moods << mood unless user.moods.include?(mood)
# #   end
# # end

# User.create!(id: 1,
#   dateLastLoggedIn: Date.today,
#   email: "test_user@example.com",
#   password: "password", # Devise will handle the encryption
#   password_confirmation: "password"
# )

# User.create!( id: 2,
#   dateLastLoggedIn: Date.today,
#   email: "bob@example.com",
#   password: "password", # Devise will handle the encryption
#   password_confirmation: "password"
# )

# User.create!( id: 3,
#   dateLastLoggedIn: Date.today,
#   email: "alice@example.com",
#   password: "password", # Devise will handle the encryption
#   password_confirmation: "password"
# )

# ArtPiece.create!([
#   {artID: 00001,
#   artTitle: "The Face of Mediation",
#   artist: "Abdul Ghani Hamid",
#   dateYear: 1975,
#   imageURL: "https://www.nationalgallery.sg/sites/default/files/P-0233_Abd-Ghani-Hamid.jpg",
#   audio:"https://www.youtube.com/watch?v=ZKiXa4kI7ns",
#   captions: ""},

#   {artID: 00002,
#   artTitle: "Age of Full Bloom",
#   artist: "San Min",
#   dateYear: 1975,
#   imageURL: "https://www.nationalgallery.sg/sites/default/files/blog/San%20Minn-Age%20of%20Full%20Bloom_o4.jpg",
#   audio:"https://www.youtube.com/watch?v=q84AzQy-spw",
#   captions: ""},
#   {artID: 00002,
#   artTitle: "Age of Full Bloom",
#   artist: "San Min",
#   dateYear: 1975,
#   imageURL: "https://www.nationalgallery.sg/sites/default/files/blog/San%20Minn-Age%20of%20Full%20Bloom_o4.jpg",
#   audio:"https://www.youtube.com/watch?v=q84AzQy-spw",
#   captions: ""},

#   {artID: 00003,
#   artTitle: "Irrawaddy",
#   artist: "Kim Lim",
#   dateYear: 1979,
#   imageURL: "https://www.roots.gov.sg/-/media/Roots/60-objects/112-irrawaddy.ashx",
#   audio:"https://www.youtube.com/watch?v=7GYc_pj583M&t=2s",
#   captions: ""},
#   {artID: 00003,
#   artTitle: "Irrawaddy",
#   artist: "Kim Lim",
#   dateYear: 1979,
#   imageURL: "https://www.roots.gov.sg/-/media/Roots/60-objects/112-irrawaddy.ashx",
#   audio:"https://www.youtube.com/watch?v=7GYc_pj583M&t=2s",
#   captions: ""},

#   {artID: 00004,
#   artTitle: "Wanderer above the Sea of Fog",
#   artist: "Caspar David Friedrich",
#   dateYear: 1818,
#   imageURL: "https://www.thehistoryofart.org/caspar-david-friedrich/Wanderer%20above%20the%20Sea%20of%20Fog%20Caspar%20David%20Friedrich.jpg?ezimgfmt=rs:400x512/rscb16/ngcb15/notWebP",
#   audio:"https://www.youtube.com/watch?v=42CPOtE8pGU",
#   captions: ""},
#   {artID: 00004,
#   artTitle: "Wanderer above the Sea of Fog",
#   artist: "Caspar David Friedrich",
#   dateYear: 1818,
#   imageURL: "https://www.thehistoryofart.org/caspar-david-friedrich/Wanderer%20above%20the%20Sea%20of%20Fog%20Caspar%20David%20Friedrich.jpg?ezimgfmt=rs:400x512/rscb16/ngcb15/notWebP",
#   audio:"https://www.youtube.com/watch?v=42CPOtE8pGU",
#   captions: ""},

#   {artID: 00005,
#   artTitle: "Rain, Steam, and Speed",
#   artist: "Joseph Mallord William Turner",
#   dateYear: 1844,
#   imageURL: "https://miro.medium.com/v2/resize:fit:786/format:webp/0*qEnR_kFsH5UpcWBT.jpg",
#   audio:"https://www.youtube.com/watch?v=LQ3AC6CzlBA",
#   captions: ""},
# ])



# Create 3 Journal entries
3.times do |i|
  Journal.create!(
    user_id: 3,
    journal_title: "Journal Title #{i + 1}",
    journalentry: "This is the content of journal entry #{i + 1}.",
    tip_title: "Tip Title #{i + 1}",
    tip_body: "This is the body of tip #{i + 1}.",
    date_created: Date.today - i.days
  )
end

# Create 3 GoalJournal entries
3.times do |i|
  GoalJournal.create!(
    user_id: 3,
    journal_title: "Goal Journal Title #{i + 1}",
    journal_start: "This is the start of goal journal entry #{i + 1}.",
    journal_end: "This is the end of goal journal entry #{i + 1}.",
    journal_third: "This is the third part of goal journal entry #{i + 1}.",
    date_created: Date.today - i.days
  )
end