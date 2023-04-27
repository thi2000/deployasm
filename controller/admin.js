const Product = require("../model/product");
const removeDiacritics = require("remove-diacritics");
exports.serchAdmin = (req, res, next) => {
  console.log(req.query.search);
  const search = req.query.search || "";
  Product.find().then((product) => {
    res.send(
      product.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(removeDiacritics(search.toLowerCase()))
        // item.name.includes("Apple iPhone 12 64GB")
      )
    );
  });
};
