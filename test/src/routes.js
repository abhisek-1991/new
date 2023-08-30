const express = require('express');
const router = express.Router();
const Candy = require('./models/candy');

// Get all candies
router.get('/candies', async (req, res) => {
  try {
    const candies = await Candy.findAll();
    res.json(candies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Buy candy
router.post('/buy', async (req, res) => {
  const { candyId, quantity } = req.body;

  try {
    const candy = await Candy.findByPk(candyId);
    if (!candy) {
      return res.status(404).json({ error: 'Candy not found' });
    }

    if (candy.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient quantity available' });
    }

    candy.quantity -= quantity;
    await candy.save();

    res.json({ message: 'Purchase successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add new candy
router.post('/add-candy', async (req, res) => {
  const { candyname, description, price, quantity } = req.body;

  try {
    const newCandy = await Candy.create({
      candyname,
      description,
      price: parseFloat(price),
      quantity,
    });

    res.status(201).json(newCandy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
