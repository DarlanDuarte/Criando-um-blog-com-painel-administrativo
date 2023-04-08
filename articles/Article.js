const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Category = require('../categories/Category');

const Article = sequelize.define('articles', {
   title: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   slug: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   body: {
      type: Sequelize.TEXT,
      allowNull: false,
   },
});

Category.hasMany(Article); // Uma Category tem muitos artigos
Article.belongsTo(Category); // Um Article Pertece a Uma Category

/* //Article.sync({ force: true }); // Roda Apenas uma vez quando abrir o servidor. force:true =>  indica que as tabelas já existentes serão excluídas e recriadas do zero, caso já existam. Por isso pode excluir o comando depois que a tabela foi criada*/

module.exports = Article;
