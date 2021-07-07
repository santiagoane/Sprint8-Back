//Definamos el Bcrypt
const bcryptjs = require('bcryptjs');
// ESTO SERIA EL GESTOR DEL MODELO
const userModel = require('../model/userModel');



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


		// store: (req, res) => {
		// 	console.log(req.files);
		// 	// Atrapa los contenidos del formulario... Ponele
		// 	const user = req.body;
		// 	// Verificar si viene un archivo, para nombrarlo.
		// 	// user.imagen = req.file ? req.file.filename : '';
		// 	// console.log(user.imagen);
		// 	// console.log(user);
		// 	// Cuidado sólo mando el cuerpo del FORM, el Id me lo asigna el Modelo  
		// 	userModel.create(user);
		// 	res.redirect('/');
		// },
		
		register: (req, res) => {
			return res.render('userRegisterForm');
		},
		
		processRegister: (req, res) => {

			const resultValidation = validationResult(req);
	
			if (resultValidation.errors.length > 0) {
				console.log("probando el errors");
				return res.render('users/register', {
					errors: resultValidation.mapped(),
					oldData: req.body
				});
			}
	
			let userInDB = userModel.findByField('email', req.body.email);
	
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
	
			let userCreated = userModel.create(userToCreate);
	
			return res.redirect('/login');
		},

		editUserScreen : (req, res) => {
			let userId = req.params.id;
			res.render('users/editUser',
			{userId : userId}
			);

		},
		//ya usamos el show para esta funcion
		/*login: (req, res) => {
			return res.render('userLoginForm');
		},*/
		
		loginProcess: (req, res) => {
			let userToLogin = userModel.findByField('email', req.body.email);
			
			if(userToLogin) {
				let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
				if (isOkThePassword) {
					delete userToLogin.password;
					req.session.userLogged = userToLogin;
	
					if(req.body.remember_user) {
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
		
		profile: (req, res) => {
			return res.render('users/profile', {
				user: req.session.userLogged
			});
		},
	
		
		logout: (req, res) => {
			res.clearCookie('userEmail');
			req.session.destroy();
			return res.redirect('/');
		}
	}
		



module.exports = userController
