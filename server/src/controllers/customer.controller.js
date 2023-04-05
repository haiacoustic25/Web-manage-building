const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const argon = require('argon2');
const { statusRoom, statusBuilding } = require('../constants/status');
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
    gender,
    username,
    password,
    citizenIdentificationNumber,
    email,
    roomId,
    status,
  } = req.body;
  // console.log({ req });
  try {
    // console.log(req.file);
    if (!req.file) return res.status(201).json({ success: false });
    const user = await prisma.$queryRaw`
    SELECT * FROM manage_building.customer
    WHERE username = ${username}
    `;
    // console.log({ user });
    if (user.length) return res.status(201).json({ success: false });
    // return res.json({ success: true });
    const id = uuidv4();
    const hashPassword = await argon.hash(password);
    const newCustomer = {
      id,
      name,
      phone,
      city,
      gender: Number(gender),
      district,
      ward,
      username,
      password: hashPassword,
      citizenIdentificationNumber,
      email,
      status: Number(status),
      roomId,
      avatar: req.file.filename,
    };

    const result = await CustomerModel.create({ data: newCustomer });

    // console.log({ result });
    if (!result) return res.status(201).json({ success: false });
    await prisma.$queryRaw`
       UPDATE manage_building.room
       SET status = ${statusRoom.HIRED}, amountOfPeople = amountOfPeople +1
       WHERE id = ${roomId}
    `;
    const room = await prisma.$queryRaw`
      SELECT buildingId
      From manage_building.room INNER JOIN manage_building.customer ON manage_building.room.id = manage_building.customer.roomId
      WHERE roomId= ${roomId}
    `;
    const buildingId = room[0].buildingId;
    const listStatusRoom = await prisma.$queryRaw`
      SELECT status FROM manage_building.room
      WHERE buildingId = ${buildingId}
    `;
    const isFullRoom = listStatusRoom.every((item) => item.status === statusRoom.HIRED);
    console.log({ isFullRoom });
    if (isFullRoom) {
      await prisma.$queryRaw`
        UPDATE manage_building.building
        SET status = ${statusBuilding.HIRED}
        WHERE id = ${buildingId}
      `;
    }
    // console.log({ room[0] });
    // room[0].buildingId

    return res.status(200).json({ success: true, message: 'Create successfully!!!', data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

const getAllCustomer = async (req, res) => {
  const {
    name,
    phone,
    city,
    district,
    ward,
    citizenIdentificationNumber,
    email,
    status,
    gender,
    roomId,
    dateStart,
    dateEnd,
    pageIndex,
    pageSize,
  } = req.body;

  try {
    const nameSearch = name + '%';
    const totalRow = await prisma.$queryRaw`
      SELECT COUNT(id) as totalRow
      FROM manage_building.customer
      WHERE (${name || null} is null or name LIKE ${nameSearch}) 
      AND (${phone || null} is null or phone = ${phone})
      AND (${city || null} is null or city = ${city})
      AND (${district || null} is null or district = ${district})
      AND (${ward || null} is null or ward = ${ward})
      AND (${
        citizenIdentificationNumber || null
      } is null or citizenIdentificationNumber = ${citizenIdentificationNumber})
      AND (${email || null} is null or email = ${email})
      AND (${gender || null} is null or gender = ${gender})
      AND (${status || null} is null or status = ${status})
      AND (${roomId || null} is null or roomId = ${roomId})
      AND (${dateStart || null} is null or dateOfEntry >= ${dateStart})
      AND (${dateEnd || null} is null or dateOfEntry <= ${dateEnd})
    `;

    const result = await prisma.$queryRaw`
      SELECT * FROM manage_building.customer
      WHERE (${name || null} is null or name LIKE ${nameSearch}) 
      AND (${phone || null} is null or phone = ${phone})
      AND (${city || null} is null or city = ${city})
      AND (${district || null} is null or district = ${district})
      AND (${ward || null} is null or ward = ${ward})
      AND (${
        citizenIdentificationNumber || null
      } is null or citizenIdentificationNumber = ${citizenIdentificationNumber})
      AND (${email || null} is null or email = ${email})
      AND (${status || null} is null or status = ${status})
      AND (${roomId || null} is null or roomId = ${roomId})
      AND (${dateStart || null} is null or dateOfEntry >= ${dateStart})
      AND (${dateEnd || null} is null or dateOfEntry <= ${dateEnd})
      ORDER BY dateOfEntry DESC
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
const getAllCustomerByBuildingId = async (req, res) => {
  const {
    buildingId,
    name,
    phone,
    city,
    district,
    ward,
    citizenIdentificationNumber,
    email,
    status,
    gender,
    roomId,
    dateStart,
    dateEnd,
    pageIndex,
    pageSize,
  } = req.body;

  try {
    const nameSearch = name + '%';
    const totalRow = await prisma.$queryRaw`
      SELECT COUNT(id) as totalRow
      FROM manage_building.customer
      WHERE (${name || null} is null or name LIKE ${nameSearch}) 
      AND (${phone || null} is null or phone = ${phone})
      AND (${city || null} is null or city = ${city})
      AND (${district || null} is null or district = ${district})
      AND (${ward || null} is null or ward = ${ward})
      AND (${
        citizenIdentificationNumber || null
      } is null or citizenIdentificationNumber = ${citizenIdentificationNumber})
      AND (${email || null} is null or email = ${email})
      AND (${gender || null} is null or gender = ${gender})
      AND (${status || null} is null or status = ${status})
      AND (${roomId || null} is null or roomId = ${roomId})
      AND (${dateStart || null} is null or dateOfEntry >= ${dateStart})
      AND (${dateEnd || null} is null or dateOfEntry <= ${dateEnd})
    `;

    const result = await prisma.$queryRaw`
      SELECT * FROM manage_building.customer
      WHERE (${name || null} is null or name LIKE ${nameSearch}) 
      AND (${phone || null} is null or phone = ${phone})
      AND (${city || null} is null or city = ${city})
      AND (${district || null} is null or district = ${district})
      AND (${ward || null} is null or ward = ${ward})
      AND (${
        citizenIdentificationNumber || null
      } is null or citizenIdentificationNumber = ${citizenIdentificationNumber})
      AND (${email || null} is null or email = ${email})
      AND (${status || null} is null or status = ${status})
      AND (${roomId || null} is null or roomId = ${roomId})
      AND (${dateStart || null} is null or dateOfEntry >= ${dateStart})
      AND (${dateEnd || null} is null or dateOfEntry <= ${dateEnd})
      ORDER BY dateOfEntry DESC
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
  const {
    id,
    name,
    phone,
    city,
    district,
    ward,
    citizenIdentificationNumber,
    email,
    gender,
    status,
  } = req.body;
  try {
    const result = await RoomModel.update({
      where: { id },
      data: {
        name,
        phone,
        city,
        district,
        ward,
        citizenIdentificationNumber,
        email,
        gender,
        status,
      },
    });

    if (!result) return res.status(201).json({ success: false });

    return res.status(200).json({
      success: true,
      message: 'Update successfully !!!',
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

const CustomerController = { create, getAllCustomer, getAllCustomerByBuildingId, update };

module.exports = CustomerController;
