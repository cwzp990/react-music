import axios from "axios";
import Toast from "../components/toast";

let instance = axios.create();

instance.interceptors.request.use((config) => {
  console.log(config);
  return config;
});

instance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (err) => {
    console.log(err);
  }
);

export default instance;
