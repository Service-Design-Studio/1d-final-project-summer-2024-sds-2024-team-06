# spec/views/pages/home.html.erb_spec.rb

require 'rails_helper'

RSpec.describe "pages/home", type: :view do
  it "renders the sign-in button with the correct text and link" do
    render

    expect(rendered).to have_selector('a[href="/users/sign_in"]', text: 'Sign in or continue as guest to begin your stART journey')
    expect(rendered).to have_selector('a.btn.btn-primary', text: 'Sign in or continue as guest to begin your stART journey')
  end
end
