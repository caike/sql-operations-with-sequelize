const { Customer, Product, client } = require('./store');

async function run() {
  try {
    await client.sync({ force: true });
    console.log('Finished syncing');

    await Customer.create({ name: 'Sam' });
    await Customer.create({ name: 'Brooke' });
    await Product.create({ name: 'book', price: 1599 });
    await Product.create({ name: 'computer', price: 150000 });
    await Product.create({ name: 'guitar', price: 80000 });
  } catch (err) {
    console.log('Error: ' + err);
  } finally {
    client.close();
  }
}

run();
