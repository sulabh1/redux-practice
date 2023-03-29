import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

import updateTask from "../actions/updateTask";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

const UpdateTask = ({ updateTask }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [radio, setRadio] = useState(false);
  const { id } = useParams();

  const onChange = (e) => setName(e.target.value);

  const onChangeInput = (e) => {
    setRadio(!radio);
  };

  const dateOnChange = (e) => {
    const dateObj = new Date(e._d);
    const isoDate = dateObj.toISOString();
    setDate(isoDate);
  };

  const onClick = (e) => {
    e.preventDefault();
    updateTask({ name, date, completed: radio, id });
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
    </div>
  );
};

UpdateTask.propTypes = {
  updateTask: PropTypes.func.isRequired,
};

export default connect(null, { updateTask })(UpdateTask);
