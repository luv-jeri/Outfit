var { connect, connection } = require('mongoose');

const { DB_URL } = process.env;

connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on('connected', () => {
  console.log('Database connection successful...');
});

connection.on('error', (err) => {
  console.log('Database connection failed...');
});
