const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const argon = require('argon2');
const { statusRoom, statusBuilding, statusCustomer } = require('../constants/status');
// const status = require('../constants/status.js');

const prisma = new PrismaClient();
const CustomerModel = prisma.customer;

const setStatusRoom = async (roomId) => {
  try {
    const totalPeople = await prisma.$queryRaw`
      SELECT COUNT(manage_building.customer.id) as totalPeople
      FROM manage_building.room INNER JOIN manage_building.customer
      ON manage_building.room.id = manage_building.customer.roomId
      WHERE manage_building.customer.status = ${statusCustomer.ACTIVE}
      AND manage_building.room.id = ${roomId}
    `;

    if (!totalPeople[0].totalPeople) {
      await prisma.$queryRaw`
      UPDATE manage_building.Room 
      SET dateStart = null, dateEnd = null
      WHERE id = ${roomId}
    `;
      return await prisma.$queryRaw`
      UPDATE manage_building.room
      SET status = ${statusRoom.EMPTY}, amountOfPeople = ${Number(totalPeople[0].totalPeople)}
      WHERE id = ${roomId}
    `;
    }

    return await prisma.$queryRaw`
        UPDATE manage_building.room
        SET status = ${statusRoom.HIRED}, amountOfPeople = ${Number(totalPeople[0].totalPeople)}
        WHERE id = ${roomId}
    `;
  } catch (error) {
    console.log({ error });
  }
};

const setStatusBuilding = async (buildingId) => {
  try {
    const listStatusRoom = await prisma.$queryRaw`
      SELECT manage_building.room.status as status
      FROM manage_building.building INNER JOIN manage_building.room 
      ON manage_building.room.buildingId = manage_building.building.id
      WHERE manage_building.building.id = ${buildingId}
    `;
    const isFullRoom = listStatusRoom.every((item) => item.status === statusRoom.HIRED);
    if (isFullRoom) {
      return await prisma.$queryRaw`
        UPDATE manage_building.building
        SET status = ${statusBuilding.HIRED}
        WHERE id = ${buildingId}
      `;
    }
    return await prisma.$queryRaw`
    UPDATE manage_building.building
    SET status = ${statusBuilding.EMPTY}
    WHERE id = ${buildingId}
  `;
  } catch (error) {
    console.log({ error });
  }
};

const create = async (req, res) => {
  const {
    name,
    phone,
    city,
    district,
    ward,
    gender,

    citizenIdentificationNumber,
    email,
    roomId,
    status,
    dateStart,
    dateEnd,
  } = req.body;
  // console.log({ req });
  try {
    // console.log(req.file);
    if (!req.file) return res.status(202).json({ success: false });

    // return res.json({ success: true });
    const id = uuidv4();
    const newCustomer = {
      id,
      name,
      phone,
      city,
      gender: Number(gender),
      district,
      ward,
      citizenIdentificationNumber,
      email,
      status: Number(status),
      roomId,
      avatar: req.file.filename,
    };

    const result = await CustomerModel.create({ data: newCustomer });

    if (!result) return res.status(201).json({ success: false });
    await prisma.$queryRaw`
      UPDATE manage_building.Room 
      SET dateStart = ${dateStart}, dateEnd = ${dateEnd}
      WHERE id = ${roomId}
    `;
    await setStatusRoom(roomId);
    const room = await prisma.$queryRaw`
      SELECT buildingId
      From manage_building.room INNER JOIN manage_building.customer ON manage_building.room.id = manage_building.customer.roomId
      WHERE roomId= ${roomId}
    `;
    const buildingId = room[0].buildingId;
    await setStatusBuilding(buildingId);
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
      SELECT COUNT(manage_building.customer.id) as totalRow
      FROM manage_building.building
      INNER JOIN manage_building.room
      ON manage_building.building.id = manage_building.room.buildingId
      INNER JOIN manage_building.customer
      ON manage_building.room.id = manage_building.customer.roomId
      WHERE (${buildingId || null} is null or manage_building.room.buildingId = ${buildingId})
      AND (${name || null} is null or manage_building.customer.name LIKE ${nameSearch}) 
      AND (${phone || null} is null or manage_building.customer.phone = ${phone})
      AND (${city || null} is null or manage_building.customer.city = ${city})
      AND (${district || null} is null or  manage_building.customer.district = ${district})
      AND (${ward || null} is null or manage_building.customer.ward = ${ward})
      AND (${roomId || null} is null or manage_building.customer.roomId = ${roomId})
      AND (${
        citizenIdentificationNumber || null
      } is null or manage_building.customer.citizenIdentificationNumber = ${citizenIdentificationNumber})
      AND (${email || null} is null or manage_building.customer.email = ${email})
      AND (${String(status) || null} is null or manage_building.customer.status = ${status})
      AND (${String(gender) || null} is null or manage_building.customer.gender = ${gender})
      AND (${dateStart || null} is null or manage_building.customer.dateOfEntry >= ${dateStart})
      AND (${dateEnd || null} is null or manage_building.customer.dateOfEntry <= ${dateEnd})
    `;

    const result = await prisma.$queryRaw`
      SELECT manage_building.customer.name,
        manage_building.customer.id, 
        manage_building.customer.email, 
        manage_building.customer.avatar, 
        manage_building.customer.city,
        manage_building.customer.district, 
        manage_building.customer.ward,
        manage_building.customer.status,
        manage_building.customer.citizenIdentificationNumber,
        manage_building.customer.phone,
        manage_building.customer.gender,
        manage_building.customer.dateOfEntry,
        manage_building.customer.roomId,
        manage_building.room.name as roomName
      FROM manage_building.building 
      INNER JOIN manage_building.room 
      ON manage_building.building.id = manage_building.room.buildingId
      INNER JOIN manage_building.customer 
      ON manage_building.room.id = manage_building.customer.roomId 
      WHERE (${name || null} is null or manage_building.customer.name LIKE ${nameSearch}) 
      AND (${phone || null} is null or manage_building.customer.phone = ${phone})
      AND (${city || null} is null or manage_building.customer.city = ${city})
      AND (${district || null} is null or  manage_building.customer.district = ${district})
      AND (${ward || null} is null or manage_building.customer.ward = ${ward})
      AND (${
        citizenIdentificationNumber || null
      } is null or manage_building.customer.citizenIdentificationNumber = ${citizenIdentificationNumber})
      AND (${roomId || null} is null or manage_building.customer.roomId = ${roomId})
      AND (${email || null} is null or manage_building.customer.email = ${email})
      AND (${String(status) || null} is null or manage_building.customer.status = ${status})
      AND (${String(gender) || null} is null or manage_building.customer.gender = ${gender})
      AND (${dateStart || null} is null or manage_building.customer.dateOfEntry >= ${dateStart})
      AND (${dateEnd || null} is null or manage_building.customer.dateOfEntry <= ${dateEnd})
      AND (${buildingId || null} is null or manage_building.room.buildingId = ${buildingId})
      ORDER BY dateOfEntry DESC
      LIMIT ${pageSize} OFFSET ${pageSize * (pageIndex - 1)}
    `;
    // console.log('first', handleUpdateAmountPeople());
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
    status,
    name,
    phone,
    city,
    district,
    ward,
    citizenIdentificationNumber,
    email,
    gender,
    roomId,
  } = req.body;
  try {
    const dataUpdate = {
      status,
      roomId,
      name,
      phone,
      city,
      district,
      ward,
      citizenIdentificationNumber,
      email,
      gender: Number(gender),
    };
    if (req && req.file) {
      dataUpdate.avatar = req.file.filename;
    }
    const currentRoomId = await prisma.$queryRaw`
      SELECT roomId FROM manage_building.customer 
      WHERE id = ${id};
    `;
    const result = await CustomerModel.update({
      where: { id },
      data: dataUpdate,
    });

    if (!result) return res.status(201).json({ success: false });
    if (roomId | status) {
      await setStatusRoom(currentRoomId[0].roomId);
      await setStatusRoom(roomId);
    }
    return res.status(200).json({
      success: true,
      message: 'Update successfully !!!',
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

const remove = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await prisma.$queryRaw`
      UPDATE manage_building.customer
      SET status = ${statusCustomer.NON_ACTIVE}
      WHERE id = ${id}
    `;
    if (!result) return res.status(201).json({ success: false });

    const inforRemove = await prisma.$queryRaw`
      SELECT buildingId, roomId 
      FROM manage_building.customer INNER JOIN manage_building.room 
      ON manage_building.customer.roomId = manage_building.room.id
      WHERE manage_building.customer.id = ${id}
    `;
    await setStatusRoom(inforRemove[0].roomId);

    await setStatusBuilding(inforRemove[0].buildingId);

    return res.status(200).json({ success: true, message: 'Remove successfully !!! ' });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

const CustomerController = { create, getAllCustomer, update, remove };

module.exports = CustomerController;
