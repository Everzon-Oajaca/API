module.exports = (sequelize, Sequelize) => {
    const Facturacion = sequelize.define('FACTURACION', {
        ID_FACTURA: {
            type: Sequelize.INTEGER, // ID_FACTURA SERIAL PRIMARY KEY
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
        FECHA_EMISION: {
            type: Sequelize.DATE, // FECHA_EMISION DATE NOT NULL
            allowNull: false
        },
        FECHA_CONSUMO: {
            type: Sequelize.DATE, // FECHA_CONSUMO DATE
            allowNull: true
        },
        ESTADO: {
            type: Sequelize.STRING(25), // ESTADO VARCHAR(25)
            allowNull: true
        },
        TOTAL: {
            type: Sequelize.FLOAT, // TOTAL FLOAT NOT NULL
            allowNull: false
        },
        DESCUENTO: {
            type: Sequelize.FLOAT, // DESCUENTO FLOAT
            allowNull: true
        },
        IMPUESTO: {
            type: Sequelize.FLOAT, // IMPUESTO FLOAT
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Facturacion;
};
