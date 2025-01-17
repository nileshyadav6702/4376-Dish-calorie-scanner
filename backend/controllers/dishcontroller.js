import Dish from "../model/dish.js";

async function createDish(req, res) {
  try {
    const dish = await Dish.create(req.body);
    res.status(201).json(dish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDishes(req, res) {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateDish(req, res) {
  try {
    const { id } = req.params;
    const dish = await Dish.findByIdAndUpdate(id,{ ...req.body} );
    return res.json(dish); 
    }
    catch (error) {
    res.status(500).json({ error: error.message });
    }
}

async function deleteDish(req, res) {
  try {
    const { id } = req.params;
    const dish = await Dish.findByIdAndDelete(id);
    if (dish) {
      return res.status(204).send('deleted successfully');
    }
    throw new Error('Dish not found');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { createDish, getDishes, updateDish, deleteDish };