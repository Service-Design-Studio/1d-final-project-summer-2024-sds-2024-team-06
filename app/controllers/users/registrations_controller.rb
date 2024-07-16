class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :redirect_if_authenticated, only: [:new, :create]

  def create
    super do |user|
      if user.persisted?
        add_standard_moods_to_user(user)
        # redirect_to root_path
      end
    end
  end

  private

  # def redirect_if_authenticated
  #   if user_signed_in? || current_user&.guest?
  #     redirect_to root_path
  #   end
  # end

  def add_standard_moods_to_user(user)
    standard_moods.each do |mood|
      user.moods.create(mood)
    end
  end

  def standard_moods
    [
      { name: 'Excited', color: 'Neon green', hexcode: '#39FF14' },
      { name: 'Very happy', color: 'Yellow', hexcode: '#FFFF00' },
      { name: 'Meh', color: 'Bright blue', hexcode: '#007FFF' },
      { name: 'Tired', color: 'Black', hexcode: '#000000' },
      { name: 'Content', color: 'Brown', hexcode: '#964B00' },
      { name: 'Angry', color: 'Red', hexcode: '#FF0000' },
      { name: 'Happy', color: 'Lime green', hexcode: '#32CD32' },
      { name: 'In love', color: 'Pink', hexcode: '#FFC0CB' },
      { name: 'Unhappy', color: 'Navy blue', hexcode: '#000080' },
      { name: 'Teary', color: 'Light purple', hexcode: '#E6E6FA' },
      { name: 'Upset', color: 'Dark blue', hexcode: '#00008B' },
      { name: 'Confused', color: 'Gray', hexcode: '#808080' }
    ]
  end
end