module.exports = (sequelize, Sequelize) => {
    const Reservacion = sequelize.define('RESERVACIONES', {
        ID_RESERVACIONES: {
            type: Sequelize.INTEGER, // ID_RESERVACIONES SERIAL PRIMARY KEY
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        ID_CLIENTE: {
            type: Sequelize.INTEGER, // ID_CLIENTE INT NOT NULL (foreign key)
            allowNull: false,
            references: {
                model: 'CLIENTES', // Nombre de la tabla CLIENTES
                key: 'ID_CLIENTE'
            }
        },
        TIPO_CLIENTE: {
            type: Sequelize.STRING(15), // TIPO_CLIENTE VARCHAR(15)
            allowNull: true
        },
        FECHA_RESERVA: {
            type: Sequelize.DATE, // FECHA_RESERVA DATE NOT NULL
            allowNull: false
        },
        HORA_RESERVA: {
            type: Sequelize.TIME, // HORA_RESERVA TIME NOT NULL
            allowNull: false
        },
        DIAS_RESERVA: {
            type: Sequelize.INTEGER, // DIAS_RESERVA INT
            allowNull: true
        },
        ESTADO_CANCELACION: {
            type: Sequelize.STRING(50), // ESTADO_CANCELACION VARCHAR(50)
            allowNull: true
        },
        TOTAL: {
            type: Sequelize.FLOAT, // TOTAL FLOAT
            allowNull: true
        },
        COMENTARIO: {
            type: Sequelize.STRING(200), // COMENTARIO VARCHAR(200)
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
  
    return Reservacion;
  };
  