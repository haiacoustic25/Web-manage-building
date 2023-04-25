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
const sendEmailPayment = async (req, res) => {
  // ubqfomgnsjwxzyxe
  const { id } = req.body;
  console.log(id);
  try {
    const report = await prisma.$queryRaw`
        SELECT * FROM manage_building.report WHERE id = ${id};
      `;
    const { roomId, totalPayment, domesticWaterNumber, electricNumber, createAt } = report[0];

    const customer = await prisma.$queryRaw`
        SELECT email
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
    console.log(transport);
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
            function (error, info) {
              if (error) {
                return res.status(201).json({ success: false });
              } else {
                console.log('Email sent: ' + info.response);
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
const HistoryController = { create, getAll, sendEmailPayment };

module.exports = HistoryController;
