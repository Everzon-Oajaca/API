module.exports = (sequelize, Sequelize) => {
    const Servicio = sequelize.define('SERVICIOS', {
        ID_SERVICIO: {
            type: Sequelize.INTEGER, // ID_SERVICIO SERIAL PRIMARY KEY
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        TIPO_SERVICIO: {
            type: Sequelize.STRING(50), // TIPO_SERVICIO VARCHAR(50) NOT NULL
            allowNull: false
        },
        DURACION: {
            type: Sequelize.STRING(50), // DURACION VARCHAR(50)
            allowNull: true
        },
        DESCRIPCION: {
            type: Sequelize.STRING(250), // DESCRIPCION VARCHAR(250)
            allowNull: true
        },
        FECHA_HORA: {
            type: Sequelize.DATE, // FECHA_HORA DATE
            allowNull: true
        },
        PRECIO: {
            type: Sequelize.FLOAT, // PRECIO FLOAT NOT NULL
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
  
    return Servicio;
  };
  