require 'rails_helper'

RSpec.describe User, type: :model do
    describe 'validations' do
      it 'is valid with valid attributes' do
        user = User.create(email: "new@example.com" , password: "password")
        expect(user).to be_valid
      end
  
      it 'is not valid without an email' do
        user = User.create(email: nil, password: "password")
        expect(user).to_not be_valid
      end
  
      it 'is not valid without a password' do
        user = User.create(email: "guest@example.com", password: nil)
        expect(user).not_to be_valid
      end
  
      it 'is not valid with a duplicate email' do
        user = User.create(email: 'guest@example.com', password: "password")
        duplicated_user = User.create(email: 'guest@example.com', password: 'password')
        expect(duplicated_user).to_not be_valid
      end
  
      it 'is not valid with an invalid email format' do
        user = User.create(email: 'invalidemail', password: "password")
        expect(user).to_not be_valid
      end
    end
  end
