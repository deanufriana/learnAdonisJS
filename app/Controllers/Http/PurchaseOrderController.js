"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const PO = use("App/Models/PurchaseOrder");
const POD = use("App/Models/PurchaseOrderDetail");
/**
 * Resourceful controller for interacting with purchaseorders
 */
class PurchaseOrderController {
  /**
   * Show a list of all purchaseorders.
   * GET purchaseorders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const data = await PO.query()
      .with("supplier")
      .with("purchaseOrderDetails")
      .fetch();
    response.json(data);
  }

  /**
   * Render a form to be used for creating a new purchaseorder.
   * GET purchaseorders/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {

    // Get Data For Purchase Order
    const POdata = request.only(["supplier_id", "total_item", "totals"]);

    //  Update Purchase Order Details
    const PurchaseOrder = await PO.create(POdata);

    // Get Data For Purchase Order Detail
    let PODdata = request.collect(["total", "qty", "product_id"]);

    PODdata.forEach(e => (e.purchase_order_id = PurchaseOrder.id));

    // Input many data to purchase Order Details
    await POD.query().insert(PODdata);

    response.json({ message: "success", success: true });
    
  }

  /**
   * Create/save a new purchaseorder.
   * POST purchaseorders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single purchaseorder.
   * GET purchaseorders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const show = await PO.query()
      .where("id", params.id)
      .with("supplier")
      .with("purchaseOrderDetails")
      .fetch();

    response.json(show);
  }

  /**
   * Render a form to update an existing purchaseorder.
   * GET purchaseorders/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update purchaseorder details.
   * PUT or PATCH purchaseorders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a purchaseorder with id.
   * DELETE purchaseorders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = PurchaseOrderController;
