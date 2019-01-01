import React from 'react';
import { PropTypes } from 'prop-types';

class qSlot extends React.Component {
  render() {
    return (
      <div>{this.props.content}</div>
    );
  }
}

qSlot.propTypes = {
  content: PropTypes.string.isRequired
};

export default qSlot;
