module.exports = (sequelize, Sequelize) => {
    const ReservacionHabitacion = sequelize.define('RESERVACION_HABITACION', {
        ID_RESERVACION_HABITACION: {
            type: Sequelize.INTEGER, // ID_RESERVACION_HABITACION SERIAL PRIMARY KEY
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        ID_RESERVACION: {
            type: Sequelize.INTEGER, // ID_RESERVACION INT NOT NULL (foreign key)
            allowNull: false,
            references: {
                model: 'RESERVACIONES', // Nombre de la tabla RESERVACIONES
                key: 'ID_RESERVACIONES'
            }
        },
        ID_HABITACION: {
            type: Sequelize.INTEGER, // ID_HABITACION INT NOT NULL (foreign key)
            allowNull: false,
            references: {
                model: 'HABITACIONES', // Nombre de la tabla HABITACIONES
                key: 'ID_HABITACION'
            }
        },
        FECHA_ENTRADA: {
            type: Sequelize.DATE, // FECHA_ENTRADA DATE NOT NULL
            allowNull: false
        },
        FECHA_SALIDA: {
            type: Sequelize.DATE, // FECHA_SALIDA DATE NOT NULL
            allowNull: false
        },
        ESTADO: {
            type: Sequelize.STRING(25), // ESTADO VARCHAR(25)
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
  
    return ReservacionHabitacion;
  };
  