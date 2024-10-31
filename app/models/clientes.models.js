module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define('CLIENTES', {
        ID_CLIENTE: {
            type: Sequelize.INTEGER, // ID_CLIENTE SERIAL PRIMARY KEY
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
        PASAPORTE: {
            type: Sequelize.STRING(25), // PASAPORTE VARCHAR(25)
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
        NACIONALIDAD: {
            type: Sequelize.STRING(25), // NACIONALIDAD VARCHAR(25)
            allowNull: true
        },
        DIRECCION: {
            type: Sequelize.STRING(150), // DIRECCION VARCHAR(150)
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
  
    return Cliente;
  };
  