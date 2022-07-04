# e-commerce

| HTTP method | URI path                     | Description                         | Protected | User type          |
| ----------- | ---------------------------- | ----------------------------------- | --------- | ------------------ |
| GET         | /                            | render index page                   | false     | visitor/user/admin |
| GET         | /products/women              | render woman products               | false     | visitor/user/admin |
| GET         | /products/women/:product_id  | render product details              | false     | visitor/user/admin |
| GET         | /register                    | render register form                | false     | visitor/user/admin |
| POST        | /register                    | handle register form                | false     | visitor/user/admin |
| GET         | /login                       | render login form                   | false     | visitor/user/admin |
| POST        | /login                       | handle login form                   | false     | visitor/user/admin |
| POST        | /logout                      | handle logout                       | true      | user/admin         |
| GET         | /profile/:user_id            | save product or comments            | true      | user/admin         |
| GET         | /profile/:user_id/edit       | render edit user profile form       | true      | user/admin         |
| POST        | /profile/:user_id/edit       | handle edit user profile form       | true      | user/admin         |
| POST        | /profile/:user_id            | delete products                     | true      | user               |
| GET         | /profile/payment             | render invoice form                 | true      | user               |
| GET         | /profile/payment/empty-cart  | render empty cart                   | true      | user               |
| POST        | /profile/payment             | handle invoice form                 | true      | user               |
| GET         | /payment/statement           | render the status of the payment    | true      | user               |
| GET         | /admin/products              | render all products(edit/delete)    | true      | admin              |
| GET         | /admin/products/create       | handle register form create product | true      | admin              |
| POST        | /admin/products/create       | handle register form create product | true      | admin              |
| GET         | /admin/:product_id/edit      | render register form edit product   | true      | admin              |
| POST        | /admin/:product_id/edit      | handle register form edit product   | true      | admin              |
| POST        | /admin/:product_id/delete    | delete products                     | true      | admin              |
