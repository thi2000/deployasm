import axios from "axios";
import "./Pro.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
function UpdateProduct(props) {
  const [category, setcategory] = useState("");
  const [count, setcout] = useState("");
  const [img1, setimg1] = useState("");
  const [img2, setimg2] = useState("");
  const [img3, setimg3] = useState("");
  const [img4, setimg4] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState("");

  const [long_dec, setlong_dec] = useState("");
  const [short_dec, setshort_dec] = useState("");
  const [err, seterr] = useState("");

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((response) => response.data)
      .then((data) => {
        const a = data[0];

        setcategory(a.category);
        setimg1(a.img1);
        setimg2(a.img2);
        setimg3(a.img3);
        setimg4(a.img4);
        setname(a.name);
        setprice(a.price);
        setlong_dec(a.long_desc);
        setshort_dec(a.short_desc);
        setcout(a.count);
      });
  }, []);
  const onChangeName = (e) => {
    setname(e.target.value);
  };
  const onChangeCount = (e) => {
    setcout(e.target.value);
  };
  const onChangecat = (e) => {
    setcategory(e.target.value);
  };
  const onChangeimg1 = (e) => {
    setimg1(e.target.value);
  };
  const onChangeimg2 = (e) => {
    setimg2(e.target.value);
  };
  const onChangeimg3 = (e) => {
    setimg3(e.target.value);
  };
  const onChangeimg4 = (e) => {
    setimg4(e.target.value);
  };
  const onChangeprice = (e) => {
    setprice(e.target.value);
  };
  const onChangelong = (e) => {
    setlong_dec(e.target.value);
  };
  const onChangeshort = (e) => {
    setshort_dec(e.target.value);
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log("nahna");
    axios
      .post("http://localhost:5000/update", {
        id: id,
        img1: img1,
        img2: img2,
        img3: img3,
        img4: img4,
        category: category,
        name: name,
        long_dec: long_dec,
        short_dec: short_dec,
        price: price,
        count: count,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.error(err);
      });

    if (err == "") {
      window.location = "/";
    }
  };
  return (
    <div className="limiter">
      {console.log(name)}
      <div className="container-login100">
        <div
          className="wrap-login100  p-l-55 p-r-55 p-t-65 p-b-50"
          style={{ width: "1500px" }}
        >
          <span className="login100-form-title p-b-33">ADD Product</span>
          <div className="d-flex justify-content-center pb-5"></div>
          <div className="wrap-input100 validate-input">
            <input
              className="input100"
              value={category}
              onChange={onChangecat}
              type="text"
              placeholder="category"
            />
          </div>
          <div className="wrap-input100 validate-input">
            <input
              className="input100"
              value={img1}
              onChange={onChangeimg1}
              type="text"
              placeholder="img1"
            />
          </div>
          <div className="wrap-input100 validate-input">
            <input
              className="input100"
              value={img2}
              onChange={onChangeimg2}
              type="text"
              placeholder="img2"
            />
          </div>
          <div className="wrap-input100 validate-input">
            <input
              className="input100"
              value={img3}
              onChange={onChangeimg3}
              type="text"
              placeholder="img3"
            />
          </div>
          <div className="wrap-input100 validate-input">
            <input
              className="input100"
              value={img4}
              onChange={onChangeimg4}
              type="text"
              placeholder="img4"
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              value={name}
              onChange={onChangeName}
              type="text"
              placeholder="name"
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              value={price}
              onChange={onChangeprice}
              type="number"
              placeholder="price"
            />
          </div>
          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              value={count}
              onChange={onChangeCount}
              type="number"
              placeholder="count"
            />
          </div>
          <div>
            <textarea
              style={{ border: "solid 1px black" }}
              rows="20"
              className="input100"
              value={short_dec}
              onChange={onChangeshort}
              type="text"
              placeholder="short_desc"
            />
          </div>
          <div>
            <textarea
              style={{ border: "solid 1px black" }}
              rows="20"
              className="input100"
              value={long_dec}
              onChange={onChangelong}
              type="text"
              placeholder="long_desc
              "
            />
          </div>

          <div className="container-login100-form-btn m-t-20">
            {/* {success && <Redirect to={"/signin"} />} */}
            {err && <h1>{err}</h1>}
            <button className="login100-form-btn" onClick={handlerSubmit}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateProduct;
