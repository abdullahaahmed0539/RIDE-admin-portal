import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const uri = `${process.env.REACT_APP_SERVER_IP}/users`;
export const login = async data => await axios.post(`${uri}/login`, data);



