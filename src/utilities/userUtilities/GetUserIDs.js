import config from "../../constants";

const GetUserIDs = (users, index) => {
  const userIds = users
    .filter((user) => user.isShow)
    .slice(index, index + config.PAGE_SIZE)
    .map((user) => user.id);
  return userIds;
};

export default GetUserIDs;
