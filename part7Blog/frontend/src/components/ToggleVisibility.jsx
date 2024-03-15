import React, { useState } from "react";
import PropTypes from "prop-types";

function ToggleVisibility(props) {
  const [visible, setVisible] = useState(false);

  return visible ? (
    <div>
      {props.children}
      <button onClick={() => setVisible(false)}>close</button>
    </div>
  ) : (
    <div>
      <button onClick={() => setVisible(true)}>{props.text}</button>
    </div>
  );
}

ToggleVisibility.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ToggleVisibility;
