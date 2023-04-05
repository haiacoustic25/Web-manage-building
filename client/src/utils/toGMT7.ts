const toGMT7 = (value: any) => {
  if (!value) return null;
  var objDate;
  if (typeof value == 'object') objDate = value;
  else {
    objDate = new Date(value);
    if (typeof value == 'string' && value.indexOf('Z') > 0) {
      objDate.setHours(objDate.getHours() - 7);
    }
  }
  return objDate;
};

export default toGMT7;
