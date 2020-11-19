'use strict'

const Response = require('@adonisjs/framework/src/Response')

const OrderOfService = use('App/Models/OrderOfService')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with orderofservices
 */
class OrderOfServiceController {
  /**
   * Show a list of all orderofservices.
   * GET orderofservices
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const order_of_sevice = await OrderOfService.all()
    
    return order_of_sevice
  }

  /**s
   * Create/save a new orderofservice.
   * POST orderofservices
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth}) {

    const data = request.only(
      [
        'client_id',
        'os_number',
        'reason_called',
        'message',
        'place_of_performance',
        'start_date_os',
        'end_date_os'
      ]
    )
    
    const order_of_sevice = await OrderOfService.create(
      {
        user_id: auth.user.id,
        ...data
      }
    )


    return order_of_sevice
  }

  /**
   * Display a single orderofservice.
   * GET orderofservices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const order_of_sevice = await OrderOfService.findOrFail(params.id)

    return order_of_sevice
  }


  /**
   * Update orderofservice details.
   * PUT or PATCH orderofservices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {

      const order_of_sevice = await OrderOfService.findOrFail(params.id)

      const data = request.only(
        [
          'reason_called',
          'message',
          'place_of_performance',
          'start_date_os',
          'end_date_os'
        ]
      )

      order_of_sevice.merge(data)

      await order_of_sevice.save()

      return order_of_sevice
  }

  /**
   * Delete a orderofservice with id.
   * DELETE orderofservices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const order_of_sevice = await OrderOfService.findOrFail(params.id)

    if (order_of_sevice.user_id != auth.user.id) {
      return response.status(401)
    }


    await order_of_sevice.delete()
  }
}

module.exports = OrderOfServiceController
