class CreateCustomerDetailsMaterializedView < ActiveRecord::Migration
  def up
    execute %{
    CREATE MATERIALIZED VIEW customer_details AS
      SELECT
          c.id                        AS customer_id
          ,c.first_name               AS first_name
          ,c.last_name                AS last_name
          ,c.username                 AS username
          ,c.email                    AS email
          ,c.created_at               AS joined_at
          ,billing_addresses.id       AS billing_address_id
          ,billing_addresses.street   AS billing_street
          ,billing_addresses.city     AS billing_city
          ,billing_addresses.zipcode  AS billing_zipcode
          ,billing_states.code        AS billing_state
          ,shipping_addresses.id      AS shipping_address_id
          ,shipping_addresses.street  AS shipping_street
          ,shipping_addresses.city    AS shipping_city
          ,shipping_addresses.zipcode AS shipping_zipcode
          ,shipping_states.code       AS shipping_state
      FROM
        customers c
        LEFT JOIN customers_billing_addresses customers_billing ON customers_billing.customer_id = c.id
        INNER JOIN addresses billing_addresses ON  billing_addresses.id = customers_billing.address_id
        INNER JOIN states billing_states ON billing_states.id = billing_addresses.state_id
        LEFT JOIN customers_shipping_addresses customers_shipping ON customers_shipping.customer_id = c.id AND customers_shipping.primary = true
        INNER JOIN addresses shipping_addresses ON  shipping_addresses.id = customers_shipping.address_id
        INNER JOIN states shipping_states ON shipping_states.id = shipping_addresses.state_id
    }
    execute %{
      CREATE UNIQUE INDEX
        customer_details_customer_id
      ON
        customer_details(customer_id)
    }
  end
  def down
    execute "DROP MATERIALIZED VIEW customer_details"
  end
end
