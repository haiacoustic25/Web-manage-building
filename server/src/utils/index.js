const parseJwt = (token) => {
  try {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  } catch (error) {
    return null;
  }
};

const convertPhoneNumber = (phone) => {
  if (phone.includes('+84')) return phone;
  return '+84' + Number(phone);
};

const formatMoney = (money) => {
  return money.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
};

module.exports = { parseJwt, convertPhoneNumber, formatMoney };
