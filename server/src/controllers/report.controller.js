const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();
const ReportModel = prisma.report;

const create = async (req, res) => {
  const {
    roomId,
    payment,
    environmentFee,
    domesticWaterNumber,
    electricNumber,
    domesticWaterFee,
    electricFee,
    internetFee,
  } = req.body;

  try {
    const id = uuidv4();
    const totalPayment =
      Number(payment) +
      Number(environmentFee) +
      Number(domesticWaterNumber) * Number(domesticWaterFee) +
      Number(electricNumber) * Number(electricFee) +
      Number(internetFee);
    const newReport = {
      id,
      roomId,
      payment,
      environmentFee,
      domesticWaterNumber,
      electricNumber,
      domesticWaterFee,
      electricFee,
      internetFee,
      totalPayment,
    };

    const result = await ReportModel.create({ data: newReport });
    if (!result) return res.status(201).json({ success: false, message: 'Fail' });

    return res.status(200).json({ success: true, message: 'Create successfully!!!', data: result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

const getAll = async (req, res) => {
  const { buildingId, roomId, status, dateStart, dateEnd, pageIndex, pageSize } = req.body;
  try {
    const totalRow = await prisma.$queryRaw`
      SELECT COUNT(buildingId) as totalRow
      FROM manage_building.report INNER JOIN manage_building.room
      ON manage_building.report.roomId = manage_building.room.id 
      INNER JOIN manage_building.building ON manage_building.room.buildingId = manage_building.building.id
      WHERE (${roomId || null} is null or manage_building.report.roomId = ${roomId})
      AND (${dateStart || null} is null or manage_building.report.createAt >= ${dateStart})
      AND (${dateEnd || null} is null or manage_building.report.createAt <= ${dateEnd})
      AND (${buildingId || null} is null or manage_building.building.id = ${buildingId})
      AND (${String(status) || null} is null or manage_building.report.status = ${String(status)})
    `;
    const result = await prisma.$queryRaw`
      SELECT manage_building.report.roomId,
      manage_building.report.id,
      manage_building.report.totalPayment,
      manage_building.report.payment,
      manage_building.report.environmentFee,
      manage_building.report.status,
      manage_building.report.internetFee,
      manage_building.report.electricFee,
      manage_building.report.domesticWaterFee,
      manage_building.report.domesticWaterNumber,
      manage_building.report.electricNumber,
      manage_building.report.createAt,
      manage_building.room.name as roomName
      FROM manage_building.report INNER JOIN manage_building.room
      ON manage_building.report.roomId = manage_building.room.id 
      INNER JOIN manage_building.building ON manage_building.room.buildingId = manage_building.building.id
      WHERE (${roomId || null} is null or manage_building.report.roomId = ${roomId})
      AND (${dateStart || null} is null or manage_building.report.createAt >= ${dateStart})
      AND (${dateEnd || null} is null or manage_building.report.createAt <= ${dateEnd})
      AND (${String(status) || null} is null or manage_building.report.status = ${String(status)})
      AND (${buildingId || null} is null or manage_building.building.id = ${buildingId})
      ORDER BY manage_building.report.createAt DESC
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
  const { id, domesticWaterNumber, electricNumber, status } = req.body;
  try {
    const result = await ReportModel.update({
      where: { id },
      data: {
        domesticWaterNumber,
        electricNumber,
        status,
      },
    });
    if (!result) return res.status(201).json({ success: false });
    return res.status(200).json({
      success: true,
      message: 'Update successfully',
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};
const ReportController = { create, getAll, update };

module.exports = ReportController;
