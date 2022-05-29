import { useRef, useId } from "react";
import PropTypes from "prop-types";
import styles from "./UserComponent.module.css";
import { PencilSquare, Trash3, Save2 } from "react-bootstrap-icons";
import { Form } from "react-bootstrap";

const User = (props) => {
  const { user, deleteUser, editUser, saveUser, selectUser } = props;
  const userId = useId();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);
  return (
    <tr
      key={userId + user.id}
      className={user.isSelected ? styles.selected : ""}
    >
      <td>
        <Form.Check
          aria-label={`checkbox-${user.id}`}
          type="checkbox"
          data={`${user.isSelected}`}
          onChange={() => selectUser(user.id)}
          checked={user.isSelected}
        />
      </td>
      <td>
        <input
          className={user.isEdit ? styles.editable : styles.disabled}
          disabled={!user.isEdit}
          type="text"
          ref={nameRef}
          name="name"
          defaultValue={user.name}
        />
      </td>
      <td>
        <input
          className={user.isEdit ? styles.editable : styles.disabled}
          disabled={!user.isEdit}
          type="email"
          ref={emailRef}
          name="email"
          defaultValue={user.email}
        />
      </td>
      <td>
        <input
          className={user.isEdit ? styles.editable : styles.disabled}
          disabled={!user.isEdit}
          type="text"
          ref={roleRef}
          name="role"
          defaultValue={user.role}
        />
      </td>
      <td className={styles.icons}>
        {user.isEdit ? (
          <Save2
            color="green"
            size={25}
            className="mr-4"
            onClick={() => saveUser(user.id, nameRef, emailRef, roleRef)}
          />
        ) : (
          <PencilSquare
            color="royalblue"
            size={25}
            className="mr-4"
            onClick={() => editUser(user.id)}
          />
        )}
        <Trash3 color="red" size={25} onClick={() => deleteUser(user.id)} />
      </td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
  selectUser: PropTypes.func,
};

export default User;
