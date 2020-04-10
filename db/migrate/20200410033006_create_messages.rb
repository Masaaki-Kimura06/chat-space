class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text :body, null: false
      t.text :image, null: false
      t.references :group, foreign_key: true
      t.references :user, foreign_key: true
    end
  end
end
