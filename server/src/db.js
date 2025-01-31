require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path"); 
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
// verificacion de la conexion
sequelize
  .authenticate()
  .then((response) => {
    console.log("Connection to database successfully");
  })
  .catch((error) => {
    console.log(error);
  });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// console.log(modelDefiners)
// Injectamos la conexion (sequelize) a todos los modelos
// modelDefiners[1](sequelize);

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Books, Categories, Detalle, Order, Review, User, Favorite } =
  sequelize.models;

Books.belongsToMany(Categories, {
  as: "categories",
  through: "Books_Categories",
});
Categories.belongsToMany(Books, {
  as: "categories",
  through: "Books_Categories",
});

Order.belongsToMany(Books, { through: Detalle });
Books.belongsToMany(Order, { through: Detalle });

Books.hasMany(Review)
Review.belongsTo(Books)

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Order);
Order.belongsTo(User);

User.belongsToMany(Favorite, { through: "User_Favorite" });
Favorite.belongsToMany(User, { through: "User_Favorite" });



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Op,
};
