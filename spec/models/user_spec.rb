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

    describe '.guest' do
      before do
        User.where(email: "guest@example.com").destroy_all
      end
  
      it 'creates a guest user if one does not exist' do
        expect {
          User.guest
        }.to change { User.count }.by(1)
      end
  
      it 'returns the existing guest user if one exists' do
        guest_user = User.guest
        expect(User.guest.id).to eq(guest_user.id)
        expect(User.guest.email).to eq(guest_user.email)
      end
  
      it 'updates the password for the existing guest user' do
        guest_user = User.guest
        old_password = guest_user.encrypted_password
        User.guest
        guest_user.reload
        expect(guest_user.encrypted_password).not_to eq(old_password)
      end
    end

  describe '#find_mood_by_name' do
    it 'returns the mood with the given name' do
      user = User.create(email: "new@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today)
      mood = user.moods.create(name: "happy", color: "yellow", hexcode: "#FFFF00")
      expect(user.find_mood_by_name("happy")).to eq(mood)
    end

    it 'returns nil if no mood with the given name exists' do
      user = User.create(email: "new@example.com", password: "password")
      expect(user.find_mood_by_name("sad")).to be_nil
    end
  end

  describe 'validate_mood_limit' do
    it 'adds an error if the user has more than the maximum number of moods' do
      user = User.create(email: "new@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today)
      User::MAX_MOODS_PER_USER.times do
        user.moods.create(name: SecureRandom.hex, color: SecureRandom.hex, hexcode: SecureRandom.hex)
      end
      expect(user.moods.count).to eq(User::MAX_MOODS_PER_USER)
      new_mood = user.moods.build(name: "extra", color: "color", hexcode: "#000000", user: user)
      new_mood.valid?
      expect(new_mood.errors[:base]).to include("You cannot have more than #{User::MAX_MOODS_PER_USER} moods.")
    end
  end

  end
