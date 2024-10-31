const env = {
  database: 'hotelstar_c234', // Nombre de la base de datos
  username: 'hotelstar_c234_user', // Usuario de la base de datos
  password: 'ICoXvOMhtT0llO2hVq6uMryn6lqMVNEC', // Contraseña de la base de datos
  host: 'dpg-cse7lv5svqrc73etq8mg-a', // Host del servidor PostgreSQL
  dialect: 'postgres', // El dialecto de la base de datos (PostgreSQL)
  pool: {
    max: 5, // Número máximo de conexiones en el pool
    min: 0, // Número mínimo de conexiones en el pool
    acquire: 30000, // Tiempo máximo en ms para intentar una conexión antes de marcar error
    idle: 10000 // Tiempo máximo que una conexión puede estar inactiva antes de ser liberada
  }
};

module.exports = env;

