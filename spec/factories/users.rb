# spec/factories/users.rb
FactoryBot.define do
    factory :user do
      email { "guest@example.com" }
      password { "password" }
    end
end
  