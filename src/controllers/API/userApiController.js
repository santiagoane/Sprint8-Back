const {	validationResult } = require('express-validator');

const fs = require('fs');
let db = require('../../database/models');
const Op = db.Sequelize.Op;
// const { Op } = require("sequelize");

module.exports = {
  list: async (req, res) => {
    try {
      let userInDb = await db.User.findAll({
        include: ["role"],
      });

      let users = [];

      userInDb.forEach(i => {
        users.push({
            id: i.id,
            name: i.name,
            username: i.username,
            email: i.email,
            url: `http://${req.headers.host}/api/users/${i.id}`

        })
      });

      let countUser = await db.User.count();

      Promise.all([userInDb,countUser])
      .then(([dataUserInDb, dataCountUser]) => {
        let response = {
          meta: {
            status: 200,
            total: dataCountUser,
            url: `http://${req.headers.host}/api/users`
          },
          data: {
            total: dataCountUser,
            users: users
          }
        }
        res.json(response)
      })

     } catch(error){
      console.log(error);
      res.json({
        status : 500,
        detail : 'Error interno en la peticion de la información'
      })
    }
  },

  info: async (req, res) => {
    db.User.findByPk(req.params.id, {
      include: ["role"],
    })

    .then((user) => {
      console.log(req.headers);
      let response = {
        meta: {
          status: 200,
          total: user.length,
          url: `http://${req.headers.host}/api/users/${user.id}`
        },
        data: {
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email
          },
        user_avatar: `http://${req.headers.host}/api/users/${user.avatar}`
        } 
      }
      res.json(response)
    })
    .catch((error) => res.json({
      status : 500,
      detail : 'Error interno en la peticion de la información'
    }))
  },
}