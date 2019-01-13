'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SupplierSchema extends Schema {
  up () {
    this.create('suppliers', (table) => {
      table.increments().unique().primary()
      table.string('name')
      table.text('address')
      table.string('city', 40)
      table.timestamps()
    })
  }

  down () {
    this.drop('suppliers')
  }
}

module.exports = SupplierSchema
