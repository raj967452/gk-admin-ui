import ExtractObjectKeys from "./ExtractObjectKeys";

const ProcessUsersResponse = (users) => {
  const flattenedTableHeaders = ExtractObjectKeys(users[0]);
  users.map((user) => {
    user.isSelected = false;
    user.isEdit = false;
    user.isShow = true;
    return user;
  });
  return { headers: flattenedTableHeaders, users };
};

export default ProcessUsersResponse;
