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
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/Contoh', 'PurchaseOrderDetailController.index')
Route.get('/Product', 'ProductController.index')
Route.get('purchaseOrders', 'PurchaseOrderController.index')

Route.post('purchaseOrder', 'PurchaseOrderController.create')

Route.patch('purchaseOrder/:id', 'PurchaseOrderController.update')

Route.get('purchaseOrder/:id', 'PurchaseOrderController.show')

Route.delete('purchaseOrderDetail/:id', 'PurchaseOrderDetailController.destroy')