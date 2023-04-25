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
    const { id, name, avatar, city, district, ward, phone, role, status, approveBy } = user;

    const secretKey = process.env.SECRET_JWT || '';
    // console.log({ secretKey });
    const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
      expiresIn: '24h',
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful!!!',
      token,
      data: { id, name, avatar, city, district, ward, phone, username, role, status, approveBy },
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

const userController = { login, register, getUserByToken };

module.exports = userController;
