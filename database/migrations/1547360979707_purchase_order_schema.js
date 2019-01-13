'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PurchaseOrderSchema extends Schema {
  up () {
    this.create('purchase_orders', (table) => {
      table.increments().unique().primary()
      table.integer('supplier_id').notNull().unsigned().references('id').inTable('suppliers')
      table.timestamps('date')
      table.integer('total_item')
      table.float('total')
    })
  }

  down () {
    this.drop('purchase_orders')
  }
}

module.exports = PurchaseOrderSchema
