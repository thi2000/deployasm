const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  id_user: {
    type: "String",
    required: true,
  },
  listCart: [
    {
      count: {
        type: "Number",
      },
      nameProduct: {
        type: "String",
      },
      img: {
        type: "String",
      },
      idProduct: {
        type: "String",
      },
      priceProduct: {
        type: "Number",
      },
      count: {
        type: "Number",
      },
    },
  ],
});
module.exports = mongoose.model("Order", orderSchema);
