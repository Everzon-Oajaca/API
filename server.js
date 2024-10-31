const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const usuariosRouter = require('./app/routers/usuarios.router.js');
const clientesRouter = require('./app/routers/clientes.routers.js');
const empleadosRouter = require('./app/routers/empleados.routers.js');
const reservacionesRouter = require('./app/routers/reservaciones.routers.js');
const serviciosRouter = require('./app/routers/servicios.routers.js');
const habitacionesRouter = require('./app/routers/habitaciones.routers.js');
const reservacionhabitacionesRouter = require('./app/routers/reservacionhabitacion.routers.js');
const facturacionRouter = require('./app/routers/facturacion.routers.js');
const detallefacturacionRouter = require('./app/routers/detallefacturacion.routers.js');
const pagosRouter = require('./app/routers/pagos.routers.js');
const reporteRouter = require('./app/routers/reporte.routers.js');
const restauranteRouter = require('./app/routers/restaurante.routers.js');
const pedidoRouter = require('./app/routers/pedidos.routers.js');
const db = require('./app/config/db.config.js');

// Sincronizar la base de datos y las tablas sin eliminarlas ni recrearlas
db.sequelize.sync().then(() => {
  console.log('Las tablas se sincronizaron correctamente sin eliminar ni recrear');
});

// Configuración de CORS para permitir solicitudes desde localhost y el dominio en producción
const allowedOrigins = ['https://dashboard-hotel.onrender.com'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middlewares
app.use(bodyParser.json());

// Rutas
app.use('/', usuariosRouter);
app.use('/', clientesRouter);
app.use('/', empleadosRouter);
app.use('/', reservacionesRouter);
app.use('/', serviciosRouter);
app.use('/', habitacionesRouter);
app.use('/', reservacionhabitacionesRouter);
app.use('/', facturacionRouter);
app.use('/', detallefacturacionRouter);
app.use('/', pagosRouter);
app.use('/', reporteRouter);
app.use('/', restauranteRouter);
app.use('/', pedidoRouter);

// Ruta raíz de bienvenida
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

// Configuración del servidor
const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("App escuchando en http://%s:%s", host, port);
});
