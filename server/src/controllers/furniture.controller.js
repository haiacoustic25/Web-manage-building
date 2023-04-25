const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();
const FurnitureModel = prisma.furniture;
// const RoomModel = prisma.room;

const create = async (req, res) => {
  const { roomId, price, status, name } = req.body;
  try {
    const id = uuidv4();
    const furniture = {
      id,
      name,
      roomId,
      price: +price,
      status: +status,
      image: req.file ? req.file.filename : '',
    };

    const result = await FurnitureModel.create({ data: furniture });

    return res.status(200).json({ success: true, message: 'Create successfully!!!', data: result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

const getAll = async (req, res) => {
  const { roomId, status, pageIndex, pageSize } = req.body;
  try {
    const totalRow = await prisma.$queryRaw`
        SELECT COUNT(id) as totalRow FROM manage_building.furniture
        WHERE (${roomId || null} is null or roomId = ${roomId})
        AND (${status || null} is null or status = ${status})
    `;
    const result = await prisma.$queryRaw`
        SELECT manage_building.furniture.status,
            manage_building.furniture.price,
            manage_building.furniture.image,
            manage_building.furniture.name,
            manage_building.furniture.id,
            manage_building.furniture.roomId,
            manage_building.furniture.createdAt,
            manage_building.room.name as roomName
        FROM manage_building.furniture INNER JOIN manage_building.room 
        ON manage_building.furniture.roomId = manage_building.room.id
        WHERE (${roomId || null} is null or manage_building.furniture.roomId = ${roomId})
        AND (${status || null} is null or manage_building.furniture.status = ${status})
        ORDER BY manage_building.room.name DESC
        LIMIT ${pageSize} OFFSET ${pageSize * (pageIndex - 1)}
    `;
    if (!result) return res.status(201).json({ success: false });
    return res.status(200).json({
      success: true,
      message: 'Get all booking',
      data: result,
      totalRow: Number(totalRow[0].totalRow),
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};
const update = async (req, res) => {
  const { id, roomId, status, price } = req.body;
  try {
    const dataUpdate = {
      roomId,
      status: +status,
      price: +price,
    };
    if (req && req.file) {
      dataUpdate.image = req.file.filename;
    }
    const result = await FurnitureModel.update({
      where: { id },
      data: dataUpdate,
    });
    if (!result) return res.status(201).json({ success: false });
    return res.status(200).json({
      success: true,
      message: 'Update successfully',
      data: result,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

const FurnitureController = { create, getAll, update };

module.exports = FurnitureController;
