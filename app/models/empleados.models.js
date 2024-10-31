module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define('EMPLEADOS', {
        ID_EMPLEADO: {
            type: Sequelize.INTEGER, // ID_EMPLEADO SERIAL PRIMARY KEY
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        ID_USUARIO: {
            type: Sequelize.INTEGER, // ID_USUARIO INT NOT NULL (foreign key)
            allowNull: false,
            references: {
                model: 'USUARIOS', // Nombre de la tabla USUARIOS
                key: 'ID_USUARIO'
            }
        },
        CUI: {
            type: Sequelize.STRING(15), // CUI VARCHAR(15)
            allowNull: true
        },
        NIT: {
            type: Sequelize.STRING(25), // NIT VARCHAR(25)
            allowNull: true
        },
        NOMBRE: {
            type: Sequelize.STRING(50), // NOMBRE VARCHAR(50) NOT NULL
            allowNull: false
        },
        APELLIDO: {
            type: Sequelize.STRING(50), // APELLIDO VARCHAR(50)
            allowNull: true
        },
        CORREO: {
            type: Sequelize.STRING(50), // CORREO VARCHAR(50)
            allowNull: true
        },
        TELEFONO: {
            type: Sequelize.INTEGER, // TELEFONO INT
            allowNull: true
        },
        ROL_ADMINISTRATIVO: {
            type: Sequelize.STRING(25), // ROL_ADMINISTRATIVO VARCHAR(25)
            allowNull: true
        },
        FECHA_CONTRATO: {
            type: Sequelize.DATE, // FECHA_CONTRATO DATE
            allowNull: true
        },
        ESTADO: {
            type: Sequelize.STRING(25), // ESTADO VARCHAR(25)
            allowNull: true
        },
        TURNO: {
            type: Sequelize.STRING(25), // TURNO VARCHAR(25)
            allowNull: true
        },
        SALARIO: {
            type: Sequelize.FLOAT, // SALARIO FLOAT
            allowNull: true
        },
        GENERO: {
            type: Sequelize.STRING(10), // GENERO VARCHAR(10)
            allowNull: true
        },
        DEPARTAMENTO: {
            type: Sequelize.STRING(25), // DEPARTAMENTO VARCHAR(25)
            allowNull: true
        },
        FECHA_DESPIDO: {
            type: Sequelize.DATE, // FECHA_DESPIDO DATE
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
  
    return Empleado;
  };
  