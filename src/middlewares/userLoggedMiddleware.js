const db = require('../database/models');
const sequelize = db.sequelize;

async function userLoggedMiddleware(req, res, next) {
    // asigno false a la variable local isLogged 
    res.locals.isLogged = false;

    // en caso que exista un usuario logueado Y haya elegido tachar "recordar usuario" al login
    if (req.cookies.userEmail) {

        // almaceno email asignado a la cookie en la variable emailInCookie
        let emailInCookie = req.cookies.userEmail;

        // busco usuario en DB correspondiente al email anterior
        let userFromCookie = await db.User.findOne({where: {email: emailInCookie}});

        // si existe el usuario se genera una instancia de session con el usuario
        if (userFromCookie) {
            req.session.userlogged = userFromCookie;
        }
    }
    // si existe instancia de session, y usuario asignado a la misma la variable local isLogged pasa a true,
    // y se almacena el usuario en variable local userLogged
    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;



// const userModel = require('../databese/models');

// function userLoggedMiddleware(req, res, next) {
// 	res.locals.isLogged = false;

// 	let emailInCookie = req.cookies.userEmail;
// 	let userFromCookie = userModel.findByField('email', emailInCookie);

// 	if (userFromCookie) {
// 		req.session.userLogged = userFromCookie;
// 	}

// 	if (req.session.userLogged) {
// 		res.locals.isLogged = true;
// 		res.locals.userLogged = req.session.userLogged;
// 	}

// 	next();
// }

// module.exports = userLoggedMiddleware;