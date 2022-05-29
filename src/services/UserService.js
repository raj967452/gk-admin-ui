import axios from "axios";
import { ProcessUsersResponse } from "../utilities";

const API_URL = process.env.REACT_APP_ADMIN_API;
const USER_DATA_END_POINT = process.env.REACT_APP_USER_DATA;

const getUsersData = () => {
  return (
    axios
      //.get(API_URL + "/" + USER_DATA_END_POINT)
      .get("./members.json")
      .then((res) => {
        return ProcessUsersResponse(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
  );
};

export default getUsersData;
