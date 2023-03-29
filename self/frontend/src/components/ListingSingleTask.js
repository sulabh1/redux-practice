import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { singleTask } from "../actions/singleTask";
import { Table } from "react-bootstrap";

const ListingSingleTask = ({ singleTask, data }) => {
  const [completionRate, setCompletionRate] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const day = new Date(data.date) - new Date(data.createdAt);
    const remainingDay = new Date() - new Date(data.createdAt);

    if (
      +new Date(day).getDate() % +new Date(day).getDate() === 0 &&
      +new Date(day).getDate() / 2 === +new Date(remainingDay).getDate()
    ) {
      setCompletionRate("50%");
    } else if (+new Date(day).getDate() % +new Date(day).getDate() === 1) {
      setCompletionRate("75%");
    } else if (+new Date(day).getDate() % +new Date(day).getDate() === 0) {
      setCompletionRate("0%");
    }
    singleTask(id);
  }, []);

  const updateData = (e) => {
    e.preventDefault();
    navigate(`/tasks/update/${id}`);
  };

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
            <th>completion Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data?._id}</td>
            <td>{data?.name}</td>
            <td>{data?.date}</td>
            <td>{data?.user?.name}</td>
            <td>{data?.completed ? "completed" : "incomplete"}</td>
            <td>{completionRate}</td>
          </tr>
        </tbody>
      </Table>
      <button onClick={(e) => updateData(e)}>update data</button>
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
