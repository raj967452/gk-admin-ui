import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

const ActionButtons = (props) => {
  const { deleteSelected } = props;
  return (
    <Button variant="danger" onClick={deleteSelected}>
      Delete Selected
    </Button>
  );
};

ActionButtons.propTypes = {
  deleteSelected: PropTypes.func,
};

export default ActionButtons;
