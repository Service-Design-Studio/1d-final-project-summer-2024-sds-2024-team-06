# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Example:

#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# ArtPiece.create(id: 1, artID: 12345, captions: "test123", artTitle: "jonas handsome face", image_url: "https://www.nationalgallery.sg/sites/default/files/P-0233_Abd-Ghani-Hamid.jpg", artvoice:"https://storage.googleapis.com/art_storage/Slow%20Art%20Guide%20for%20%F0%9D%98%88%F0%9D%98%A8%F0%9D%98%A6%20%F0%9D%98%B0%F0%9D%98%A7%20%F0%9D%98%8D%F0%9D%98%B6%F0%9D%98%AD%F0%9D%98%AD%20%F0%9D%98%89%F0%9D%98%AD%F0%9D%98%B0%F0%9D%98%B0%F0%9D%98%AE%20by%20San%20Minn.mp3")
# ArtPiece.create(id: 2, artID: 02, captions: "actuallyartmeditation", artTitle: "Age of Full Bloom", image_url: "https://www.nationalgallery.sg/sites/default/files/blog/San%20Minn-Age%20of%20Full%20Bloom_o4.jpg", artvoice:"https://storage.googleapis.com/art_storage/Slow%20Art%20Guide%20for%20%F0%9D%98%88%F0%9D%98%A8%F0%9D%98%A6%20%F0%9D%98%B0%F0%9D%98%A7%20%F0%9D%98%8D%F0%9D%98%B6%F0%9D%98%AD%F0%9D%98%AD%20%F0%9D%98%89%F0%9D%98%AD%F0%9D%98%B0%F0%9D%98%B0%F0%9D%98%AE%20by%20San%20Minn.mp3")
# ArtPiece.create(id: 3, artID: 03, captions: "some other picture",
# artTitle: "The Golden Path",
# image_url: "https://i.pinimg.com/564x/4b/05/0c/4b050ca4fcf588eedc58aa6135f5eecf.jpg",
# artvoice:"https://storage.googleapis.com/art_storage/Slow%20Art%20Guide%20for%20%F0%9D%98%88%F0%9D%98%A8%F0%9D%98%A6%20%F0%9D%98%B0%F0%9D%98%A7%20%F0%9D%98%8D%F0%9D%98%B6%F0%9D%98%AD%F0%9D%98%AD%20%F0%9D%98%89%F0%9D%98%AD%F0%9D%98%B0%F0%9D%98%B0%F0%9D%98%AE%20by%20San%20Minn.mp3")
# ArtPiece.create(id: 4, artID: 04, captions: "some other picture",
# artTitle: "The Road Path",
# image_url: "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg",
# artvoice:"https://storage.googleapis.com/art_storage/Slow%20Art%20Guide%20for%20%F0%9D%98%88%F0%9D%98%A8%F0%9D%98%A6%20%F0%9D%98%B0%F0%9D%98%A7%20%F0%9D%98%8D%F0%9D%98%B6%F0%9D%98%AD%F0%9D%98%AD%20%F0%9D%98%89%F0%9D%98%AD%F0%9D%98%B0%F0%9D%98%B0%F0%9D%98%AE%20by%20San%20Minn.mp3")
# ArtPiece.create(id: 5, artID: 05, captions: "some other picture",
# artTitle: "The Lighthouse",
# image_url: "https://preview.redd.it/9eqy5o91stf61.jpg?width=1080&crop=smart&auto=webp&s=54304c0307dcd6a7b057b30acde77ad2fa478bd3",
# artvoice:"https://storage.googleapis.com/art_storage/Slow%20Art%20Guide%20for%20%F0%9D%98%88%F0%9D%98%A8%F0%9D%98%A6%20%F0%9D%98%B0%F0%9D%98%A7%20%F0%9D%98%8D%F0%9D%98%B6%F0%9D%98%AD%F0%9D%98%AD%20%F0%9D%98%89%F0%9D%98%AD%F0%9D%98%B0%F0%9D%98%B0%F0%9D%98%AE%20by%20San%20Minn.mp3")


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

User.create!(
  dateLastLoggedIn: Date.today,
  email: "test_user@example.com",
  password: "password", # Devise will handle the encryption
  password_confirmation: "password"
)

User.create!(
  dateLastLoggedIn: Date.today,
  email: "bob@example.com",
  password: "password", # Devise will handle the encryption
  password_confirmation: "password"
)

User.create!(
  dateLastLoggedIn: Date.today,
  email: "alice@example.com",
  password: "password", # Devise will handle the encryption
  password_confirmation: "password"
)

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

  {artID: 00005,
  artTitle: "Rain, Steam, and Speed",
  artist: "Joseph Mallord William Turner",
  dateYear: 1844,
  imageURL: "https://miro.medium.com/v2/resize:fit:786/format:webp/0*qEnR_kFsH5UpcWBT.jpg",
  audio:"https://www.youtube.com/watch?v=LQ3AC6CzlBA",
  captions: ""},
])
