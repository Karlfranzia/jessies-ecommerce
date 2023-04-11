const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    // Find all categories and include its associated Products
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /api/categories/:id
router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` value and include its associated Products
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId, {
      include: [{ model: Product }],
    });

    // If category is not found
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json(category);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/categories
router.post('/', async (req, res) => {
  try {
    // Create a new category
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT /api/categories/:id
router.put('/:id', async (req, res) => {
  try {
    // Update a category by its `id` value
    const categoryId = req.params.id;
    const updatedCategory = await Category.update(req.body, {
      where: { id: categoryId },
    });

    // If category is not found
    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json({ message: 'Category updated successfully' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/categories/:id
router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its `id` value
    const categoryId = req.params.id;
    const deletedCategory = await Category.destroy({
      where: { id: categoryId },
    });

    // If category is not found
    if (deletedCategory === 0) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json({ message: 'Category deleted successfully' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
