module.exports = (sequelize, Sequelize) => {
    const Restaurante = sequelize.define('RESTAURANTE', {
        ID_RESTAURANTE: {
            type: Sequelize.INTEGER, // ID_RESTAURANTE SERIAL PRIMARY KEY
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        NOMBRE: {
            type: Sequelize.STRING(50), // NOMBRE VARCHAR(50) NOT NULL
            allowNull: false
        },
        UBICACION: {
            type: Sequelize.STRING(100), // UBICACION VARCHAR(100)
            allowNull: true
        },
        DESCRIPCION: {
            type: Sequelize.STRING(250), // DESCRIPCION VARCHAR(250)
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Restaurante;
};
