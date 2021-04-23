'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.string('client_name', 250).notNullable().unique()
      table.string('cnpj', 18)
      table.string('document', 18)
      table.string('type_client', 15).notNullable()
      table.string('email', 250).notNullable().unique()
      table.string('phone', 250).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
