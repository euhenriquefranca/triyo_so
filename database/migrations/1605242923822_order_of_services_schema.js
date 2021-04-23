'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderOfServicesSchema extends Schema {
  up () {
    this.create('order_of_services', (table) => {
      table.increments()
      
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('client_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.integer('os_number').notNullable().unique()
      table.string('reason_called', 100).notNullable()
      table.text('message', 250)
      table.string('place_of_performance').notNullable()
      table.datetime('start_date_os', { precision: 6 }).notNullable()
      table.datetime('end_date_os', { precision: 6 }).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('order_of_services')
  }
}

module.exports = OrderOfServicesSchema
