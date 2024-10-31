module.exports = (sequelize, Sequelize) => {
    const Pago = sequelize.define('PAGOS', {
        ID_PAGO: {
            type: Sequelize.INTEGER, // ID_PAGO SERIAL PRIMARY KEY
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        ID_FACTURA: {
            type: Sequelize.INTEGER, // ID_FACTURA INT NOT NULL (foreign key)
            allowNull: false,
            references: {
                model: 'FACTURACION', // Nombre de la tabla FACTURACION
                key: 'ID_FACTURA'
            }
        },
        FECHA_PAGO: {
            type: Sequelize.DATE, // FECHA_PAGO DATE NOT NULL
            allowNull: false
        },
        MONTO: {
            type: Sequelize.FLOAT, // MONTO FLOAT NOT NULL
            allowNull: false
        },
        METODO_PAGO: {
            type: Sequelize.STRING(25), // METODO_PAGO VARCHAR(25)
            allowNull: true
        },
        ESTADO: {
            type: Sequelize.STRING(25), // ESTADO VARCHAR(25)
            allowNull: true
        },
        COMENTARIO: {
            type: Sequelize.STRING(50), // COMENTARIO VARCHAR(50)
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
  
    return Pago;
  };
  