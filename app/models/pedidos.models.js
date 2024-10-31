module.exports = (sequelize, Sequelize) => {
    const Pedido = sequelize.define('PEDIDOS', {
        ID_PEDIDO: {
            type: Sequelize.INTEGER, // ID_PEDIDO SERIAL PRIMARY KEY
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        ID_HABITACION: {
            type: Sequelize.INTEGER, // ID_HABITACION INT NOT NULL (foreign key)
            allowNull: false,
            references: {
                model: 'HABITACIONES', // Nombre de la tabla HABITACIONES
                key: 'ID_HABITACION'
            }
        },
        ID_RESTAURANTE: {
            type: Sequelize.INTEGER, // ID_RESTAURANTE INT NOT NULL (foreign key)
            allowNull: false,
            references: {
                model: 'RESTAURANTE', // Nombre de la tabla RESTAURANTE
                key: 'ID_RESTAURANTE'
            }
        },
        TIPO_PEDIDO: {
            type: Sequelize.STRING(50), // TIPO_PEDIDO VARCHAR(50)
            allowNull: true
        },
        ESTADO: {
            type: Sequelize.STRING(50), // ESTADO VARCHAR(50)
            allowNull: true
        },
        FECHA_HORA: {
            type: Sequelize.DATE, // FECHA_HORA TIMESTAMP NOT NULL
            allowNull: false
        },
        DESCRIPCION: {
            type: Sequelize.STRING(250), // DESCRIPCION VARCHAR(250)
            allowNull: true
        },
        TOTAL: {
            type: Sequelize.FLOAT, // TOTAL FLOAT
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Pedido;
};
