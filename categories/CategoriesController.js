const express = require('express');
const router = express.Router();
const slugify = require('slugify');

const Category = require('./Category');

router.get('/admin/categories/new', (req, res) => [
   res.render('admin/categories/new'),
]);

router.post('/categories/save', (req, res) => {
   const title = req.body.title;

   if (title != undefined) {
      Category.create({
         title: title,
         slug: slugify(title),
      }).then(() => {
         res.redirect('/');
      });
   } else {
      res.redirect('/admin/categories/new');
   }
});

router.get('/admin/categories', (req, res) => {
   res.render('admin/categories/index');
});

module.exports = router;
