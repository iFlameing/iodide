import React from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";

import { ContainedButton } from "../../../../shared/components/buttons";

const StyledAddButton = styled(ContainedButton)`
  margin: 0;
`;

export default class AddButton extends React.Component {
  static propTypes = {
    onAddButtonClick: PropTypes.func.isRequired
  };

  render = () => (
    <StyledAddButton onClick={this.props.onAddButtonClick}>
      Add files
    </StyledAddButton>
  );
}
