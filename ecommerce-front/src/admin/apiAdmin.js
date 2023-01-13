import { API } from "../config";

export const createCategory = (userId, token, category) => {
  //console.log(name,email,password);
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createProduct = (userId, token, product) => {
  //console.log(name,email,password);
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product,//product is form data
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}


export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
};

export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
};

export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type":"application/json",
      Authorization: `Bearer ${token}`
    },
    body:JSON.stringify({status,orderId}),
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
};


/**
 * to perform crud on product
 * get all products
 * get a single product
 * update single product
 * delete single product
 */

//below is for getting all the products
 export const getProducts = () => {
  return fetch(`${API}/products?limit=100`, {
    method: "GET"
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}


//below is for delete single product
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type":"application/json",
      Authorization: `Bearer ${token}`
    },
   
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
};

//below is for get single product
export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

//below is for update single product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body:product
   
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
};

