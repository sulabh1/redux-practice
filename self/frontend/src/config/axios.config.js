import axios from "axios";

const baseUrl = axios.create({ baseURL: "http://localhost:2020/api/v1" });

export default baseUrl;
