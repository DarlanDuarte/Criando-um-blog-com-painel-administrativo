const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database/database');
let session = require('express-session');

const categoriesController = require('./categories/CategoriesController');
const artilesController = require('./articles/ArticlesController');
const userController = require('./users/UserController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

//Express-Session
app.use(
  session({
    secret: 'mysecret',
    cookie: { maxAge: 3000000 },
    resave: false,
    saveUninitialized: true,
  }),
);

sequelize
  .authenticate()
  .then(() => console.log(`Conexão com o banco de dados feita com sucesso!`))
  .catch(error => console.log(error));

app.use('/', categoriesController);
app.use('/', artilesController);
app.use('/', userController);

app.get('/session', (req, res) => {
  req.session.treinamento = 'Formação Node.Js';
  req.session.ano = 2023;
  req.session.email = 'email@email.com';
  req.session.user = {
    username: 'DarlanDuarte',
    email: 'darlan@email.com',
    id: 10,
  };
  res.send('Sessao foi gerada');
});

app.get('/leitura', (req, res) => {
  res.json({
    treinamento: req.session.treinamento,
    ano: req.session.ano,
    email: req.session.email,
    user: req.session.user,
  });
});

app.get('/', (req, res) => {
  Article.findAll({
    order: [['id', 'DESC']],
    limit: 4,
  }).then(articles => {
    Category.findAll().then(categories => {
      res.render('index', { articles: articles, categories: categories });
    });
  });
});

app.get('/:slug', (req, res) => {
  const slug = req.params.slug;

  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then(articles => {
      if (articles != undefined) {
        Category.findAll().then(categories => {
          res.render('articles', {
            articles: articles,
            categories: categories,
          });
        });
      } else {
        res.redirect('/');
      }
    })
    .catch(error => {
      res.redirect('/');
    });
});

app.get('/category/:slug', (req, res) => {
  const slug = req.params.slug;

  Category.findOne({
    where: {
      slug: slug,
    },
    include: [{ model: Article }],
  })
    .then(category => {
      if (category != undefined) {
        Category.findAll().then(categories => {
          res.render('index', {
            articles: category.articles,
            categories: categories,
          });
        });
      } else {
        res.redirect('/');
      }
    })
    .catch(error => {
      res.redirect('/');
    });
});

app.listen(8080, () => {
  console.log('Servidor Rodando Com Sucesso!');
});
