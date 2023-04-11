const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// get all tags
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        through: ProductTag,
      },
    ],
  })
    .then((tags) => res.json(tags))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one tag
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        through: ProductTag,
      },
    ],
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: 'Tag not found' });
      } else {
        res.json(tag);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new tag
router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => res.status(201).json(tag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update tag
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: 'Tag updated successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete tag
router.delete('/:id', (req, res) => {
  // delete one tag by its `id` value
  Tag.destroy({
    where: { id: req.params.id },
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: 'Tag not found' });
      } else {
        res.json(tag);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
