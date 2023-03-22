export type UserType = {
  id: String;
  name: String;
  city: String;
  district: String;
  ward: String;
  phone: String;
  username: String;
  password: String;
  role: Number; //default 0: admin 1: customer
  status: Number; //default 0: non-active 1: active;
  approveBy?: String;
};

export type AuthType = {
  username: String;
  password: String;
};
