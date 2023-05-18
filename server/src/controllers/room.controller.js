const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const { statusBuilding, statusRoom, statusCustomer } = require('../constants/status');

const prisma = new PrismaClient();
const RoomModel = prisma.room;
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
    buildingId,
    name,
    payment,
    area,
    motorbikeAmount,
    environmentFee,
    internetFee,
    domesticWaterFee,
    electricFee,
    floor,
  } = req.body;
  try {
    const id = uuidv4();
    const dataCreate = {
      id,
      name,
      payment,
      area,
      motorbikeAmount,
      environmentFee,
      internetFee,
      domesticWaterFee,
      electricFee,
      floor,
      buildingId: String(buildingId),
    };
    console.log({ dataCreate });
    const result = await RoomModel.create({ data: dataCreate });
    if (!result) return res.status(500).json({ success: false });

    const totalRooms = await prisma.$queryRaw`
      SELECT COUNT(id) as totalRoom 
      FROM manage_building.room
      where buildingId = ${buildingId}
    `;
    await prisma.$queryRaw`
      UPDATE manage_building.building
      SET amountRooms = ${Number(totalRooms[0].totalRoom)}
      WHERE id = ${buildingId}
    `;
    return res.status(200).json({ success: true, message: 'Create successfully!!!', data: result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

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
    limitPeople,
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
        limitPeople,
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

const createCustomer = async (req, res) => {
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
      dateOfEntry: new Date(dateStart),
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

const destroy = async (req, res) => {
  const { id, buildingId } = req.body;
  try {
    const result = await RoomModel.delete({
      where: { id: id },
    });

    if (!result) return res.status(201).json({ success: false });

    const totalRooms = await prisma.$queryRaw`
      SELECT COUNT(id) as totalRoom 
      FROM manage_building.room
      where buildingId = ${buildingId}
    `;
    await prisma.$queryRaw`
      UPDATE manage_building.building
      SET amountRooms = ${Number(totalRooms[0].totalRoom)}
      WHERE id = ${buildingId}
    `;
    return res.status(200).json({
      success: true,
      message: 'Delete successfully !!!',
      //   data: result,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

const RoomController = { create, getAllRooms, update, createCustomer, destroy };

module.exports = RoomController;
