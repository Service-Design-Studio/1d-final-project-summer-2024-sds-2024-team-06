FactoryBot.define do
  factory :gallery_journal do
    journal_title { "MyString" }
    journal_entry { "MyText" }
    tip_title { "MyString" }
    tip_body { "MyText" }
    imageURL { "MyString" }
    date_created { "2024-07-25" }
  end
end
