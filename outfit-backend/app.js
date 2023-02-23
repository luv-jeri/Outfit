const express = require('express');
const index_router = require('./routes');
const cors = require('cors');
// # route + method + param -> URL
// # header / body / query -> data

const app = express();
app.use(express.json());

const origin = ['http://localhost:5173'];

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// });

app.use(cors({ origin }));

// app.post('/api/v1/auth/signup', (req, res) => {})
// app.post('/api/v1/auth/signin', (req, res) => {})

// app.get('/api/v1/product/', (req, res) => {})
// app.post('/api/v1/product/', (req, res) => {})
// app.delete('/api/v1/product/', (req, res) => {})
// app.patch('/api/v1/product/', (req, res) => {})
// app.use('/api/v1/auth', index_router);
// app.use('/api/v1/product', index_router);

app.use('/api/v1', index_router);

app.use(express.static(`uploads`));

// error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    state: 'error',
  });
});

app.all('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    state: 'error',
  });
});

module.exports = app;
