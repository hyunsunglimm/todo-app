import axios from "axios";

const instance = axios.create({
  baseURL: "https://asia-northeast3-heropy-api.cloudfunctions.net/api",
  headers: {
    "content-type": "application/json",
    apikey: "KDT7_GrZ1eYBo",
    username: "KDT7_LimHyunSung",
  },
});

export default instance;
