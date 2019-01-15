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
    const dataPO = request.only(["supplier_id", "total", "total_item"]);
    const data = await PO.create(dataPO);
    response.json(data.id);
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
    const show = await PO.query().where('id', params.id).with('supplier').with('purchaseOrderDetails').fetch()

    response.json(show)
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
  async update({ params, request, response }) {
    // Get Data For Purchase Order
    const POdata = request.only(["total_item", "total"]);

    // Get Data For Purchase Order Detail
    const PODdata = request.only(["total", "qty", "product_id"]);

    // Input many data to purchase Order Details
    await POD.query().insert({ ...PODdata, purchase_order_id: params.id });

    // Update Purchase Order Details
    await PO.query()
      .where("id", params.id)
      .update(POdata);

    response.json(POdata);
  }

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
