import axios from "axios";
// sends req to backend
const API = axios.create({
    baseURL: "https://movie-recommendation-system-urau.onrender.com"
});

export default API;