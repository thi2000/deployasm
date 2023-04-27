const Product = require("../model/product");
const Order = require("../model/order");
const Checkout = require("../model/checkout");
const User = require("../model/user");
const removeDiacritics = require("remove-diacritics");
const nodemailer = require("nodemailer");
exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getProduct = (req, res) => {
  Product.find()
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getProductid = (req, res, next) => {
  const prodId = req.params.id;
  // console.log("id", prodId);
  Product.find({ _id: prodId })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getpagination = (req, res, next) => {
  let page = req.query.page;
  let count = req.query.count;
  let category = req.query.category;
  let search = req.query.search || "";

  const startindex = (page - 1) * count;
  const endindex = count * page;

  Product.find({ category: category })
    .then((user) => {
      res.send(
        user
          .slice(startindex, endindex)
          .filter((item) =>
            item.name.includes(removeDiacritics(search.toLowerCase()))
          )
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postAddToCart = (req, res, next) => {
  const idProduct = req.query.idProduct;
  const count = req.query.count;
  const idUser = req.query.idUser;
  const pushdata = {
    count: count,
    idUser: idUser,
    idProduct: idProduct,
  };

  Order.find(
    {
      id_user: req.body.id_user,
    },
    (err, carts) => {
      // users is an array which may be empty for no results
      if (err) {
        console.log(err);
        return;
      }
      if (carts.length) {
        if (
          carts.map((e) =>
            e.listCart.filter((e) => e.idProduct.includes(req.query.idProduct))
          )[0].length == 0
        ) {
          Order.findOneAndUpdate(
            { id_user: req.body.id_user },
            {
              $push: {
                listCart: req.body.listCart[0],
              },
            },
            (error, success) => {
              if (error) {
                console.log(error);
              } else {
                console.log("success");
              }
            }
          );
        } else {
          const count = carts.map((e) =>
            e.listCart.filter((e) => e.idProduct.includes(req.query.idProduct))
          )[0][0].count;

          Order.findOneAndUpdate(
            {
              id_user: req.body.id_user,
              "listCart.idProduct": req.query.idProduct,
            },

            {
              $set: {
                "listCart.$.count": parseInt(req.query.count) + parseInt(count),
              },
            },
            (error, success) => {
              if (error) {
                console.log(error);
              } else {
                console.log("success");
              }
            }
          );
        }
      } else {
        const cart = new Order({
          id_user: req.body.id_user,
          listCart: [
            {
              idUser: req.body.listCart[0].idUser,
              idProduct: req.body.listCart[0].idProduct,
              nameProduct: req.body.listCart[0].nameProduct,
              priceProduct: req.body.listCart[0].priceProduct,
              count: req.body.listCart[0].count,
              img: req.body.listCart[0].img,
            },
          ],
        });
        cart.save();
      }
    }
  );
};
exports.deleteCart = (req, res, next) => {
  const idProduct = req.query.idProduct;
  const idUser = req.query.idUser;

  console.log("a");
  Order.updateMany(
    {
      id_user: idUser,
    },
    { $pull: { listCart: { idProduct: idProduct } } },
    (err, result) => {
      if (err) {
        console.error("dayla", err);
      } else {
        console.log("dayladadas", result);
      }
    }
  );
};
exports.getOrder = (req, res, next) => {
  console.log("getOrder");
  Order.find({ id_user: req.query.idUser })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postEmail = (req, res, next) => {
  // var transporter = nodemailer.createTransport({
  //   // config mail server
  //   service: "gmail",
  //   auth: {
  //     user: "somot1pro@gmail.com", //Tài khoản gmail vừa tạo
  //     pass: "chwmhnoocsdploen", //Mật khẩu tài khoản gmail vừa tạo
  //   },
  // });
  // const styleTABLE = "border:5px solid #ddd;text-align:left;padding:8px;";
  // let content = `<h1>xin chào ${req.query.fullname}</h1>
  //   <h2>Phone ${req.query.phone}</h2>
  //   <h2>Address: ${req.query.address}</h2>
  //   <div>
  //   <table style="border-collapse:collapse;width:100%;">
  //   <thead>
  //   <tr>
  //       <th style="${styleTABLE}">tên sản phẩm</th>
  //       <th style="${styleTABLE}">hình ảnh</th>
  //       <th style="${styleTABLE}">giá</th>
  //       <th style="${styleTABLE}">số lượng</th>
  //   </tr>
  //   </thead>
  //   ${cart.map((e) => {
  //     return `<tr>
  //     <th style="${styleTABLE}">${e.nameProduct}</th>
  //     <th style="${styleTABLE}"> <img src="${e.img} " height="100" width="100"></th>
  //     <th style="${styleTABLE}">${e.priceProduct} Vnd</th>
  //     <th style="${styleTABLE}">${e.count}</th>
  //   </tr>`;
  //   })}
  //   <h2>Tổng thanh toán: ${req.query.total} Vnd</h2>
  // <h1>Cam on</h1>
  //   </table>
  //   </div>
  //   `;
  // var mainOptions = {
  //   // thiết lập đối tượng, nội dung gửi mail
  //   from: "somot1pro@gmail.com",
  //   to: req.query.email,
  //   subject: "xác nhận đơn hàng",
  //   text: "Your text is here", //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
  //   html: content,
  // };
  // transporter.sendMail(mainOptions, function (err, info) {
  //   if (err) {
  //     console.log(err);
  //     res.json(err);
  //   } else {
  //     console.log("Message sent: " + info.response);
  //     res.json("thanh cong");
  //   }
  // });
};
exports.deleteOrder = (req, res, next) => {
  const data = {
    idUser: req.query.idUser,
    phone: req.query.phone,
    address: req.query.address,
    fullname: req.query.fullname,
    total: req.query.total,
    listCart: [...req.body[0]],
  };
  console.log(data);

  Order.find({ _id: req.body.idCart })
    .then((order) => {
      Checkout.insertMany(data);
    })
    .catch((err) => {
      console.log(err);
    });
  Order.find()
    .then((order) => {
      order.map((e) =>
        e.listCart.map((Cart) => {
          Product.findOneAndUpdate(
            { _id: Cart.idProduct },
            { $inc: { count: -Cart.count } },
            { new: true }
          )
            .then((cc) => {
              console.log("thanh cong");
            })
            .catch((err) => {
              console.log(err);
            });
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });

  Order.deleteOne({ _id: req.query.idCart })

    .then((order) => {
      console.log("thanh cong delete");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postaddProduct = (req, res, next) => {
  const data = req.body;

  if (data.category == "") {
    return res.status(401).send({ message: "Nhập category " });
  } else if (data.img1 == "") {
    return res.status(402).send({ message: "Nhập img1 " });
  } else if (data.img2 == "") {
    return res.status(403).send({ message: "Nhập img2 " });
  } else if (data.img3 == "") {
    return res.status(404).send({ message: "Nhập img3 " });
  } else if (data.img4 == "") {
    return res.status(405).send({ message: "Nhập img4 " });
  } else if (data.name == "") {
    return res.status(406).send({ message: "Nhập name " });
  } else if (data.price == "") {
    return res.status(407).send({ message: "Nhập giá " });
  } else if (data.long_dec == "") {
    return res.status(408).send({ message: "Nhập mô tả dài" });
  } else if (data.short_dec == "") {
    return res.status(409).send({ message: "Nhập thong tin ngắn " });
  } else if (data.short_dec == "") {
    return res.status(500).send({ message: "Nhập số sản phẩm  " });
  } else {
    const product = new Product({
      img1: data.img1,
      img2: data.img2,
      img3: data.img3,
      img4: data.img4,
      category: data.category,
      name: data.name,
      long_desc: data.long_dec,
      short_desc: data.short_dec,
      price: data.price,
      count: data.count,
    });
    return product.save();
  }
};
exports.deleteProduct = (req, res, next) => {
  Product.findByIdAndRemove(req.body.id)
    .then(() => {
      console.log("DESTROYED PRODUCT");
    })
    .catch((err) => console.log(err));
};

exports.update = (req, res, next) => {
  Product.findByIdAndUpdate(
    { _id: req.body.id },
    {
      img1: req.body.img1,
      img2: req.body.img2,

      img3: req.body.img3,
      img4: req.body.img4,
      category: req.body.category,
      name: req.body.name,
      long_desc: req.body.long_dec,
      short_desc: req.body.short_dec,
      price: req.body.price,
      count: req.body.count,
    },
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("thanhcong");
    }
  );
};
exports.gethistory = (req, res, next) => {
  Checkout.find({ idUser: req.query.idUser })
    .then((checkout) => {
      res.send(checkout);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getDetail = (req, res) => {
  Checkout.find({ _id: req.params.id })
    .then((checkout) => {
      res.send(checkout);
      console.log(checkout);
    })
    .catch((err) => {
      console.log(err);
    });
};
