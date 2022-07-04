# e-commerce

| HTTP method | URI path                     | Description                         | Protected | User type          |
| ----------- | ---------------------------- | ----------------------------------- | --------- | ------------------ |
| GET         | /                            | render index page                   | false     | visitor/user/admin |
| GET         | /products                    | render all products                 | false     | visitor/user/admin |
| GET         | /products/women              | render woman products               | false     | visitor/user/admin |
| GET         | /products/women/:product\_id | render product details              | false     | visitor/user/admin |
| GET         | /register                    | render register form                | false     | visitor/user/admin |
| POST        | /register                    | handle register form                | false     | visitor/user/admin |
| GET         | /login                       | render login form                   | false     | visitor/user/admin |
| POST        | /login                       | handle login form                   | false     | visitor/user/admin |
| POST        | /logout                      | handle logout                       | true      | user/admin         |
| GET         | /profile/:user\_id           | save product or comments            | true      | user/admin         |
| GET         | /profile/:user\_id/edit      | render edit user profile form       | true      | user/admin         |
| POST        | /profile/:user\_id/edit      | handle edit user profile form       | true      | user/admin         |
| POST        | /profile/:user\_id           | delete products                     | true      | user               |
| GET         | /profile/payment             | render invoice form                 | true      | user               |
| GET         | /profile/payment/empty-cart  | render empty cart                   | true      | user               |
| POST        | /profile/payment             | handle invoice form                 | true      | user               |
| GET         | /payment-statement           | render the status of the payment    | true      | user               |
| GET         | /profile/admin/create        | handle register form create product | true      | admin              |
| POST        | /profile/admin/create        | handle register form create product | true      | admin              |
| GET         | /profile/admin/edit          | render register form edit product   | true      | admin              |
| POST        | /profile/admin/delete        | delete products                     | true      | admin              |
| POST        | /profile/admin/edit          | handle register form edit product   | true      | admin              |
