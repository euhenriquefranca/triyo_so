'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderOfServicesSchema extends Schema {
  up () {
    this.create('order_of_services', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('order_of_services')
  }
}

module.exports = OrderOfServicesSchema
