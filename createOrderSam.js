const { Customer, Order, Product, client } = require('./store');

async function run() {
  try {
    client.authenticate();

    const customer = await Customer.findOne({ where: { name: 'Sam' } });
    const book = await Product.findOne({ where: { name: 'book' } });
    const computer = await Product.findOne({ where: { name: 'computer' } });

    let order = await Order.create({
      customerId: customer.id,
      status: 'CREATED',
    });
    // https://stackoverflow.com/questions/48957191/how-do-i-orm-additional-columns-on-a-join-table-in-sequelize
    await order.addProduct(book, {
      through: { price: book.price },
    });
    await order.addProduct(computer, {
      through: { price: computer.price },
    });
  } catch (err) {
    console.log('Error: ' + err);
  } finally {
    client.close();
  }
}

run();
