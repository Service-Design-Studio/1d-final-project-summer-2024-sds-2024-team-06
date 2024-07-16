require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get homepage_url
    assert_response :redirect
    assert_redirected_to new_user_session_url
  end
end
