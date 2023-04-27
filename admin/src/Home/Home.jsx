import React, { useEffect, useState } from "react";

import ProductAPI from "../API/ProductAPI";
import "./home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Label, Input } from "reactstrap";

function Home(props) {
  const [products, setProducts] = useState([]);
  const [id, setid] = useState("");
  const [serch, setserch] = useState("");
  //Fetch Product
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductAPI.getAPI();

      const data = response;
      console.log(data);

      setProducts(data);
    };

    fetchData();
  }, [id]);
  const deleteproduct = (id) => {
    setid(id);

    axios.post("http://localhost:5000/products/del", { id });
  };
  const handler = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:5000/searchadmin?search=${serch}`)
      .then((response) => {
        // console.log(response);
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onchange = (e) => {
    setserch(e.target.value);
  };
  return (
    <div className="page-holder">
      <header className="header bg-white">
        <div className="container">
          <section className="py-5" id="section_product">
            <div class="serch">
              <form onSubmit={handler}>
                <div className="contanerinput">
                  <Label for="serch">serch:</Label>
                  <Input
                    className="Inputadmin"
                    onChange={onchange}
                    id="serch"
                    name="serch"
                    type="text"
                  />
                  <button className="buttonserch">serch</button>
                </div>
              </form>
            </div>
            <div>
              {" "}
              <Link to="/add">
                <a className="addbtn add-btn-add ">ADD</a>
              </Link>
            </div>
            <table className="table">
              <thead className="bg-light">
                <tr className="text-center">
                  <th className="border-0" scope="col">
                    {" "}
                    <strong className="text-small text-uppercase">Id</strong>
                  </th>
                  <th className="border-0" scope="col">
                    {" "}
                    <strong className="text-small text-uppercase">name</strong>
                  </th>
                  <th className="border-0" scope="col">
                    {" "}
                    <strong className="text-small text-uppercase">Price</strong>
                  </th>
                  <th className="border-0" scope="col">
                    {" "}
                    <strong className="text-small text-uppercase">Img</strong>
                  </th>
                  <th className="border-0" scope="col">
                    {" "}
                    <strong className="text-small text-uppercase">
                      Category
                    </strong>
                  </th>
                  <th className="border-0" scope="col">
                    {" "}
                    <strong className="text-small text-uppercase">
                      Số Lượng
                    </strong>
                  </th>
                  <th className="border-0" scope="col">
                    {" "}
                    <strong className="text-small text-uppercase">
                      Delete
                    </strong>
                  </th>
                  <th className="border-0" scope="col">
                    {" "}
                    <strong className="text-small text-uppercase">
                      Update
                    </strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  Cookies.get("id") &&
                  products.map((value, index) => (
                    <tr className="text-center" key={index}>
                      <td className="align-middle border-0">
                        <div className="media align-items-center justify-content-center">
                          {value._id}
                        </div>
                      </td>

                      <td className="align-middle border-0">
                        <div className="media align-items-center justify-content-center">
                          {value.name}
                        </div>
                      </td>

                      <td className="align-middle border-0">
                        <div className="media align-items-center justify-content-center">
                          {value.price} VND
                        </div>
                      </td>

                      <td className="pl-0 border-0">
                        <div className="media align-items-center justify-content-center">
                          <img src={value.img1} alt="..." width="70" />
                        </div>
                      </td>
                      <td className="align-middle border-0">
                        <div className="media align-items-center justify-content-center">
                          {value.category}
                        </div>
                      </td>
                      <td className="align-middle border-0">
                        <div className="media align-items-center justify-content-center">
                          {value.count}
                        </div>
                      </td>
                      <td className="align-middle border-0">
                        <a
                          className="reset-anchor remove_cart"
                          onClick={(id) => deleteproduct(value._id)}
                        >
                          Delete
                        </a>
                      </td>
                      <td className="align-middle border-0">
                        <a
                          href={`/update/${value._id}`}
                          className="reset-anchor remove_cart"
                        >
                          Update
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        </div>
      </header>
    </div>
  );
}

export default Home;
