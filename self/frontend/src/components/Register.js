import React, { useState } from "react";
import { Card, Button, InputGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Register.css";
import { register } from "../actions/register";
import setAlert from "../actions/alert";

const Register = ({ isAuthenticated, setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { name, email, password, passwordConfirm } = formData;

  const onChange = (e) => {
    //setFormData({ ...formData, [e.target.name]: e.target.value });

    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setAlert("password didnot matched", "danger");
    } else {
      register({ name, email, password });
    }
  };

  return (
    <div className="register">
      <Card
        style={{ width: "40rem", borderRadius: "20px" }}
        className="register-container"
      >
        <Card.Body>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Name"
              aria-label="Name"
              aria-describedby="basic-addon1"
              required
              name="name"
              onChange={(e) => onChange(e)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
              name="email"
              required
              onChange={(e) => onChange(e)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              name="password"
              required
              onChange={(e) => onChange(e)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Password confirm"
              aria-label="PasswordConfirm"
              aria-describedby="basic-addon1"
              required
              name="passwordConfirm"
              onChange={(e) => onChange(e)}
            />
          </InputGroup>
          <Button variant="primary" onClick={(e) => onSubmit(e)}>
            Register
          </Button>
        </Card.Body>
        <br />
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </Card>
    </div>
  );
};

const mapStateToProp = (state) => {
  return {
    isAuthenticated: state.register.isAuthenticated,
  };
};

Register.prototype = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProp, { setAlert, register })(Register);
