const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
// const status = require('../constants/status.js');

const prisma = new PrismaClient();
const CustomerModel = prisma.customer;

const create = async (req, res) => {
  const {
    name,
    phone,
    city,
    district,
    ward,
    citizenIdentificationNumber,
    email,
    dateOfEntry,
    roomId,
  } = req.body;
  // console.log({ req });
  try {
    console.log(req.file);
    if (!req.file) return res.status(500).json({ success: false });
    // return res.json({ success: true });
    const id = uuidv4();
    const newCustomer = {
      id,
      name,
      phone,
      city,
      district,
      ward,
      citizenIdentificationNumber,
      email,
      dateOfEntry,
      roomId,
      avatar: req.file.filename,
    };

    const result = await CustomerModel.create({ data: newCustomer });
    const room = await prisma.$queryRaw`
       UPDATE manage_building.room
       SET status = 1
       WHERE id = ${roomId}
    `;
    console.log({ result });
    if (!result | !room) return res.status(201).json({ success: false });

    return res.status(200).json({ success: true, message: 'Create successfully!!!', data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

const CustomerController = { create };

module.exports = CustomerController;
