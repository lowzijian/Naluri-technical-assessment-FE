import axios from "axios";
import { config } from "../configs/config";

export const client = axios.create({
  baseURL: config.connection_string,
  headers: {
    accept: "application/json",
  },
});
