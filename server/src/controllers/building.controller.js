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

    const formatNameRoom = (index) => {
      if (index < 10) return `00${index}`;
      if (index < 100) return `0${index}`;
      return index;
    };

    const dataRooms = [];
    for (let i = 0; i < amountRooms; i++) {
      const idRooms = uuidv4();
      dataRooms.push({
        id: idRooms,
        name: `Phòng ${formatNameRoom(i + 1)}`,
        amountOfPeople: 0,
        payment: 0,
        area: 0,
        buildingId: id,
        motorbikeAmount: 0,
      });
    }
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
  try {
    const totalRow = await prisma.$queryRaw`
      SELECT COUNT(id) as totalRow
      FROM manage_building.building
      WHERE userId = ${userId}
      AND (${city || null} is null or city = ${city})
      AND (${district || null} is null or district = ${district})
      AND (${ward || null} is null or ward = ${ward})
    `;
    const result = await prisma.$queryRaw`
      SELECT *
      FROM manage_building.building
      WHERE userId = ${userId}
      AND (${city || null} is null or city = ${city})
      AND (${district || null} is null or district = ${district})
      AND (${ward || null} is null or ward = ${ward})
      ORDER BY createAt DESC
      LIMIT ${pageSize} OFFSET ${pageSize * (pageIndex - 1)}
      `;
    if (!result) return res.status(201).json({ success: false });

    return res.status(200).json({
      success: true,
      message: 'Get all buildings',
      data: result,
      totalRow: Number(totalRow[0].totalRow),
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

const update = async (req, res) => {
  const { id, city, district, ward, amountRooms } = req.body;
  try {
    const result = await BuildingModel.update({
      where: { id },
      data: {
        city,
        district,
        ward,
        amountRooms,
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
  const { buildingId } = req.body;
  try {
    const result = await BuildingModel.delete({
      where: { id: buildingId },
    });

    if (!result) return res.status(201).json({ success: false });

    return res.status(200).json({
      success: true,
      message: 'Delete successfully !!!',
      //   data: result,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

const BuildingController = { create, getAllBuildings, update, deleteBuilding };

module.exports = BuildingController;
