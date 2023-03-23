import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alert }) =>
  alert !== null &&
  alert.length > 0 &&
  alert.map((al) => (
    <div className={`alert alert-${al.alertType}`} key={al.id}>
      {al.msg}
    </div>
  ));

Alert.propTypes = {
  alert: PropTypes.array.isRequired,
};

const mapStateToProp = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProp)(Alert);
