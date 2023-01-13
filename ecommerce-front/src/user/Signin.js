import React, { useState } from "react";
import { Redirect } from "react-router-dom"; //example of use in sign in link after signup
import Layout from "../core/Layout";
import { signin,authenticate,isAuthenticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "fogy@gmail.com",
    password: "123456",
    error: "",
    loading: false,//when signup is happening we can show loading some kind of loading text to user show that is happening they know that is happening
    redirectToReferrer:false,//initially false but when user sign in successfully we make it true and redirect to dashboard home page whatever
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value }); //error false becoz  when we donnot submit any thing  and submit click it gives error but after type again
    //error message disappear
  };

  const { email, password, loading, error, redirectToReferrer } = values;
  const{user}=isAuthenticated();

  const clickSubmit = (event) => {
    event.preventDefault(); //when button clicked page going for reload we don't want so we use this
    setValues({ ...values, error: false, loading:true }); //when it is submitted we want set to previous error false
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data,()=>{
          setValues({
            ...values,
            redirectToReferrer:true,
  
          });
        })
      }
    });
  };
  const signInFrom = () => (
    <form>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showLoading = () => (
    loading && (<div className="alert alert-info"><h2>loading.....</h2></div>)
  );

  //below used for redirect page after signin to dashboard
  const redirectUser = () =>{
    if(redirectToReferrer)
    {
        if(user && user.role===1)
        {
          return <Redirect to="/admin/dashboard" />
        }else{
          return <Redirect to="/user/dashboard" />
        }
    }
    if(isAuthenticated())
    {
      return <Redirect to="/" />
    }
  }
  return (
    <Layout
      title="Signin"
      description="Sign in to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signInFrom()}
      {redirectUser()}
     
    </Layout>
  );
};

export default Signin;


