"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class PurchaseOrder extends Model {
  
  purchaseOrderDetails() {
    return this.hasMany("App/Models/PurchaseOrderDetail");
  }

  supplier() {
    return this.belongsTo("App/Models/Supplier");
  }
}

module.exports = PurchaseOrder;
