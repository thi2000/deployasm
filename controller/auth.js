const User = require("../model/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const createtoken = (id, email, password) => {
  return jwt.sign({ id, email, password }, "test jwt token", {
    expiresIn: "3d",
  });
};
exports.getUserid = (req, res, next) => {
  const prodId = req.params.name;

  User.find({ email: prodId })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const fullname = req.body.fullname;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.status(401).send({ message: "gmail Đã Tồn Tại " });
      }
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email: email,
          phone: phone,
          fullname: fullname,
          password: hashedPassword,
        });
        return user.save();
      });
    })
    .catch((err) => {
      console.log(err);
    });
  res.json("thanh cong");
};
exports.postLogin = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.status(404).send({ message: "sai email" });
    }

    bcrypt.compare(req.body.password, user.password).then((password) => {
      if (!password) {
        res.status(405).send({ message: "sai passs" });
      } else if (user.role == "admin") {
        const token = createtoken(user.email, user.password);
        const id = user._id.toString();

        res.cookie("id", id);
        res.cookie("name", user.email);
        res.cookie("jwt", token);

        res.status(202).send({ message: "dang nhap admin" });
      } else {
        const token = createtoken(user.email, user.password);
        const id = user._id.toString();

        res.cookie("id", id);
        res.cookie("name", user.email);
        res.cookie("jwt", token);

        res.status(203).send({ message: "dang nhap user" });
      }
    });
  });
};
