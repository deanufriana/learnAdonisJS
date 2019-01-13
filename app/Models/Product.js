'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    static scopeProductDetail(query) {
        return query.has('productOrder').table('products').leftJoin ('purchase_order_details', 'products.id', 'purchase_order_details.id')
    }

    // static get Serializer() {
    //     return this.with('purchase_order_details').fetch()
    // }

    productOrder() {
        return this.hasMany('App/Models/PurchaseOrderDetail')
    }
}

module.exports = Product
