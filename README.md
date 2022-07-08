# e-commerce

| HTTP method | URI path                            | Description                         | Protected | User type          |
| ----------- | ----------------------------------- | ----------------------------------- | --------- | ------------------ |
| GET         | /                                   | render index page                   | false     | visitor/user/admin | 

| GET         | /products/women                     | render woman products               | false     | visitor/user/admin | 
| GET         | /products/women/:product_id         | render product details              | false     | visitor/user/admin | 
| GET         | /register                           | render register form                | false     | visitor/user/admin | 
| POST        | /register                           | handle register form                | false     | visitor/user/admin | 
| GET         | /login                              | render login form                   | false     | visitor/user/admin | 
| POST        | /login                              | handle login form                   | false     | visitor/user/admin | 

| POST        | /logout                             | handle logout                       | true      | user/admin         | 
| GET         | /profile/:user_id                   | save product or comments            | true      | user/admin         | 
| GET         | /profile/:user_id/edit              | render edit user profile form       | true      | user/admin         | 
| POST        | /profile/:user_id/edit              | handle edit user profile form       | true      | user/admin         | 

| GET         | /profile/:user_id/payment           | render invoice form                 | true      | user               | 
| GET         | /profile/payment/empty-cart         | render empty cart                   | true      | user               | 
| POST        | /add-to-cart/:product_id            | add to cart button                  | true      | user               | 
| POST        | /remove-from-cart/:product_id       | remove from cart button             | true      | user               | 
| GET         | /successful-payment                 | end of purchase                     | true      | user               | 

| GET         | /admin/stores                       | render all stores                   | true      | admin              | 
| GET         | /admin/stores/create                | render create store form            | true      | admin              | 
| POST        | /admin/stores/create                | handle create store form            | true      | admin              | 
| GET         | /admin/stores/:store_id/edit        | render edit store form              | true      | admin              | 
| POST        | /admin/stores/:store_id/edit        | handle edit store form              | true      | admin              | 
| POST        | /admin/stores/:store_id/delete      | delete stores                       | true      | admin              | 
| GET         | /admin/products                     | render all products(edit/delete)    | true      | admin              | 
| GET         | /admin/products/create              | handle register form create product | true      | admin              | 
| POST        | /admin/products/create              | handle register form create product | true      | admin              | 
| GET         | /admin/products/:product_id/edit    | render register form edit product   | true      | admin              | 
| POST        | /admin/products/:product_id/edit    | handle register form edit product   | true      | admin              | 
| POST        | /admin/products/:product_id/delete  | delete products                     | true      | admin              | 

| GET         | /api                                | json render googlemaps              | true      | admin              | 

