import React from "react";
import PropTypes from "prop-types";

export default class DropTarget extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    onDragEnter: PropTypes.func,
    onDragLeave: PropTypes.func,
    onDragOver: PropTypes.func,
    onDrop: PropTypes.func
  };

  onDragEnter = e => {
    if (this.props.onDragEnter) {
      this.props.onDragEnter(e);
    }
  };

  onDragLeave = e => {
    if (this.props.onDragLeave) {
      this.props.onDragLeave(e);
    }
  };

  onDragOver = e => {
    e.preventDefault();
    if (this.props.onDragOver) {
      this.props.onDragOver(e);
    }
  };

  onDrop = e => {
    e.preventDefault();
    if (this.props.onDrop) {
      this.props.onDrop(e);
    }
  };

  render = () => (
    <div
      className="drop-target"
      onDragEnter={this.onDragEnter}
      onDragLeave={this.onDragLeave}
      onDragOver={this.onDragOver}
      onDrop={this.onDrop}
    >
      {this.props.children}
    </div>
  );
}
