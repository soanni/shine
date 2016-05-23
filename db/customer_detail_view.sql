SELECT
c.first_name
,c.last_name
,c.username
,c.email
,c.created_at
,billing_addresses.street
,billing_addresses.city
,billing_addresses.zipcode
,billing_states.name
,shipping_addresses.street
,shipping_addresses.city
,shipping_addresses.zipcode
,shipping_states.name
FROM customers c
LEFT JOIN customers_billing_addresses customers_billing ON customers_billing.customer_id = c.id
INNER JOIN addresses billing_addresses ON  billing_addresses.id = customers_billing.address_id
INNER JOIN states billing_states ON billing_states.id = billing_addresses.state_id
LEFT JOIN customers_shipping_addresses customers_shipping ON customers_shipping.customer_id = c.id AND customers_shipping.primary = true
INNER JOIN addresses shipping_addresses ON  shipping_addresses.id = customers_shipping.address_id
INNER JOIN states shipping_states ON shipping_states.id = shipping_addresses.state_id
WHER c.id = 2000;