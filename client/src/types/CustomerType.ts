export type CustomerType = {
  id: String;
  name: String;
  avatar: String;
  phone: String;
  city: String;
  gender: Number;
  username: String;
  password: String;
  district: String;
  ward: String;
  dateOfEntry: Date;
  citizenIdentificationNumber: String;
  email?: String;
  status: Number; // default 0: active, 1:non-active
  roomId: String;
};
