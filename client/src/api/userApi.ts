import axiosConfig from "./configAxios";

export const UserAPI = {
  login: (body: any) => axiosConfig.post("/user/login", body),
};
