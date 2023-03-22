const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const RoomModel = prisma.room;

const getAllRooms = async (req, res) => {
  const { buildingId } = req.body;
  try {
    const result = await prisma.$queryRaw`
        SELECT * FROM manage_building.room 
        WHERE buildingId = ${buildingId}
    `;

    if (!result) return res.status(500).json({ success: false });

    return res.status(200).json({ success: true, message: 'Successfully!!!', data: result });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
const update = async (req, res) => {
  const { id, payment, area, electricNumber, motorbikeAmount, domesticWaterFee, status } = req.body;
  try {
    const result = await RoomModel.update({
      where: { id },
      data: {
        payment,
        area,
        electricNumber,
        motorbikeAmount,
        domesticWaterFee,
        status,
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

const RoomController = { getAllRooms, update };

module.exports = RoomController;
