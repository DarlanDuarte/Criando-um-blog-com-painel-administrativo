const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Articles = require('./Article');
const adminAuth = require('../middlewares/adminAuth');
const slugify = require('slugify');

router.get('/admin/articles', adminAuth, (req, res) => {
  Articles.findAll({
    include: [{ model: Category }],
  }).then(articles => {
    res.render('admin/articles/index', { articles: articles });
  });
});

router.get('/admin/articles/new', adminAuth, (req, res) => {
  Category.findAll().then(categories => {
    res.render('admin/articles/new', { categories: categories });
  });
});

router.post('/articles/save', adminAuth, (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const category = req.body.category;

  Articles.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: category,
  }).then(() => {
    res.redirect('/admin/articles');
  });
});

router.post('/articles/deletar', adminAuth, (req, res) => {
  const id = req.body.id;

  if (id != undefined) {
    if (!isNaN(id)) {
      Articles.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect('/admin/articles');
      });
    } else {
      res.redirect('/admin/articles');
    }
  } else {
    res.redirect('/admin/articles');
  }
});

router.get('/admin/articles/edit/:id', adminAuth, (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    res.redirect('admin/articles/index');
  }

  Articles.findByPk(id)
    .then(articles => {
      if (articles != undefined) {
        Category.findAll().then(categories => {
          res.render('admin/articles/edit', {
            articles: articles,
            categories: categories,
          });
        });
      } else {
        res.redirect('admin/articles/index');
      }
    })
    .catch(error => {
      res.redirect('admin/articles/index');
    });
});

router.post('/articles/update', adminAuth, (req, res) => {
  const title = req.body.title;
  const id = req.body.id;
  const body = req.body.body;
  const category = req.body.category;

  Articles.update(
    { title: title, slug: slugify(title), body: body, categoryId: category },
    {
      where: {
        id: id,
      },
    },
  )
    .then(() => {
      res.redirect('/admin/articles');
    })
    .catch(error => {
      res.redirect('/');
    });
});

router.get('/articles/page/:num', (req, res) => {
  let page = req.params.num;
  let offset = 0;

  if (isNaN(page) || page == 1) {
    offset = 0;
  } else {
    offset = (parseInt(page) - 1) * 4;
  }

  /* findAndCountAll => retorna duas coisas a count e as rows */
  Articles.findAndCountAll({
    limit: 4,
    offset: offset,
    order: [['id', 'DESC']],
  }).then(articles => {
    let next;

    if (offset + 4 >= articles.count) {
      next = false;
    } else {
      next = true;
    }

    const result = {
      page: parseInt(page),
      next: next,
      articles: articles,
    };

    Category.findAll().then(categories => {
      res.render('admin/articles/page', {
        categories: categories,
        result: result,
      });
    });
  });
});

module.exports = router;
