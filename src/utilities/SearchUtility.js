const searchUsers = (searchText, users) => {
  let tempSearch = searchText.toLowerCase();

  return users.map((user) => {
    user.isShow =
      user.name.toLowerCase().includes(tempSearch) ||
      user.email.toLowerCase().includes(tempSearch) ||
      user.role.toLowerCase().includes(tempSearch)
        ? true
        : false;
    return user;
  });
};
export default searchUsers;
