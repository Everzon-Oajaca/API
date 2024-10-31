
const env = require('./env.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  operatorsAliases: false,
  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Usuario = require('../models/usuarios.model.js')(sequelize, Sequelize);
db.Cliente = require('../models/clientes.models.js')(sequelize, Sequelize);
db.Empleado = require('../models/empleados.models.js')(sequelize, Sequelize);
db.Reservacion = require('../models/reservaciones.models.js')(sequelize, Sequelize);
db.Servicio= require('../models/servicios.models.js')(sequelize, Sequelize);
db.Habitacion= require('../models/habitaciones.models.js')(sequelize, Sequelize);
db.ReservacionHabitacion= require('../models/reservacionhabitacion.models.js')(sequelize, Sequelize);
db.Facturacion= require('../models/facturacion.models.js')(sequelize, Sequelize);
db.DetalleFacturacion= require('../models/detallefacturacion.models.js')(sequelize, Sequelize);
db.Pago= require('../models/pagos.models.js')(sequelize, Sequelize);
db.Reporte= require('../models/reporte.models.js')(sequelize, Sequelize);
db.Restaurante= require('../models/restaurante.models.js')(sequelize, Sequelize);
db.Pedido= require('../models/pedidos.models.js')(sequelize, Sequelize);
module.exports = db;

