const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const checkoutSchema = new Schema({
  idUser: {
    type: "String",
    required: true,
  },
  address: {
    type: "String",
    required: true,
  },
  fullname: {
    type: "String",
    required: true,
  },
  phone: { type: "Number", required: true },
  total: { type: "String", required: true },

  listCart: [
    {
      img: {
        type: "String",
        required: true,
      },
      count: {
        type: "Number",
      },

      nameProduct: {
        type: "String",
      },

      idProduct: {
        type: "String",
      },
      priceProduct: {
        type: "Number",
      },
    },
  ],
});
module.exports = mongoose.model("Checkout", checkoutSchema);
