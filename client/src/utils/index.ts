import { APIAddress } from '../constants/APIAdress';

export const displayAddress = (value: any) => {
  const city: any = APIAddress.find((item: any) => item.Id == value?.city);
  const district = city?.Districts?.find((item: any) => item.Id == value?.district);
  const ward = district?.Wards?.find((item: any) => item.Id == value?.ward);

  return `${ward?.Name} - ${district?.Name} - ${city?.Name}`;
};

export const formatMoney = (money: any) => {
  return money.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
};

export const percent = (value: number, total: number) => {
  return ((value * 100) / total).toFixed(0) || 0;
};

export const getMonth = (date: any) => {
  return new Date(date).getMonth() + 1;
};
export const getYear = (date: any) => {
  return new Date(date).getFullYear();
};
