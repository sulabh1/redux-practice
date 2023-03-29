import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import createTask from "../actions/createTask";
import ListingTask from "./ListingTask";

const Tasks = ({ createTask }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [radio, setRadio] = useState(false);

  const onChange = (e) => setName(e.target.value);

  const onChangeInput = (e) => {
    // console.log();
    setRadio(!radio);
  };

  const dateOnChange = (e) => {
    const dateObj = new Date(e._d);
    const isoDate = dateObj.toISOString();
    setDate(isoDate);
  };

  const onClick = (e) => {
    e.preventDefault();
    createTask({ name, date, completed: radio });
  };
  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Task Name"
          aria-label="Task Name"
          aria-describedby="basic-addon1"
          required
          name="name"
          onChange={(e) => onChange(e)}
        />
      </InputGroup>
      <p>Last date of complete the task</p>

      <Datetime onChange={(e) => dateOnChange(e)} />

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={radio}
          id="flexCheckDefault"
          onChange={(e) => onChangeInput(e)}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          completed?
        </label>
      </div>

      <br />
      <Button variant="primary" onClick={(e) => onClick(e)}>
        Submit
      </Button>
      <ListingTask />
    </div>
  );
};

Tasks.prototype = {
  tasks: PropTypes.func.isRequired,
};

export default connect(null, { createTask })(Tasks);
