import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tiffinyserverapp.herokuapp.com/",
 //baseURL: "http://localhost:3002",
});

export default axiosInstance;
