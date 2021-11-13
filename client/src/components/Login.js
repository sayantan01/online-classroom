import React, { useState } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import { login } from "../actions/creators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [passwdshow, setPasswdshow] = useState(0);
  let passwdicon = passwdshow === 1 ? faEye : faEyeSlash;

  const onChangeEmail = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      email: e.target.value,
    }));
  };
  const onChangePassword = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      password: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      email: values.email,
      password: values.password,
    };
    props.dispatch(login(userObj));
    setSubmitted(true);
  };

  return (
    <div className="container">
      {props.token !== null && <Redirect to="/dashboard" />}
      {submitted && props.errors && (
        <Alert
          variant="warning"
          onClose={() => setSubmitted(false)}
          dismissible
        >
          {props.errors}
        </Alert>
      )}
      <form onSubmit={onSubmit}>
        <div className="d-grid gap-2 col-6 mx-auto text-center my-4">
          <h2 className="form-title">Login</h2>
        </div>

        <div className="d-grid gap-2 col-6 mx-auto my-3">
          <label>
            Email<sup style={{ color: "red" }}>*</sup>
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email ID"
            value={values.email}
            onChange={onChangeEmail}
            required
          />
        </div>
        <div className="d-grid gap-2 col-6 mx-auto my-3">
          <label>
            Password<sup style={{ color: "red" }}>*</sup>
          </label>
          <div className="input-group">
            <button onClick={() => setPasswdshow(1 - passwdshow)}>
              <FontAwesomeIcon icon={passwdicon} />
            </button>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={values.password}
              onChange={onChangePassword}
              required
            />
          </div>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto my-3">
          <input
            type="submit"
            className="btn btn-success"
            value="Login"
            disabled={
              values.email.length === 0 || values.password.length === 0
                ? true
                : false
            }
          />
        </div>
      </form>
      <div className="d-grid gap-2 col-6 mx-auto my-4 text-center">
        <p>
          Don't have an account?{" "}
          <a href="/login" class="link-primary">
            Create an account here
          </a>
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    token: state.token,
    errors: state.msg,
  };
};
export default connect(mapStateToProps)(Login);
