'use strict'

const Client = use('App/Models/Client')
const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clients
 */
class ClientController {
  /**
   * Show a list of all clients.
   * GET clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, response }) {
    const clients = await Client.all()

    
    const user = await User.find(auth.user.id)
    if (!user)
      return response.status(401).send({message: 'User not authorized'})

    return clients
  }


  /**
   * Create/save a new client.
   * POST clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    
    const data = request.only(
      [
        'client_name',
        'cnpj',
        'document',
        'type_client',
        'email',
        'phone'
      ]
    )
      
    const user = await User.find(auth.user.id)
    if (!user)
      return response.status(401).send({message: 'User not authorized'})

    const client = await Client.create(
      {
        ...data
      }
    )

    return client
  }

  /**
   * Display a single client.
   * GET clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    const client = await Client.find(params.id)

    if (!client)
      return response.status(404).send({message: 'Client not found'})

    return client
  }

  /**
   * Update client details.
   * PUT or PATCH clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {

    const client = await Client.findOrFail(params.id)

    const data = request.only(
      [
        'client_name',
        'cnpj',
        'document',
        'type_client',
        'email',
        'phone'
      ]
    )

    client.merge(data)
    await client.save()
    return client
  }

  /**
   * Delete a client with id.
   * DELETE clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {

    const user = await User.find(auth.user.id)

    if (!user)
      return response.status(401).send({message: 'User not authorized'})
    
    const client = await Client.findOrFail(params.id)

    await client.delete()
  }
}

module.exports = ClientController
