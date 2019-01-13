'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PurchaseOrderDetail extends Model {
    static scopeBelongsProduct (query) {
        return query.has('productDetail')
      }
    
    productDetail() {
        return this.belongsTo('App/Models/Product')
    }
}

module.exports = PurchaseOrderDetail
