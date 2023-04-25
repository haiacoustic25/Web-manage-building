const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const RoomModel = prisma.room;

const getAllRooms = async (req, res) => {
  const { buildingId, priceFrom, priceTo, areaFrom, areaTo, status, floor } = req.body;
  try {
    const result = await prisma.$queryRaw`
        SELECT * FROM manage_building.room 
        WHERE buildingId = ${buildingId}
        AND (${priceFrom || null} is null or payment >= ${priceFrom})
        AND (${priceTo || null} is null or payment <= ${priceTo})
        AND (${areaFrom || null} is null or area >= ${areaFrom})
        AND (${areaTo || null} is null or area <= ${areaTo})
        AND (${floor || null} is null or floor = ${floor})
        AND (${String(status) || null} is null or status = ${status})
        ORDER BY name,id,buildingId ASC
    `;

    if (!result) return res.status(500).json({ success: false });

    return res.status(200).json({ success: true, message: 'Successfully!!!', data: result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};
const update = async (req, res) => {
  const {
    id,
    payment,
    area,
    motorbikeAmount,
    environmentFee,
    internetFee,
    domesticWaterFee,
    electricFee,
    floor,
    furniture,
    dateStart,
    dateEnd,
  } = req.body;
  try {
    const result = await RoomModel.update({
      where: { id },
      data: {
        payment,
        area,
        electricFee,
        motorbikeAmount,
        environmentFee,
        internetFee,
        domesticWaterFee,
        floor,
        furniture: JSON.stringify(furniture),
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
      },
    });

    if (!result) return res.status(201).json({ success: false });

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
