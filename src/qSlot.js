import React from 'react';
import { PropTypes } from 'prop-types';

class qSlot extends React.Component {
  render() {
    return (
      <div>{this.props.text}</div>
    );
  }
}

qSlot.propTypes = {
  text: PropTypes.string.isRequired
};

export default qSlot;
