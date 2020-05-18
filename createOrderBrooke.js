const { Customer, Order, Product, client } = require('./store');

async function run() {
  try {
    client.authenticate();

    const customer = await Customer.findOne({ where: { name: 'Brooke' } });
    const guitar = await Product.findOne({ where: { name: 'guitar' } });

    let order = await Order.create({
      customerId: customer.id,
      status: 'CREATED',
    });
    // https://stackoverflow.com/questions/48957191/how-do-i-orm-additional-columns-on-a-join-table-in-sequelize
    await order.addProduct(guitar, {
      through: { price: guitar.price },
    });
  } catch (err) {
    console.log('Error: ' + err);
  } finally {
    client.close();
  }
}

run();
