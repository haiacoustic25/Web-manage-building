export type BuildingType = {
  id: String;
  city: String;
  district: String;
  ward: String;
  userId: String;
  amountRooms: Number;
  status: Number; // default 0: empty, 1:hired
};

export type RoomType = {
  name: String;
  status: Number; // default 0: empty, 1:hired 2//editing
  amountOfPeople: Number;
  payment: Number;
  area: Number;
  buildingId: String;
  electricNumber: String;
  motorbikeAmount: Number;
  domesticWaterFee: Number;
};
