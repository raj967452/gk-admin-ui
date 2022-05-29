import PropTypes from "prop-types";
import { useEffect, useId } from "react";
import { Table, Form } from "react-bootstrap";
import User from "../userComponent/UserComponent";
import { Spinner } from "../../atoms";

const UsersList = (props) => {
  const {
    users,
    deleteUser,
    editUser,
    saveUser,
    selectAll,
    selectUser,
    selectAllUsers,
    onPageChange,
    currentPage,
    isLoading,
    headers,
    sortColumn
  } = props;

  useEffect(() => {
    if (users.length === 0 && currentPage > 1) onPageChange(currentPage - 1);
  }, [currentPage, onPageChange, users.length]);

  const userId = useId();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : users.length === 0 && currentPage === 1 ? (
        <div>NO USERS IN THE SYSTEM</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <Form.Check
                  aria-label="Select All"
                  type="checkbox"
                  onChange={selectAll}
                  name="selectAllUsers"
                  ref={selectAllUsers}
                />
              </th>
              {headers &&
                headers.map((headerString, headerIdx) => (
                  <th key={headerIdx} style={{ textTransform: "capitalize" }} onClick={() =>sortColumn(headerString)}>
                    {headerString}
                  </th>
                ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return user.isShow ? (
                <User
                  key={userId + user.id}
                  user={user}
                  selectUser={selectUser}
                  saveUser={saveUser}
                  editUser={editUser}
                  deleteUser={deleteUser}
                />
              ) : (
                ""
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

UsersList.propTypes = {
  users: PropTypes.array,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
  selectAll: PropTypes.func,
  selectOne: PropTypes.func,
  selectAllUsers: PropTypes.object,
  onPageChange: PropTypes.func,
  page: PropTypes.number,
};

export default UsersList;
