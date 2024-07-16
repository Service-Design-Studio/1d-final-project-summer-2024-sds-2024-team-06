require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }
  let(:valid_attributes) { { email: 'user@example.com', password: 'password', password_confirmation: 'password', dateLastLoggedIn: Date.today } }
  let(:invalid_attributes) { { email: 'invalidemail', password: 'password', password_confirmation: '', dateLastLoggedIn: Date.today} }

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
      get :show, params: { id: user.id }
      expect(response).to be_successful
      expect(JSON.parse(response.body)['id']).to eq(user.id)
    end
  end

  describe "POST #create" do
    context "with valid parameters" do
      it "creates a new User" do
        expect {
          post :create, params: { user: valid_attributes }
        }.to change(User.all, :count).by(1)
      end

      it "renders a JSON response with the new user" do
        post :create, params: { user: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(JSON.parse(response.body)['email']).to eq(valid_attributes[:email])
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the new user" do
        post :create, params: { user: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe "POST #guest_login" do
    it "logs in as a guest and redirects to root path" do
      post :guest_login
      expect(response).to redirect_to(root_path)
      expect(flash[:notice]).to eq('Signed in successfully as a guest.')
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
      it "redirects the user to the login page" do
        sign_out user
        get :current
        expect(response).to have_http_status(:found)
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end