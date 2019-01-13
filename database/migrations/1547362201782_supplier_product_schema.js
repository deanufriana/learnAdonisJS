'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SupplierProductSchema extends Schema {
  up () {
    this.create('supplier_products', (table) => {
      table.increments().primary().unique()
      table.integer('supplier_id').notNull().unsigned().references('id').inTable('suppliers')
      table.integer('product_id').notNull().unsigned().references('id').inTable('products')
      table.float('price')
      table.float('disc')
      table.timestamps()
    })
  }

  down () {
    this.drop('supplier_products')
  }
}

module.exports = SupplierProductSchema
