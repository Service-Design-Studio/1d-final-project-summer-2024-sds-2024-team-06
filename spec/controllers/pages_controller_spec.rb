require 'rails_helper'

RSpec.describe PagesController, type: :controller do
  describe "GET #home" do
    context "when user is signed in" do
      before do
        allow(controller).to receive(:user_signed_in?).and_return(true)
      end

      it "redirects to the landing page" do
        get :home # Replace :some_action with the actual action you're testing
        expect(response).to redirect_to('/landing')
      end
    end
  end
end
