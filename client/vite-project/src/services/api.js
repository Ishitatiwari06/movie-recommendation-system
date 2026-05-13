import axios from "axios";
// sends req to backend
const API = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

export default API;