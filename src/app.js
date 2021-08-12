// Defino los requirements
const express = require('express')
const app = express()
const port = process.env.PORT;
const path = require('path');
const cookies = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');

// Llamo las distintas rutas que vamos a usar
const indexRoutes = require('./routes/indexRoutes');        // Ruta para la home
const userRoutes = require('./routes/userRoutes');          // Ruta para usuarios
const productsRoutes = require('./routes/productRoutes');   // Rutas de producto
//const adminRoutes = require('./routes/adminRoutes');     // Rutas de backoffice
const productApiRoutes  = require('./routes/api/productApiRoutes');
const userApiRoutes     = require('./routes/api/userApiRoutes');
const categoryApiRoutes     = require('./routes/api/categoryApiRoutes');


// Llamo a un Middleware
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const cors = require('cors');
app.use(cors());


app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname,'../public')));                  // Defino a la carpeta public como la que tiene todos los assets
app.set('view engine', 'ejs');                      // Defino a ejs como motor de renderizacion
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))
app.use(express.json());
app.use(cookies());
app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));
app.use(userLoggedMiddleware); // Activo el userLoggedMiddleware


app.use('/', indexRoutes);              // Rutas de la home pasan a controlarlas indexRoutes
app.use('/', userRoutes);               // Rutas de login y register pasan a controlarlas userRoutes
app.use('/products', productsRoutes);   // Rutas de edit y create pasan a controlarlas userRoutes
//app.use('/admin', adminRoutes);

//API Routes

app.use('/api/users', userApiRoutes) ; 
app.use('/api/products', productApiRoutes) ;
app.use('/api/categories', categoryApiRoutes) ;


// Renderizo la pagina 404 si no identifica la ruta
app.use((req, res, next) => {
    res.status(404).render("not-found");
});



app.listen(port || 3000, () => {
    console.log('Vamo arribaaaa neneeee 🤟      Mandale mecha al puerto 3000');
});
