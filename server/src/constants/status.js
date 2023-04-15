const statusRoom = {
  EMPTY: 1, // phong trong
  HIRED: 2, // phong da thue
};
const statusBuilding = {
  EMPTY: 1, // phong trong
  HIRED: 2, // phong da thue
};
const statusCustomer = {
  ACTIVE: 1, // phong trong
  NON_ACTIVE: 2, // phong da thue
};
const statusGender = {
  FEMALE: 1, // phong da thue
  MALE: 2, // phong trong
};
const statusReport = {
  UNPAID: 1, // phong da thue
  PAID: 2, // phong trong
};

const status = { statusRoom, statusBuilding, statusCustomer, statusGender, statusReport };
module.exports = status;
