import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tiffinyserverapp.herokuapp.com/",
});

export default axiosInstance;
