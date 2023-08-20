const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/add-product', (req, res, next) => {
  res.send(`
    <form action="/product" method="POST">
      <input type="text" name="title" placeholder="Product Title"><br>
      <input type="text" name="size" placeholder="Product Size"><br>
      <button type="submit">Add Product</button>
    </form>
  `);
});

app.post('/product', (req, res, next) => {
  const productTitle = req.body.title;
  const productSize = req.body.size;
  console.log('Product Title:', productTitle);
  console.log('Product Size:', productSize);
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
