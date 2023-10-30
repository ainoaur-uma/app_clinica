//configuracion de la conexión a la base de datos
const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const dbConnection = mysql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

dbConnection.connect((err) => {
  if (!err) {
    console.log('Conexión exitosa a la base de datos');
  } else {
    console.error('Error de conexión a la base de datos:', err);
  }
});

module.exports = dbConnection;
