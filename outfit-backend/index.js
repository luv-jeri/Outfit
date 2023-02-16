const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

require('./database');

const app = require('./app');

const { PORT } = process.env || 3500;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
