require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  let!(:user) { create(:user, email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }
  let(:valid_attributes) { {email: 'user@example.com', password: 'password' } }
  let(:invalid_attributes) { {email: 'invalidemail', password: '' } }

  before do
    sign_in user # Ensure user is signed in before each test
  end

  after(:each) do
    user.destroy if user.persisted?
  end

  describe "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to be_successful
      expect(JSON.parse(response.body).size).to eq(User.count)
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      get :show, params: { id: user.id } # Use user.id directly
      expect(response).to be_successful
      expect(JSON.parse(response.body)['id']).to eq(user.id)
    end
  end

  describe "GET #current" do
    context "when user is logged in" do
        before { sign_in user }

        it "returns the current user" do
            get :current
            expect(response).to be_successful
            expect(JSON.parse(response.body)['id']).to eq(user.id)
        end
    end
    

    context "when no user is logged in" do
        it "returns an unauthorized status" do
            sign_out user # Ensure the user is signed out
            get :current
            expect(response).to have_http_status(:found) # Expecting a redirect
            expect(response).to redirect_to(new_user_session_path)
        end
    end
  end
end
