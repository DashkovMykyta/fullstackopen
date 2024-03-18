import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "./ui/button";
function ToggleVisibility(props) {
  const [visible, setVisible] = useState(false);

  return visible ? (
    <div>
      {props.children}
      <Button className="p-" onClick={() => setVisible(false)}>
        close
      </Button>
    </div>
  ) : (
    <div>
      <Button onClick={() => setVisible(true)}>{props.text}</Button>
    </div>
  );
}

ToggleVisibility.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ToggleVisibility;
