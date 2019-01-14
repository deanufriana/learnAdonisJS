'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

    static scopeProductDetail(query) {
        return query.with('historyTransaction.purchaseOrder.supplier')
    }

    historyTransaction() {
        return this.hasMany('App/Models/PurchaseOrderDetail')
    }

}

module.exports = Product
