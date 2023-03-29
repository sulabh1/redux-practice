import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { task } from "../actions/task";

const ListingTask = ({ task, data }) => {
  const navigate = useNavigate();

  useEffect(() => {
    task();
  }, [task]);

  const clickHandler = (e, id) => {
    navigate(`/tasks/${id}`);
  };

  const listingTask =
    data?.task?.length > 0 ? (
      data?.task?.map((el, i) => (
        <Table striped bordered hover key={i}>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>date</th>
              <th>User</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody onClick={(e) => clickHandler(e, el._id)}>
            <tr>
              <td>{el._id}</td>
              <td>{el.name}</td>
              <td>{el.date}</td>
              <td>{el.user.name}</td>
              <td>{el.completed === true ? "completed" : "incomplete"}</td>
            </tr>
          </tbody>
        </Table>
      ))
    ) : (
      <h1>No data found</h1>
    );

  return <div>{listingTask}</div>;
};

const mapStateToProp = (state) => ({
  task: state.task,
  data: state.task,
});

ListingTask.prototype = {
  task: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default connect(mapStateToProp, { task })(ListingTask);
