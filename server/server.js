const app = require('./app');

// Obtiene el puerto desde las variables de entorno o utiliza un valor predeterminado
const port = process.env.PORT || 3000;

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
