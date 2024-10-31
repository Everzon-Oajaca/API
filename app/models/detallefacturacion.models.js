module.exports = (sequelize, Sequelize) => {
    const DetalleFacturacion = sequelize.define('DETALLE_FACTURACION', {
        ID_DETALLE: {
            type: Sequelize.INTEGER, // ID_DETALLE SERIAL PRIMARY KEY
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
        DESCRIPCION: {
            type: Sequelize.STRING(100), // DESCRIPCION VARCHAR(100)
            allowNull: true
        },
        CANTIDAD: {
            type: Sequelize.INTEGER, // CANTIDAD INT NOT NULL
            allowNull: false
        },
        PRECIO_UNITARIO: {
            type: Sequelize.FLOAT, // PRECIO_UNITARIO FLOAT
            allowNull: true
        },
        SUBTOTAL: {
            type: Sequelize.FLOAT, // SUBTOTAL FLOAT
            allowNull: true
        },
        TOTAL_ITEM: {
            type: Sequelize.FLOAT, // TOTAL_ITEM FLOAT
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return DetalleFacturacion;
};
