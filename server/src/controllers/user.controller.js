const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { parseJwt } = require('../utils');
const argon = require('argon2');

const prisma = new PrismaClient();
const UserModel = prisma.user;

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(201).json({ success: false, message: 'Missing information!' });
  try {
    const user = await UserModel.findUnique({ where: { username } });
    // console.log({ user });
    if (!user) return res.status(201).json({ success: false, message: 'Username do not exist!' });

    const pass = await argon.verify(user.password, password);
    if (!pass) {
      return res.status(200).json({ success: false, message: 'Wrong password' });
    }
    const {
      id,
      name,
      avatar,
      city,
      district,
      ward,
      phone,
      email,
      password_email,
      address,
      citizenIdentificationNumber,
      dateRange,
      issuedBy,
      permanentAddress,
      dateOfBirth,
    } = user;

    const secretKey = process.env.SECRET_JWT || '';
    // console.log({ secretKey });
    const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
      expiresIn: '24h',
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful!!!',
      token,
      data: {
        id,
        name,
        avatar,
        city,
        district,
        ward,
        phone,
        username,
        email,
        password_email,
        address,
        citizenIdentificationNumber,
        dateRange,
        issuedBy,
        permanentAddress,
        dateOfBirth,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

const register = async (req, res) => {
  const { name, city, district, ward, phone, username, password, status, email, password_email } =
    req.body;
  if (!name || !username || !password)
    return res.status(201).json({ success: false, message: 'Missing information!' });

  try {
    const user = await UserModel.findUnique({ where: { username } });
    if (user) return res.status(200).json({ success: false, message: 'Username already exists' });

    const hashPassword = await argon.hash(password);
    const id = uuidv4();
    // if (!req.file) return res.status(500).json({ success: false });
    const newUser = {
      id,
      name,
      city,
      district,
      ward,
      phone,
      username,
      password: hashPassword,
      email,
      password_email,
      status,
      avatar: req.file ? req.file.filename : '',
    };
    // console.log({ newUser });
    const result = await UserModel.create({
      data: newUser,
    });

    if (!result) return res.status(500).json({ success: false });

    const secretKey = process.env.SECRET_JWT || '';

    const token = jwt.sign({ user_id: result.id.toString() }, secretKey, {
      expiresIn: '24h',
    });

    return res.status(200).json({
      success: true,
      message: 'Register successfully!!!',
      token,
      data: newUser,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
  // res.send("123");
};

const getUserByToken = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    var authorization = parseJwt(req.headers.authorization);
    // console.log(authorization);
    // try {
    //   decoded = jwt.verify(authorization, secret.secretToken);
    // } catch (e) {
    //   return res.status(401).json({ error: e });
    // }
    if (!authorization) return res.status(401).json({ message: 'Access toke not defined!' });

    var userId = authorization.user_id;
    const user = await UserModel.findUnique({ where: { id: Number(userId) } });

    if (!user)
      return res.status(201).json({
        success: false,
        message: 'Access toke not defined! ',
      });

    const { name, phone, address, username, status } = user;
    return res.status(200).json({
      success: true,
      data: {
        name,
        address,
        phone,
        username,
        status,
      },
    });
  }
  return res.send(500);
};

const update = async (req, res) => {
  const {
    id,
    name,
    email,
    password_email,
    city,
    district,
    ward,
    dateOfBirth,
    address,
    citizenIdentificationNumber,
    dateRange,
    issuedBy,
    permanentAddress,
    phone,
  } = req.body;
  try {
    const dataUpdate = {
      name,
      email,
      password_email,
      city,
      district,
      ward,
      dateOfBirth: new Date(dateOfBirth),
      address,
      citizenIdentificationNumber,
      dateRange: new Date(dateRange),
      issuedBy,
      permanentAddress,
      phone,
    };
    console.log({ dataUpdate });
    if (req && req.file) {
      dataUpdate.avatar = req.file.filename;
    }
    const result = await UserModel.update({
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

const updatePassword = async (req, res) => {
  const { id, prevPassword, newPassword } = req.body;
  try {
    const oldPassword = await prisma.$queryRaw`
      SELECT password FROM manage_building.user
      WHERE id = ${id};
    `;

    const { password } = oldPassword[0];
    console.log({ oldPassword });
    const pass = await argon.verify(password, prevPassword);

    if (!pass) return res.status(201).json({ success: false, message: 'Incorrect password' });
    const hashPassword = await argon.hash(newPassword);
    const result = await UserModel.update({
      where: { id },
      data: { password: hashPassword },
    });

    if (!result) return res.status(201).json({ success: false, message: 'Update fail' });

    return res.status(200).json({ success: true, message: 'Update Successfully' });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error });
  }
};
const userController = { login, register, getUserByToken, update, updatePassword };

module.exports = userController;
