import React, { useState } from "react";
import { Card, InputGroup, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import login from "../actions/login";
import setAlert from "../actions/alert";

const Login = ({ login, isAuthenticated, setAlert }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });

    navigate("/tasks");
  };

  const { email, password } = formData;

  return (
    <div>
      <Card
        style={{ width: "40rem", borderRadius: "20px" }}
        className="register-container"
      >
        <Card.Body>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
              required
              name="email"
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

          <Button variant="primary" type="submit" onClick={(e) => onSubmit(e)}>
            Login
          </Button>
        </Card.Body>
        <br />
        <p>Don't have an account?</p>
        <Link to="/register">Register</Link>
      </Card>
    </div>
  );
};

Login.prototype = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
});

export default connect(mapStateToProp, { login, setAlert })(Login);
