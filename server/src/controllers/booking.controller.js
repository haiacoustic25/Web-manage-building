const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();
const BookingModel = prisma.booking;
// const RoomModel = prisma.room;

const create = async (req, res) => {
  const { roomId, price } = req.body;
  try {
    const id = uuidv4();
    const booking = {
      id,
      roomId,
      price: +price,
    };

    const result = await BookingModel.create({ data: booking });

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
        SELECT COUNT(id) as totalRow FROM manage_building.booking
        WHERE (${roomId || null} is null or roomId = ${roomId})
        AND (${status || null} is null or status = ${status})
    `;
    const result = await prisma.$queryRaw`
        SELECT manage_building.booking.status,
            manage_building.booking.price,
            manage_building.booking.id,
            manage_building.booking.roomId,
            manage_building.booking.createdAt,
            manage_building.room.name as roomName
        FROM manage_building.booking INNER JOIN manage_building.room 
        ON manage_building.booking.roomId = manage_building.room.id
        WHERE (${roomId || null} is null or manage_building.booking.roomId = ${roomId})
        AND (${status || null} is null or manage_building.booking.status = ${status})
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
    const result = await BookingModel.update({
      where: { id },
      data: { roomId, status, price: +price },
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

const BookingController = { create, getAll, update };

module.exports = BookingController;
