import { APIAddress } from '../constants/APIAdress';
import { UserType } from '../types/UserType';

export const displayAddress = (value: any) => {
  const city: any = APIAddress.find((item: any) => item.Id == value?.city);
  const district = city?.Districts?.find((item: any) => item.Id == value?.district);
  const ward = district?.Wards?.find((item: any) => item.Id == value?.ward);

  return `${ward?.Name} - ${district?.Name} - ${city?.Name}`;
};
