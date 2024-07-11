
# daily_login = [{:name => 'Angry', :color => 'G', :updated_at => '25-June-2024'},
#         {:name => 'Happy', :color => 'Yellow', :updated_at => '26-June-2024'},
#         {:name => 'Sad', :color => 'Blue', :updated_at => '27-June-2024'},
#           {:name => 'Bored', :color => 'Grey', :updated_at => '29-June-2024'},
#           {:name => 'Sad', :color => 'Blue', :updated_at => '30-June-2024'},
#           {:name => 'Excited', :color => 'Orange', :updated_at => '31-June-2024'},
#           {:name => 'Meh', :color => 'Light_Gray', :updated_at => '01-July-2024'},
#           {:name => 'Happy', :color => 'Yellow', :updated_at => '03-July-2024'},

# #ABOVE NEEDS TO HAVE MORE ATTRIBUTES, HEXCODE, USERID, ETC.

#      ]

# daily_login.each do |mood|
#   Mood.create!(mood)
# end

# standard_moods = [
#   { name: 'Excited', color: 'Neon green', hexcode: '#39FF14' },
#   { name: 'Very happy', color: 'Yellow', hexcode: '#FFFF00' },
#   { name: 'Meh', color: 'Bright blue', hexcode: '#007FFF' },
#   { name: 'Tired', color: 'Black', hexcode: '#000000' },
#   { name: 'Content', color: 'Brown', hexcode: '#964B00' },
#   { name: 'Angry', color: 'Red', hexcode: '#FF0000' },
#   { name: 'Happy', color: 'Lime green', hexcode: '#32CD32' },
#   { name: 'In love', color: 'Pink', hexcode: '#FFC0CB' },
#   { name: 'Unhappy', color: 'Navy blue', hexcode: '#000080' },
#   { name: 'Teary', color: 'Light purple', hexcode: '#E6E6FA' },
#   { name: 'Upset', color: 'Dark blue', hexcode: '#00008B' },
#   { name: 'Confused', color: 'Gray', hexcode: '#808080' },
# ]

# standard_moods.each do |mood_attributes|
#   Mood.find_or_create_by!(mood_attributes)
# end

# seed users every fresh pull

# User.find_each do |user|
#   Mood.all.each do |mood|
#     mood.user_id = user.id
#     user.moods << mood unless user.moods.include?(mood)
#   end
# end


require 'date'

def random_date
  seconds = 365*24*60*60
  random_seconds = rand(seconds)
  random_date = Time.now - random_seconds
  iso_date = random_date.iso8601
  iso_date
end

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

User.create([
  {id: 1, dateLastLoggedIn: Date.today,
  email: "test_user@example.com",
  password: "password", # Devise will handle the encryption
  password_confirmation: "password"},

])

User.create({id: 3, dateLastLoggedIn: Date.today,
email: "alice@example.com",
password: "password", # Devise will handle the encryption
password_confirmation: "password"})


User.create({id: 2, dateLastLoggedIn: Date.today,
email: "bob@example.com",
password: "password", # Devise will handle the encryption
password_confirmation: "password"})

Mood.create!(
  {name: "ychjk", color: "gfcbjn", hexcode: "#cgvhbjn", user_id: 2},
)

# Flower.create!(
#   { color: "Red", mood: "Happy", date_created: Date.today, user_id: 2, day: 1 },
# )

Mood.create!(
  {name: "ychjk", color: "gfcbjn", hexcode: "#cgvhbjn", user_id: 3},
)

# Flower.create!(
#   # { color: "Red", mood: "Happy", date_created: Date.today, user_id: 3, day: 1 },
# )

Flower.create!([
  { color: "Red", mood: "Happy", date_created: random_date, user_id: 3},
  { color: "Yellow", mood: "Happy", date_created: random_date, user_id: 3 },
  { color: "Blue", mood: "Sad", date_created: random_date, user_id: 3 },
  { color: "Neon Green", mood: "Excited", date_created: random_date, user_id: 3 },
  { color: "Blue", mood: "Sad", date_created: random_date, user_id: 3 },
  { color: "Pink", mood: "In love", date_created: random_date, user_id: 3 },
  { color: "Yellow", mood: "Happy", date_created: random_date, user_id: 3 },
  { color: "Blue", mood: "Sad", date_created: random_date, user_id: 3 },
  { color: "Neon Green", mood: "Excited", date_created: random_date, user_id: 3 },
  { color: "Blue", mood: "Sad", date_created: random_date, user_id: 3 },
  { color: "Pink", mood: "In love", date_created: random_date, user_id: 3 }
])

Flower.create!([
  { color: "Red", mood: "Happy", date_created: random_date, user_id: 2},
  { color: "Yellow", mood: "Happy", date_created: random_date, user_id: 2 },
  { color: "Blue", mood: "Sad", date_created: random_date, user_id: 2 },
  { color: "Neon Green", mood: "Excited", date_created: random_date, user_id: 2 },
  { color: "Blue", mood: "Sad", date_created: random_date, user_id: 2 },
  { color: "Pink", mood: "In love", date_created: random_date, user_id: 2 },
  { color: "Yellow", mood: "Happy", date_created: random_date, user_id: 2 },
  { color: "Blue", mood: "Sad", date_created: random_date, user_id: 2 },
  { color: "Neon Green", mood: "Excited", date_created: random_date, user_id: 2 },
  { color: "Blue", mood: "Sad", date_created: random_date, user_id: 2 },
  { color: "Pink", mood: "In love", date_created: random_date, user_id: 2 }
])




# Flower.create!({
#   mood: "Happy",
#   color: "Yellow",
#   date_created: random_date,
#   user: @user,
#   user_id: 3
# })

# Flower.create!({
#   mood: "Sad",
#   color: "Blue",
#   date_created: random_date,
#   user: @user,
#   user_id: 3
# })

# Flower.create!({
#   mood: "Excited",
#   color: "Neon Green",
#   date_created: random_date,
#   user: @user,
#   user_id: 3
# })

# Flower.create!({
#   mood: "Sad",
#   color: "Blue",
#   date_created: random_date,
#   user: @user,
#   user_id: 3
# })

# Flower.create!({
#   mood: "In love",
#   color: "Pink",
#   date_created: random_date,
#   user: @user,
#   user_id: 3
# })

# standard_moods.each do |mood|
#     mood[:user] = @user
#     mood[:user_id] = 3
#     Mood.create!(mood)
# end

# Flower.create({
#   mood: "Happy",
#   color: "Yellow",
#   date_created: random_date,
#   user: @user,
#   user_id: 4
# })

# Flower.create({
#   mood: "Sad",
#   color: "Blue",
#   date_created: random_date,
#   user: @user,
#   user_id: 4
# })

# Flower.create({
#   mood: "Excited",
#   color: "Neon Green",
#   date_created: random_date,
#   user: @user,
#   user_id: 4
# })

# Flower.create({
#   mood: "Sad",
#   color: "Blue",
#   date_created: random_date,
#   user: @user,
#   user_id: 4
# })

# Flower.create({
#   mood: "In love",
#   color: "Pink",
#   date_created: random_date,
#   user: @user,
#   user_id: 4
# })


# standard_moods.each do |mood|
#   mood[:user] = @user
#   mood[:user_id] = 4
#   Mood.create!(mood)
# end


ArtPiece.create([
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
  {artID: 00005,
  artTitle: "Rain, Steam, and Speed",
  artist: "Joseph Mallord William Turner",
  dateYear: 1844,
  imageURL: "https://miro.medium.com/v2/resize:fit:786/format:webp/0*qEnR_kFsH5UpcWBT.jpg",
  audio:"https://www.youtube.com/watch?v=LQ3AC6CzlBA",
  captions: ""},
])
