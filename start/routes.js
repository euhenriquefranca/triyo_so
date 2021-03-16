'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return ({
    message: 'Welcome to Triyo SO'
  })
})

Route.post('/register', 'AuthController.register')
Route.post('/authenticate', 'AuthController.authenticate')

Route.group(() => {
  Route.resource('order_of_services', 'OrderOfServiceController').apiOnly()
}).middleware('auth')

Route.group(() => {
  Route.resource('clients', 'ClientController').apiOnly()
}).middleware('auth')