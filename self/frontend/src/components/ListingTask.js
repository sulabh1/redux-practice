import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

import { task } from "../actions/task";

const ListingTask = ({ task, data }) => {
  useEffect(() => {
    task();
  }, []);

  data.map((el) => {
    console.log(el);
  });
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProp = (state) => ({
  task: state.task,
  data: state.task,
});

ListingTask.prototype = {
  task: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default connect(mapStateToProp, { task })(ListingTask);
