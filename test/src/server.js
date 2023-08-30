const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const sequelize = require('./db');
const Candy = require('./models/candy');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api', routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
