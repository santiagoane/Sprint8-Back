//Definamos el Bcrypt
const bcryptjs = require('bcryptjs');
// ESTO SERIA EL GESTOR DEL MODELO
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const path = require('path');



//Traigo el validator desde el middleware
const {
	validationResult
} = require('express-validator');


let userController = {


	show: (req, res) => {

		res.render('users/login');

	},

	showRegister: (req, res) => {

		res.render('users/register');

	},




	register: (req, res) => {
		return res.render('userRegisterForm');
	},

	processRegister: async (req, res) => {

		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			console.log("probando el errors");
			return res.render('users/register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = await db.User.findOne({
			where: {
				email: req.body.email
			}
		});

		if (userInDB) {
			return res.render('users/register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
		}

		try {

			let response = await db.User.create({
				name: userToCreate.name,
				username: userToCreate.username,
				email: userToCreate.email,
				password: userToCreate.password,
				avatar: req.file.filename,
				roles_id: 1 

               
			})



		} catch (err) {
			res.send(err)
		};

		return res.redirect('/login');
	},

	editUserScreen: (req, res) => {
		let userId = req.params.id;
		res.render('users/editUser',
			{ userId: userId }
		);

	},


	loginProcess: async (req, res) => {
		let userToLogin = await db.User.findOne({
			where: {
				email: req.body.email
			}
		});

		if (userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);

			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if (req.body.remember_user) {



					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}
				return res.redirect('/');
			}
			return res.render('users/login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('users/login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},

	profile: async (req, res) => {
		let userLogged = req.session.userLogged


		await db.User.findByPk(userLogged.id)
			.then((data) => {
				userLogged = {
					name: userLogged.name,
					username: userLogged.username,
					email: userLogged.email,
					avatar: userLogged.avatar,

				}
			})
		console.log(userLogged)
		return res.render('users/profile', {
			user: userLogged
		});

	},
	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
}




module.exports = userController
