import React, { useState } from "react";
import { Link } from "react-router-dom"; //example of use in sign in link after signup
import Layout from "../core/Layout";
import { signup } from "../auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value }); //error false becoz  when we donnot submit any thing  and submit click it gives error but after type again
    //error message disappear
  };

  const { name, email, password, success, error } = values;//to make thing easier we distructure here

  const clickSubmit = (event) => {
    event.preventDefault(); //when button clicked page going for reload we don't want so we use this
    setValues({ ...values, error: false }); //when it is submitted we want set to previous error false
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };
  const signUpFrom = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name} //when handle chenge happened handleChange method runs is update state what is the value of state that will be value of input field
        />
      </div>

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
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. please <Link to="/signin">Signin</Link>
    </div>
  );
  return (
    <Layout
      title="Signup"
      description="Sign up to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      
      {showSuccess()}
      {showError()}
      {signUpFrom()}

    </Layout>
  );
};

export default Signup;
