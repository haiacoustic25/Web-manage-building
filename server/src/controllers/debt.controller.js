const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();
const DebtModel = prisma.debt;

const create = async (req, res) => {
  const { content, money, roomId } = req.body;
  try {
    const id = uuidv4();
    const result = await DebtModel.create({
      data: {
        id,
        roomId,
        content,
        money,
      },
    });
    if (!result) return res.status(201).json({ success: false, message: 'Fail' });
    return res.status(200).json({ success: true, message: 'Create successfully!!!', data: result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

const getAllDebt = async (req, res) => {
  const { buildingId } = req.body;
  try {
    const result = await prisma.$queryRaw`
        SELECT * 
        FROM manage_building.building inner join manage_building.room 
        ON manage_building.building.id = manage_building.room.buildingId
        inner join manage_building.debt 
        ON manage_building.debt.roomId = manage_building.room.id
        WHERE manage_building.building.id = ${buildingId}
    `;
    if (!result) return res.status(201).json({ success: false, message: 'Fail' });
    const newResult = [...new Set(result.map((a) => a.roomId))];
    const data = newResult
      .map((item) => {
        const arrTotal = result.filter((a1) => item == a1.roomId);
        const totalPayment = arrTotal.reduce((sum, a) => sum + a.money, 0);
        const obj = result.find((a1) => item == a1.roomId);
        const totalPaymentPaid = arrTotal
          .filter((_) => _.status == 2)
          .reduce((sum, a) => sum + a.money, 0);
        return {
          roomName: obj.name,
          roomId: item,
          totalPayment: totalPayment,
          totalPaymentPaid,
        };
      })
      .filter((item) => item.totalPayment - item.totalPaymentPaid > 0);
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};

const findDebtByRoomId = async (req, res) => {
  const { roomId } = req.params;
  console.log({ roomId });
  try {
    const result = await prisma.$queryRaw`
        SELECT * FROM manage_building.debt 
        WHERE roomId = ${roomId}
    `;
    if (!result) return res.status(201).json({ success: false, message: 'Fail' });
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};
const update = async (req, res) => {
  const { id, content, money, status } = req.body;
  try {
    const dataUpdate = { content, money, status };
    const result = await DebtModel.update({
      where: { id },
      data: dataUpdate,
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

const destroy = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await DebtModel.delete({
      where: { id: id },
    });
    if (!result) return res.status(201).json({ success: false });
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

const DebtController = { create, getAllDebt, update, destroy, findDebtByRoomId };

module.exports = DebtController;
