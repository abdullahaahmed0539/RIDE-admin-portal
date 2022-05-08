import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const uri = `${process.env.REACT_APP_SERVER_IP}/requests`;
const token = localStorage.getItem("token");
const header = { headers: { Authorization: `Bearer ${token}` } };

export const getAllRequests = async () => {
  const response = await axios.post(
    `${uri}/all_requests`,
    { username: localStorage.getItem("username") },
    header
  );
  return response;
};

export const getRequest = async _id => {
  const response = await axios.post(
    `${uri}/request_details`,
    {
      username: localStorage.getItem("username"),
      _id
    },
    header
  );
  return response;
};

export const changeStatus = async (_id, decision) => {
  const response = await axios.patch(
    `${uri}/change_request_status`,
    { username: localStorage.getItem("username"), _id, decision },
    header
  );
  return response;
};

