module.exports = (sequelize, Sequelize) => {
    const Reporte = sequelize.define('REPORTE', {
        ID_REPORTE: {
            type: Sequelize.INTEGER, // ID_REPORTE SERIAL PRIMARY KEY
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        ID_EMPLEADO: {
            type: Sequelize.INTEGER, // ID_EMPLEADO INT NOT NULL (foreign key)
            allowNull: false,
            references: {
                model: 'EMPLEADOS', // Nombre de la tabla EMPLEADOS
                key: 'ID_EMPLEADO'
            }
        },
        DEPARTAMENTO: {
            type: Sequelize.STRING(25), // DEPARTAMENTO VARCHAR(25)
            allowNull: true
        },
        FECHA_GENERADO: {
            type: Sequelize.DATE, // FECHA_GENERADO DATE NOT NULL
            allowNull: false
        },
        DETALLE: {
            type: Sequelize.STRING(150), // DETALLE VARCHAR(150)
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Reporte;
};
