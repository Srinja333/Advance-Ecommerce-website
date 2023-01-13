import { API } from "../config";
import queryString from "query-string";


//sortBy can be sell/arrival
export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const getCategories = () => {
  //console.log("e1");
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const getFilteredProducts = (skip, limit, filters = {}) => {
  //console.log("entry2");
  const data = {
    skip,
    limit,
    filters,
  };
  return fetch(`${API}/products/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      //console.log("entry3");
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//params can be categoryid and search(whatever user type search box)
//for sending params as query string we install query-string
export const list = (params) => {
  const query = queryString.stringify(params);
  //console.log("query", query);
  return fetch(`${API}/products/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const read = (productId) => {
  //console.log("e1");
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listRelated = (productId) => {
  return fetch(`${API}/products/related/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const getBraintreeClientToken = (userId,token) => {
  return fetch(`${API}/braintree/getToken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization : `Bearer ${token}`
    },

  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const processPayment = (userId,token,paymentData) => {
  return fetch(`${API}/braintree/payment/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization : `Bearer ${token}`
    },
    body:JSON.stringify(paymentData)

  })
    .then((response) => {
      //console.log("res:",response)
      return response.json();
    })
    .catch((err) => console.log(err));
};



export const createOrder = (userId,token,createOrderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization : `Bearer ${token}`
    },
    body:JSON.stringify({order: createOrderData})

  })
    .then((response) => {
      //console.log("res:",response)
      return response.json();
    })
    .catch((err) => console.log(err));
};




