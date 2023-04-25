const { PrismaClient } = require('@prisma/client');
const { statusCustomer, statusRoom, statusGender, statusReport } = require('../constants/status');
const prisma = new PrismaClient();
const ReportModel = prisma.report;
const statisticalRoom = async (req, res) => {
  const { buildingId } = req.body;
  try {
    const totalRoom = await prisma.$queryRaw`
        SELECT COUNT(manage_building.room.id) as total
        FROM manage_building.building
        INNER JOIN manage_building.room
        ON manage_building.room.buildingId = manage_building.building.id
        WHERE manage_building.room.buildingId = ${buildingId}
    `;
    const totalRoomEmpty = await prisma.$queryRaw`
        SELECT COUNT(manage_building.room.id) as total
        FROM manage_building.building
        INNER JOIN manage_building.room
        ON manage_building.room.buildingId = manage_building.building.id
        WHERE manage_building.room.buildingId = ${buildingId}
        AND manage_building.room.status = ${statusRoom.EMPTY}
    `;

    if (!totalRoom || !totalRoomEmpty) return res.status(201).json({ success: false });

    return res.status(200).json({
      success: true,
      data: {
        totalRoom: Number(totalRoom[0].total),
        totalRoomEmpty: Number(totalRoomEmpty[0].total),
        totalRoomHired: Number(totalRoom[0].total) - Number(totalRoomEmpty[0].total),
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};
const statisticalCustomer = async (req, res) => {
  const { buildingId } = req.body;
  try {
    let today = new Date();
    console.log('month', today.getMonth() + 1);
    const totalCustomer = await prisma.$queryRaw`
        SELECT COUNT(manage_building.customer.id) as totalCustomer
        FROM manage_building.building
        INNER JOIN manage_building.room
        ON manage_building.building.id = manage_building.room.buildingId
        INNER JOIN manage_building.customer
        ON manage_building.room.id = manage_building.customer.roomId
        WHERE manage_building.building.id = ${buildingId}
    `;
    const totalCustomerActive = await prisma.$queryRaw`
        SELECT COUNT(manage_building.customer.id) as totalCustomer
        FROM manage_building.building
        INNER JOIN manage_building.room
        ON manage_building.building.id = manage_building.room.buildingId
        INNER JOIN manage_building.customer
        ON manage_building.room.id = manage_building.customer.roomId
        WHERE manage_building.building.id = ${buildingId}
        AND manage_building.customer.status = ${statusCustomer.ACTIVE}
    `;
    const totalCustomerOfMonth = await prisma.$queryRaw`
        SELECT COUNT(manage_building.customer.id) as totalCustomer
        FROM manage_building.building
        INNER JOIN manage_building.room
        ON manage_building.building.id = manage_building.room.buildingId
        INNER JOIN manage_building.customer
        ON manage_building.room.id = manage_building.customer.roomId
        WHERE manage_building.building.id = ${buildingId}
        AND MONTH(manage_building.customer.dateOfEntry) = ${today.getMonth() + 1}
    `;
    if (!totalCustomer || !totalCustomerActive || !totalCustomerOfMonth)
      return res.status(201).json({ success: false });

    return res.status(200).json({
      success: true,
      data: {
        totalCustomer: Number(totalCustomer[0].totalCustomer),
        totalCustomerActive: Number(totalCustomerActive[0].totalCustomer),
        totalCustomerNonActive:
          Number(totalCustomer[0].totalCustomer) - Number(totalCustomerActive[0].totalCustomer),
        totalCustomerOfMonth: Number(totalCustomerOfMonth[0].totalCustomer),
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};
const statisticalGender = async (req, res) => {
  const { buildingId } = req.body;
  try {
    const total = await prisma.$queryRaw`
        SELECT COUNT(manage_building.customer.id) as total
        FROM manage_building.building
        INNER JOIN manage_building.room
        ON manage_building.building.id = manage_building.room.buildingId
        INNER JOIN manage_building.customer
        ON manage_building.room.id = manage_building.customer.roomId
        WHERE manage_building.building.id = ${buildingId}
        AND manage_building.customer.status = ${statusCustomer.ACTIVE}
    `;
    const male = await prisma.$queryRaw`
        SELECT COUNT(manage_building.customer.id) as total
        FROM manage_building.building
        INNER JOIN manage_building.room
        ON manage_building.building.id = manage_building.room.buildingId
        INNER JOIN manage_building.customer
        ON manage_building.room.id = manage_building.customer.roomId
        WHERE manage_building.building.id = ${buildingId}
        AND manage_building.customer.gender = ${statusGender.MALE}
        AND manage_building.customer.status = ${statusCustomer.ACTIVE}
    `;
    const female = await prisma.$queryRaw`
        SELECT COUNT(manage_building.customer.id) as total
        FROM manage_building.building
        INNER JOIN manage_building.room
        ON manage_building.building.id = manage_building.room.buildingId
        INNER JOIN manage_building.customer
        ON manage_building.room.id = manage_building.customer.roomId
        WHERE manage_building.building.id = ${buildingId}
        AND manage_building.customer.gender = ${statusGender.FEMALE}
        AND manage_building.customer.status = ${statusCustomer.ACTIVE}
    `;
    if (!total || !male || !female) return res.status(201).json({ success: false });

    return res.status(200).json({
      success: true,
      data: {
        total: Number(total[0].total),
        male: Number(male[0].total),
        female: Number(female[0].total),
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};
const statisticalReport = async (req, res) => {
  const { buildingId } = req.body;
  try {
    const total = await prisma.$queryRaw`
        SELECT COUNT(manage_building.report.id) as total
        FROM manage_building.building
        INNER JOIN manage_building.room
        ON manage_building.building.id = manage_building.room.buildingId
        INNER JOIN manage_building.report
        ON manage_building.room.id = manage_building.report.roomId
        WHERE manage_building.building.id = ${buildingId}
    `;
    const paid = await prisma.$queryRaw`
        SELECT COUNT(manage_building.report.id) as total
        FROM manage_building.building
        INNER JOIN manage_building.room
        ON manage_building.building.id = manage_building.room.buildingId
        INNER JOIN manage_building.report
        ON manage_building.room.id = manage_building.report.roomId
        WHERE manage_building.building.id = ${buildingId}
        AND manage_building.report.status = ${statusReport.PAID}
    `;
    const unpaid = await prisma.$queryRaw`
        SELECT COUNT(manage_building.report.id) as total
        FROM manage_building.building
        INNER JOIN manage_building.room
        ON manage_building.building.id = manage_building.room.buildingId
        INNER JOIN manage_building.report
        ON manage_building.room.id = manage_building.report.roomId
        WHERE manage_building.building.id = ${buildingId}
        AND manage_building.report.status = ${statusReport.UNPAID}
    `;
    if (!total || !paid || !unpaid) return res.status(201).json({ success: false });

    return res.status(200).json({
      success: true,
      data: {
        total: Number(total[0].total),
        paid: Number(paid[0].total),
        unpaid: Number(unpaid[0].total),
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

const StatisticalRevenue = async (req, res) => {
  const { dateStart, dateEnd, buildingId } = req;
  try {
    const monthStart = dateStart.getMonth() + 1;
    const monthEnd = dateEnd.getMonth() + 1;
    // month.map((item) => {

    // })

    const result = await prisma.$queryRaw`
      SELECT SUM(manage_building.report.totalPayment) as totalPayment
      FROM manage_building.room
      INNER JOIN manage_building.report
      ON manage_building.room.id = manage_building.report.roomId
      AND buildingId = ${buildingId}
      AND manage_building.report.status = ${statusReport.PAID}
    `;
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

const StatisticalController = {
  statisticalCustomer,
  statisticalRoom,
  statisticalGender,
  statisticalReport,
};

module.exports = StatisticalController;
