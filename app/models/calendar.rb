class Calendar < ActiveRecord::Base
  has_many :events
  def first_date
  end
end
