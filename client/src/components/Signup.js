import React, { useState } from "react";
import axios from "axios";
import { Redirect, withRouter } from "react-router";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Signup(props) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    usertype: "",
  });
  const [successful, setSuccessful] = useState(false);
  const [signuperror, setSignuperror] = useState("");
  const [passwdshow, setPasswdshow] = useState(0);
  let passwdicon = passwdshow === 1 ? faEye : faEyeSlash;

  const onChangeName = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      name: e.target.value,
    }));
  };
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
  const onChangeUsertype = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      usertype: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      name: values.name,
      email: values.email,
      password: values.password,
      usertype: values.usertype,
    };
    axios
      .post("api/user/signup", userObj)
      .then((res) => {
        console.log("User registered successfully!");
        setSuccessful(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status !== 500) setSignuperror(err.response.data.msg);
        else setSignuperror("Internal server error");
      });
  };

  return (
    <div className="container">
      {props.token !== null && <Redirect to="/dashboard" />}
      {successful === false && signuperror && (
        <Alert variant="warning" onClose={() => setSignuperror("")} dismissible>
          {signuperror}
        </Alert>
      )}
      {successful && (
        <Alert
          variant="success"
          onClose={() => setSuccessful(false)}
          dismissible
        >
          Successfully registered. Go to Login page
        </Alert>
      )}
      <form onSubmit={onSubmit}>
        <div className="d-grid gap-2 col-6 mx-auto text-center my-4">
          <h2 className="form-title">Create Account</h2>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto my-3">
          <label>
            Name<sup style={{ color: "red" }}>*</sup>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={values.name}
            onChange={onChangeName}
            required
          />
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
              type={passwdshow === 0 ? "password" : "text"}
              className="form-control"
              placeholder="Password"
              value={values.password}
              onChange={onChangePassword}
            />
          </div>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto my-3">
          <label>
            Role<sup style={{ color: "red" }}>*</sup>
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="teacher"
              value="teacher"
              onChange={onChangeUsertype}
            />
            <label className="form-check-label">Teacher</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="student"
              value="student"
              onChange={onChangeUsertype}
            />
            <label className="form-check-label">Student</label>
          </div>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <input
            type="submit"
            className="btn btn-success"
            value="Signup"
            disabled={
              values.email.length === 0 ||
              values.name.length === 0 ||
              values.password.length === 0 ||
              values.usertype.length === 0
                ? true
                : false
            }
          />
        </div>
      </form>
      <div className="d-grid gap-2 col-6 mx-auto my-4 text-center">
        <p>
          Already have an account?{" "}
          <a href="/login" class="link-primary">
            Login here
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
export default connect(mapStateToProps)(withRouter(Signup));
