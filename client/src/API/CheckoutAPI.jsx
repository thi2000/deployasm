import axiosClient from "./axiosClient";

const CheckoutAPI = {
  postEmail: (query, data) => {
    const url = `/email${query}`;
    return axiosClient.post(url, data);
  },
};

export default CheckoutAPI;
