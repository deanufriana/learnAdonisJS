'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PurchaseOrderDetailSchema extends Schema {
  up () {
    this.create('purchase_order_details', (table) => {
      table.increments().primary().unique()
      table.integer('purchaseOrder_id').notNull().unsigned().references('id').inTable('purchase_orders')
      table.integer('product_id').notNull().unsigned().references('id').inTable('products')
      table.integer('qty')
      table.float('total')
      table.timestamps()
    })
  }

  down () {
    this.drop('purchase_order_details')
  }
}

module.exports = PurchaseOrderDetailSchema
