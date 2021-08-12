const db = require('../../database/models');
const sequelize = db.sequelize;

let userApiController = {
// List busca todos los usuarios
    list: async (req, res) => {
        try {
            let userList = await db.User.findAll();

            // Elimino password de cada objeto del array
            let userArray = userList.map((user) => { 
                delete user.dataValues.password;
                delete user.dataValues.createdAt;
                delete user.dataValues.updatedAt;
                delete user.dataValues.roles_id;
                user.dataValues.detail = `api/users/${user.dataValues.id}`
                return user;});

            // Armo respuesta con resultado de findAll en formato JSON
            let respuesta = {
                meta: {
                    status : 200,
                    count: userList.length,
                    url: 'api/users'
                },
                data: userArray
            }

            // Envio respuesta en formato JSON
            res.json(respuesta);
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    },
    detail: async (req, res) => {
        try {
            // Busco user en DB
            let user = await db.User.findOne(
                {where: {id : req.params.id}, 
                include: ["avatar"]}
            )
            // Almaceno url de img en variable
            let avatarUrl = req.headers.host + `/images/users/${user.dataValues.user.avatar}`;
            
            // Inserto url de imagen en product
            user.dataValues.avatarURL = avatarUrl;

            // Armo respuesta con resultado de findOne en formato JSON
            let respuesta = {
                meta: {
                    status : 200,
                    url: `api/users/${user.id}`
                },
                data: user
            }
            delete respuesta.data.dataValues.password;
            delete respuesta.data.dataValues.createdAt;
            delete respuesta.data.dataValues.updatedAt;
            delete respuesta.data.dataValues.addressId;
            delete respuesta.data.dataValues.avatarId;
            delete respuesta.data.dataValues.roleId;

            res.json(respuesta);
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    }
}

module.exports = userApiController;