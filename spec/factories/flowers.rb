# spec/factories/flowers.rb
FactoryBot.define do
    factory :flower do
      mood { "happy" }
      color { "yellow" }
      date_created { "2024-07-12" }
      association :user  # Assuming Flower belongs to a user
    end
  end
  