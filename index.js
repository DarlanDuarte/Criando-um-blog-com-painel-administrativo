const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const artilesController = require('./articles/ArticlesController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

sequelize
  .authenticate()
  .then(() => console.log(`Conexão com o banco de dados feita com sucesso!`))
  .catch(error => console.log(error));

app.use('/', categoriesController);
app.use('/', artilesController);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(8080, () => {
  console.log('Servidor Rodando Com Sucesso!');
});
