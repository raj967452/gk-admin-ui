import React, { useState, useEffect, useRef } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import getUsersData from "./services/UserService";
import { searchUsers, getRecordIndex } from "./utilities";
import config from "./constants";

import { UsersList } from "./components/common";
import { PaginationBlock, ActionButtons } from "./components/molecules";
import { Header } from "./components";

const sortData = (users, sortKey, sortingDirection) => {
  users.sort((a, b) => {
    const relevantValueA = a[sortKey];
    const relevantValueB = b[sortKey];

    if (
      sortingDirection === config.SortingDirection.UNSORTED ||
      sortingDirection === config.SortingDirection.ASCENDING
    ) {
      if (relevantValueA < relevantValueB) return -1;
      if (relevantValueA > relevantValueB) return 1;
      return 0;
    } else {
      if (relevantValueA > relevantValueB) return -1;
      if (relevantValueA < relevantValueB) return 1;
      return 0;
    }
  });
};

const getNextSortingDirection = (sortingDirection) => {
  if (
    sortingDirection === config.SortingDirection.UNSORTED ||
    sortingDirection === config.SortingDirection.ASCENDING
  ) {
    return config.SortingDirection.DESCENDING;
  }
  return config.SortingDirection.ASCENDING;
};

function App() {
  const [users, setUsers] = useState([]);
  const [flattenedUsers, setFlattenedUsers] = useState({
    headers: [],
    users: [],
  });
  const [update, setUpdate] = useState(false);
  const [currentPage, onPageChange] = useState(1);
  const selectAllUsers = useRef(null);
  const index = getRecordIndex(currentPage);
  const [isLoading, setLoading] = useState(true);
  const [sortingDirections, setSortingDirections] = useState({});

  useEffect(() => {
    getUsersData().then((usersData) => {
      setUsers(usersData?.users);
      setFlattenedUsers(usersData);
      const { headers } = usersData;
      const ourSortingDirections = {};
      for (const header of headers) {
        ourSortingDirections[header] = config.SortingDirection.UNSORTED;
      }
      setSortingDirections(ourSortingDirections);
      setLoading(false);
    });
  }, []);
  const sortColumn = (sortKey) => {
    const newFlattenedUsers = {
      ...flattenedUsers,
      users: [...flattenedUsers.users],
    };
    console.log(newFlattenedUsers);
    const currentSortingDirection = sortingDirections[sortKey];

    sortData(newFlattenedUsers.users, sortKey, currentSortingDirection);
    const nextSortingDirection = getNextSortingDirection(
      currentSortingDirection
    );

    const newSortingDirections = { ...sortingDirections };
    newSortingDirections[sortKey] = nextSortingDirection;

    setFlattenedUsers(newFlattenedUsers);
    setSortingDirections(newSortingDirections);
  };

  const searchInUsers = (event) => {
    const filteredData = searchUsers(event.target.value, users);
    setUsers(filteredData);
  };

  const selectUser = (id) => {
    let temp = users;
    let index = temp.findIndex((user) => user.id === id);
    temp[index].isSelected = !temp[index].isSelected;
    setUsers(temp);
    setUpdate((prevState) => !prevState);
  };

  const selectAll = (event) => {
    const userIds = users
      .filter((user) => user.isShow)
      .slice(index, index + config.PAGE_SIZE)
      .map((user) => user.id);

    let temp = users.map((user) => {
      if (userIds.includes(user.id)) {
        user.isSelected = event.target.checked;
      }
      return user;
    });

    setUsers(temp);
    setUpdate(!update);
  };

  const deleteUser = (id) => {
    let temp = users.filter((user) => user.id !== id);
    setUsers(temp);
    setUpdate((prevState) => !prevState);
  };

  const editUser = (id) => {
    let temp = users;
    const index = temp.findIndex((user) => user.id === id);
    temp[index].isEdit = true;
    setUsers(temp);
    setUpdate((prevState) => !prevState);
  };

  const saveUser = (id, nameRef, emailRef, roleRef) => {
    let temp = users;
    const index = temp.findIndex((user) => user.id === id);
    console.log("index: ", index);
    temp[index].name = nameRef.current.value;
    temp[index].email = emailRef.current.value;
    temp[index].role = roleRef.current.value;
    temp[index].isEdit = false;
    setUsers(temp);
    setUpdate((prevState) => !prevState);
  };
  const deleteSelected = () => {
    setUsers((prevState) => prevState.filter((user) => !user.isSelected));
    selectAllUsers.current.checked = false;
  };

  return (
    <>
      <Header />
      <Container fluid>
        <h2 className="my-3">Search Users... </h2>
        <Form.Floating className="my-3">
          <Form.Control
            id="InputCustomSearch"
            type="text"
            placeholder="Search by name, email or role"
            onChange={searchInUsers}
            className="form-control"
          />
          <label htmlFor="InputCustomSearch">
            Search by name, email or role
          </label>
        </Form.Floating>
        <Row>
          <Col>
            <UsersList
              currentPage={currentPage}
              onPageChange={onPageChange}
              selectAll={selectAll}
              selectAllUsers={selectAllUsers}
              selectUser={selectUser}
              saveUser={saveUser}
              editUser={editUser}
              deleteUser={deleteUser}
              users={users
                .filter((user) => user.isShow)
                .slice(index, index + config.PAGE_SIZE)}
              isLoading={isLoading}
              headers={flattenedUsers?.headers}
              sortColumn={sortColumn}
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            {selectAllUsers?.current?.checked && (
              <ActionButtons deleteSelected={deleteSelected} />
            )}
          </Col>
          <Col md="auto">
            <PaginationBlock
              usersLength={users.filter((user) => user.isShow).length}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
