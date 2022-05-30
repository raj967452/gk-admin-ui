import axios from "axios";
import { ProcessUsersResponse } from "../utilities";

const API_URL = process.env.REACT_APP_ADMIN_API;
const USER_DATA_END_POINT = process.env.REACT_APP_USER_DATA;

const getUsersData = () => {
  return (
    axios
      .get(API_URL + "/" + USER_DATA_END_POINT)
      //.get("./members.json")
      .then((res) => {
        return ProcessUsersResponse(res.data);
      })
      .catch((err) => getFallbackData())
  );
};

const getFallbackData = () => {
  axios
    .get("./members.json")
    .then((res) => {
      return ProcessUsersResponse(res.data);
    })
    .catch((error) => console.error(error));
};

export default getUsersData;
