require 'rails_helper'

RSpec.describe Users::RegistrationsController, type: :controller do
  before do
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end

  describe "POST #create" do
    let(:valid_attributes) do
      {
        email: 'test@example.com',
        password: 'password',
        password_confirmation: 'password',
        dateLastLoggedIn: Date.today
      }
    end

    let(:invalid_attributes) do
      {
        email: 'test@example.com',
        password: 'password',
        password_confirmation: 'wrong_password'
      }
    end

    it "creates a new user with valid attributes" do
      expect {
        post :create, params: { user: valid_attributes }
      }.to change(User, :count).by(1)
      expect(response).to redirect_to(root_path)
    end

    it "does not create a new user with invalid attributes" do
      expect {
        post :create, params: { user: invalid_attributes }
      }.not_to change(User, :count)
      expect(response).to render_template(:new)
    end

    it "adds standard moods to the user upon creation" do
      post :create, params: { user: valid_attributes }
      user = User.find_by(email: 'test@example.com')
      expect(user.moods.count).to eq(12)
      expect(user.moods.pluck(:name)).to include('Excited', 'Very happy', 'Meh', 'Tired', 'Content', 'Angry', 'Happy', 'In love', 'Unhappy', 'Teary', 'Upset', 'Confused')
    end

    # it "redirects to sign in path if user is already authenticated" do
    #   user = User.create(valid_attributes)
    #   sign_in user
    #   post :create, params: { user: valid_attributes }
    #   expect(response).to redirect_to(root_path)
    # end
  end
end