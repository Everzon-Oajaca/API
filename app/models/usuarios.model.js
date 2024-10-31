module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define('USUARIOS', {
      ID_USUARIO: {
          type: Sequelize.INTEGER, // ID_USUARIO SERIAL PRIMARY KEY
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
      },
      USUARIO: {
          type: Sequelize.STRING(25), // USUARIO VARCHAR(25) NOT NULL
          allowNull: false
      },
      CORREO: {
          type: Sequelize.STRING(50), // CORREO VARCHAR(50) NOT NULL
          allowNull: false
      },
      CONTRASEÑA: {
          type: Sequelize.STRING(25), // CONTRASEÑA VARCHAR(25) NOT NULL
          allowNull: false
      },
      FECHA_ULTIMO_ACCESO: {
          type: Sequelize.DATE, // FECHA_ULTIMO_ACCESO DATE
          allowNull: true
      }
  }, {
      freezeTableName: true,
      timestamps: false
  });

  return Usuario;
};
