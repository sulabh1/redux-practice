import axios from "axios";

const baseUrl = axios.create({ baseURL: "http://localhost:3040/api/v1" });

export default baseUrl;
