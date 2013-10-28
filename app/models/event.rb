class Event < ActiveRecord::Base
  belongs_to :calendar
  validates :title, presence: true, length: { minimum: 2}
end
