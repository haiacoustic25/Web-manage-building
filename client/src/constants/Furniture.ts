export const FurnitureValue: any = {
  Television: 1,
  Bed: 2,
  Table: 3,
  Chair: 4,
  Fridge: 5,
  AirConditioning: 6,
  ElectricWaterHeater: 7,
  Wardrobe: 8,
  InductionCooker: 9,
  Gas: 10,
  GasStove: 11,
};
export const FurnitureLabel: any = {
  Television: 'Tivi',
  Bed: 'Giường',
  Table: 'Bàn',
  Chair: 'Ghế',
  Fridge: 'Tủ lạnh',
  AirConditioning: 'Điều hòa',
  ElectricWaterHeater: 'Bình nóng lạnh',
  Wardrobe: 'Tủ quần áo',
  InductionCooker: 'Bếp từ',
  Gas: 'Bình ga',
  GasStove: 'Bếp ga',
};

export const FurnitureArr = [
  {
    value: FurnitureValue.Television,
    label: FurnitureLabel.Television,
  },
  {
    value: FurnitureValue.Bed,
    label: FurnitureLabel.Bed,
  },
  {
    value: FurnitureValue.AirConditioning,
    label: FurnitureLabel.AirConditioning,
  },
  {
    value: FurnitureValue.Chair,
    label: FurnitureLabel.Chair,
  },
  {
    value: FurnitureValue.ElectricWaterHeater,
    label: FurnitureLabel.ElectricWaterHeater,
  },
  {
    value: FurnitureValue.Fridge,
    label: FurnitureLabel.Fridge,
  },
  {
    value: FurnitureValue.GasStove,
    label: FurnitureLabel.GasStove,
  },
  {
    value: FurnitureValue.Gas,
    label: FurnitureLabel.Gas,
  },
  {
    value: FurnitureValue.Table,
    label: FurnitureLabel.Table,
  },
  {
    value: FurnitureValue.InductionCooker,
    label: FurnitureLabel.InductionCooker,
  },
  {
    value: FurnitureValue.Wardrobe,
    label: FurnitureLabel.Wardrobe,
  },
];

export const getFurniture = (value: any) => {
  const keys = Object.keys(FurnitureValue).find((key) => FurnitureValue[key] === value);

  return FurnitureLabel[`${keys}`];
  //   return Object.values(FurnitureLabel).find((key) => key === keys);
};
