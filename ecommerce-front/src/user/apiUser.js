import { API } from "../config";


// read for read user info
export const read = (userId,token) => {
  return fetch(`${API}/user/${userId}`, {
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

//update for update user profile
export const update = (userId,token,user) => {
    return fetch(`${API}/user/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
      },
      body:JSON.stringify(user)
  
    })
      .then((response) => {
        //console.log("res:",response)
        return response.json();
      })
      .catch((err) => console.log(err));
  };
  

  //for update localstorage because even if u signin or signout u see updated data ,user in argument of updateUser is updated info of user send from Profile component

  export const updateUser=(user,next)=>{
    if(typeof window != 'undefined')
    {
        if(localStorage.getItem('jwt'))
        {
            let auth=JSON.parse(localStorage.getItem('jwt'))
            auth.user=user
            localStorage.setItem('jwt',JSON.stringify(auth))
            //console.log("lsuser",user);
            //console.log(next());
            next()
        }

    }
  }


  export const getPurchaseHistory = (userId,token) => {
    return fetch(`${API}/orders/by/user/${userId}`, {
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
  