import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { singleTask } from "../actions/singleTask";
import { Table } from "react-bootstrap";

const ListingSingleTask = ({ singleTask, data }) => {
  const { id } = useParams();

  useEffect(() => {
    singleTask(id);
  }, []);

  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Date</th>
            <th>User</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data?._id}</td>
            <td>{data?.name}</td>
            <td>{data?.date}</td>
            <td>{data?.user?.name}</td>
            <td>{data?.completed ? "completed" : "incomplete"}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

ListingSingleTask.propTypes = {
  singleTask: PropTypes.func.isRequired,
  data: PropTypes.object,
};

const mapStateToProp = (state) => ({
  singleTask: state.singleTask,
  data: state.task,
});

export default connect(mapStateToProp, { singleTask })(ListingSingleTask);
