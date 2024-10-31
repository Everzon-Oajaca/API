module.exports = (sequelize, Sequelize) => {
    const Habitacion = sequelize.define('HABITACIONES', {
        ID_HABITACION: {
            type: Sequelize.INTEGER, // ID_HABITACION SERIAL PRIMARY KEY
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        ID_SERVICIO: {
            type: Sequelize.INTEGER, // ID_SERVICIO INT (foreign key)
            allowNull: true,
            references: {
                model: 'SERVICIOS', // Nombre de la tabla SERVICIOS
                key: 'ID_SERVICIO'
            }
        },
        NUM_HABITACION: {
            type: Sequelize.STRING(25), // NUM_HABITACION VARCHAR(25) NOT NULL
            allowNull: false
        },
        TIPO_HABITACION: {
            type: Sequelize.STRING(50), // TIPO_HABITACION VARCHAR(50) NOT NULL
            allowNull: false
        },
        NUMERO_CAMAS: {
            type: Sequelize.INTEGER, // NUMERO_CAMAS INT NOT NULL
            allowNull: false
        },
        TIPO_DE_CAMA: {
            type: Sequelize.STRING(50), // TIPO_DE_CAMA VARCHAR(50)
            allowNull: true
        },
        ESTADO: {
            type: Sequelize.STRING(50), // ESTADO VARCHAR(50)
            allowNull: true
        },
        PRECIO: {
            type: Sequelize.FLOAT, // PRECIO FLOAT NOT NULL
            allowNull: false
        },
        DESCUENTO: {
            type: Sequelize.FLOAT, // DESCUENTO FLOAT
            allowNull: true
        },
        DESCRIPCION: {
            type: Sequelize.STRING(150), // DESCRIPCION VARCHAR(150)
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
  
    return Habitacion;
  };
  