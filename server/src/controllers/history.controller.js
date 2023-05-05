const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const { statusCustomer } = require('../constants/status');
const nodeMailer = require('nodemailer');
const { formatMoney } = require('../utils');

const prisma = new PrismaClient();
const HistoryEmailModel = prisma.historyEmail;
// const RoomModel = prisma.room;

const getAll = async (req, res) => {
  const { name, buildingId, pageIndex, pageSize } = req.body;
  try {
    const nameSearch = name + '%';
    const totalRow = await prisma.$queryRaw`
        SELECT COUNT(manage_building.historyemail.id) as totalRow 
        FROM manage_building.historyemail INNER JOIN manage_building.customer
        ON manage_building.historyemail.customerId = manage_building.customer.id
        INNER JOIN manage_building.room 
        ON manage_building.room.id = manage_building.customer.roomId
        WHERE (${name || null} is null or manage_building.customer.name LIKE ${nameSearch}) 
        AND (buildingId = ${buildingId})
    `;
    const result = await prisma.$queryRaw`
      SELECT manage_building.historyemail.id,
      manage_building.historyemail.title,
      manage_building.historyemail.content,
      manage_building.customer.name as customerName,
      manage_building.historyemail.createAt
      FROM manage_building.historyemail INNER JOIN manage_building.customer
      ON manage_building.historyemail.customerId = manage_building.customer.id
      INNER JOIN manage_building.room 
      ON manage_building.room.id = manage_building.customer.roomId
      WHERE (${name || null} is null or manage_building.customer.name LIKE ${nameSearch}) 
      AND (buildingId = ${buildingId})
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
const sendEmailPayment = async (req, res) => {
  // ubqfomgnsjwxzyxe
  const { id } = req.body;
  try {
    const report = await prisma.$queryRaw`
        SELECT * FROM manage_building.report WHERE id = ${id};
      `;
    const { roomId, totalPayment, domesticWaterNumber, electricNumber, createAt } = report[0];

    const customer = await prisma.$queryRaw`
        SELECT email,id
        FROM manage_building.customer
        WHERE roomId = ${roomId}
        AND status = ${statusCustomer.ACTIVE}
      `;
    const user = await prisma.$queryRaw`
        SELECT manage_building.user.email as email,
        manage_building.user.password_email as passEmail
        FROM manage_building.customer INNER JOIN manage_building.room 
        ON manage_building.customer.roomId = manage_building.room.id
        INNER JOIN manage_building.building 
        ON manage_building.room.buildingId = manage_building.building.id
        INNER JOIN manage_building.user
        ON manage_building.building.userId = manage_building.user.id
        WHERE manage_building.customer.roomId = ${roomId}
      `;

    const { email, passEmail } = user[0];
    const transport = nodeMailer.createTransport({
      service: 'gmail', // true for 465, false for other ports
      auth: {
        user: `${email}`,
        pass: `${passEmail}`,
      },
    });
    transport.verify(function (error, success) {
      if (error) {
        return res.status(201).json({ success: false, message: 'Wrong password' });
      } else {
        // console.log('Server is ready to take our messages');
        customer.map(async (item) => {
          await transport.sendMail(
            {
              from: `${email}`, // sender address
              to: `${item.email}`, // list of receivers
              subject: `Tiền phòng tháng ${createAt.getMonth() + 1}`, // Subject line
              text: `
                Tổng tiền: ${formatMoney(totalPayment)},
                Số nước: ${domesticWaterNumber} khối nước,
                Số điện: ${electricNumber} kwh
              `, // plain text body
              // html: '<b>Hello world?</b>', // html body
            },
            async function (error, info) {
              if (error) {
                return res.status(201).json({ success: false });
              } else {
                console.log('Email sent: ' + info.response);
                const id = uuidv4();
                const newHistory = {
                  id,
                  title: `Tiền phòng tháng ${createAt.getMonth() + 1}`,
                  content: `
                    Tổng tiền: ${formatMoney(totalPayment)},
                    Số nước: ${domesticWaterNumber} khối nước,
                    Số điện: ${electricNumber} kwh
                  `,
                  customerId: item.id,
                };
                await HistoryEmailModel.create({
                  data: newHistory,
                });
              }
            }
          );
        });
        return res.status(200).json({ success: true });
      }
    });
    // if (!transport) return res.status(201).json({ success: false, message: 'Wrong password' });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};
const HistoryController = { getAll, sendEmailPayment };

module.exports = HistoryController;
