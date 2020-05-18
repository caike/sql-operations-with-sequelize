const { Sequelize, DataTypes } = require('sequelize');

const database = '';
const host = '';
const username = '';
const password = '';

const pgClient = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
  logging: false,
});

const Customer = pgClient.define('customers', {
  name: DataTypes.STRING,
});

const Order = pgClient.define('orders', {
  status: DataTypes.STRING,
});

Order.Customer = Order.belongsTo(Customer);

const OrderProduct = pgClient.define('order_products', {
  price: DataTypes.INTEGER,
});

const Product = pgClient.define('products', {
  name: DataTypes.STRING,
  price: DataTypes.INTEGER,
});

Order.belongsToMany(Product, { through: OrderProduct });

module.exports = {
  Customer,
  Order,
  Product,
  client: pgClient,
};
