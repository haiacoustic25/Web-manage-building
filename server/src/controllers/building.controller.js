const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();
const BuildingModel = prisma.building;
const RoomModel = prisma.room;
// const CustomnerModel = prisma.building;

const create = async (req, res) => {
  const { userId, city, district, ward, amountRooms } = req.body;

  try {
    const id = uuidv4();
    const building = {
      id,
      userId,
      city,
      district,
      ward,
      amountRooms,
    };

    const result = await BuildingModel.create({ data: building });

    const dataRooms = [];
    for (let i = 0; i < amountRooms; i++) {
      const idRooms = uuidv4();
      dataRooms.push({
        id: idRooms,
        name: `Phòng ${i + 1}`,
        amountOfPeople: 0,
        payment: 0,
        area: 0,
        buildingId: id,
        electricNumber: 0,
        motorbikeAmount: 0,
        domesticWaterFee: 0,
      });
    }
    console.log({ dataRooms });
    const createRooms = await RoomModel.createMany({ data: dataRooms });
    if (!result || !createRooms) return res.status(500).json({ success: false });

    return res.status(200).json({ success: true, message: 'Create successfully!!!', data: result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

const getAllBuildings = async (req, res) => {
  const { userId, pageIndex, city, district, ward, pageSize } = req.body;
  console.log({ userId, pageIndex, city, district, ward, pageSize });
  try {
    const result = await prisma.$queryRaw`
      SELECT *
      FROM manage_building.building
      WHERE userId = ${userId}
      AND (${city || null} is null or city = ${city})
      AND (${district || null} is null or district = ${district})
      AND (${ward || null} is null or ward = ${ward})
      LIMIT ${pageSize} OFFSET ${pageSize * (pageIndex - 1)}
      `;
    if (!result) return res.status(500).json({ success: false });

    return res.status(200).json({ success: true, message: 'Get all buildings', data: result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

const update = async (req, res) => {
  const { id, city, district, ward } = req.body;
  try {
    const result = await BuildingModel.update({
      where: { id },
      data: {
        city,
        district,
        ward,
      },
    });

    if (!result) return res.status(500).json({ success: false });

    return res.status(200).json({
      success: true,
      message: 'Update successfully !!!',
      data: result,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

const deleteBuilding = async (req, res) => {
  const { listBuildings } = req.body;
  console.log({ listBuildings });
  try {
    const result = await BuildingModel.deleteMany({
      where: { id: { in: listBuildings } },
    });

    if (!result) return res.status(500).json({ success: false });

    return res.status(200).json({
      success: true,
      message: 'Delete successfully !!!',
      //   data: result,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const BuildingController = { create, getAllBuildings, update, deleteBuilding };

module.exports = BuildingController;
