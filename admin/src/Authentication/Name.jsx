import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import Cookies from "js-cookie";
function Name(props) {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserAPI.getDetailData(Cookies.get("name"));

      setName(response);
    };

    fetchData();
  }, []);

  return (
    <li className="nav-item dropdown">
      {console.log(name)}
      <a
        className="nav-link dropdown-toggle"
        style={{ cursor: "pointer" }}
        id="pagesDropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fas fa-user-alt mr-1 text-gray"></i>
        {name && name[0].fullname}
      </a>
      <div className="dropdown-menu mt-3" aria-labelledby="pagesDropdown">
        {/* <Link
					className='dropdown-item border-0 transition-link'
					to={'/manage'}>
					Manage
				</Link> */}
        <Link
          className="dropdown-item border-0 transition-link"
          to={"/history"}
        >
          History
        </Link>
      </div>
    </li>
  );
}

export default Name;
