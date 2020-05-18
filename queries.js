const { Pool } = require('pg');

async function run() {
  const pool = new Pool({
    host: '',
    database: '',
    user: '',
    password: '',
  });

  // const result = await pool.query(
  //   'SELECT o.id as "Order ID", o.status as "Order Status", c.name as "Customer", p.name as "Product Name", op.price as "Item Price" ' +
  //     'FROM orders o, products p, order_products op, customers c ' +
  //     'WHERE o.id = op."orderId" AND op."productId" = p.id AND c.id = o."customerId"'
  // );
  const result = await pool.query(`
    SELECT o.id as "Order ID", o.status as "Order Status", c.name as "Customer", SUM(op.price) as "Order Price"
    FROM orders o, products p, order_products op, customers c
    WHERE o.id = op."orderId" AND op."productId" = p.id AND c.id = o."customerId"
    GROUP BY o.id, c.name
    ORDER BY o.id;
  `);
  console.log(result.rows);
  pool.end();
}

run();
