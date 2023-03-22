const routerUser = require('./user.route');
const routerBuilding = require('./building.route');
const routerCustomer = require('./customer.route');
const routerRoom = require('./room.route');

const ApiRouter = (app) => {
  app.use('/api/user', routerUser);
  app.use('/api/building', routerBuilding);
  app.use('/api/customer', routerCustomer);
  app.use('/api/room', routerRoom);
};

module.exports = ApiRouter;
