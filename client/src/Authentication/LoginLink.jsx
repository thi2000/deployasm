import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { deleteSession } from "../Redux/Action/ActionSession";
import Cookies from "js-cookie";
function LoginLink(props) {
  const dispatch = useDispatch();

  const onRedirect = () => {
    Cookies.remove("name");
    Cookies.remove("jwt");
    Cookies.remove("id");

    const action = deleteSession("");
    dispatch(action);
  };

  return (
    <li className="nav-item" onClick={onRedirect}>
      <Link className="nav-link" to="/signin">
        ( Logout )
      </Link>
    </li>
  );
}

export default LoginLink;
