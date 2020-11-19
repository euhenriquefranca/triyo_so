'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments()

      table
        .integer('client_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.string('zipcode', 20).notNullable().unique()
      table.string('city', 250).notNullable()
      table.string('state', 250).notNullable()
      table.string('neighborhood', 250).notNullable()
      table.string('street', 250).notNullable()
      table.string('street_number', 250).notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
