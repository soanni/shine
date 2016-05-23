class CreateIndexOnRolesArray < ActiveRecord::Migration
  def up
    execute %{
  		CREATE INDEX
  			users_roles
  		ON
  			users
      USING GIN (roles)
  	}
  end

  def down
    remove_index :users, name: 'users_roles'
  end
end
