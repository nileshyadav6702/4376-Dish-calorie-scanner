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
    let {name,quantity,calories}=req.body
    const { dishid,itemid } = req.query;
    const dish = await Dish.updateMany(
      { _id: dishid, "items._id": itemid },
      { $set: { "items.$.name": name, "items.$.quantity": quantity,"items.$.calories":calories } }
    );
    return res.json({msg:'item updated',dish}); 
    }
    catch (error) {
    res.status(500).json({ error: error.message });
    }
}

async function deleteDish(req, res) {
  try {
    const { dishid,itemid } = req.query;
    const dish=await Dish.updateMany({_id:dishid},{$pull:{items:{_id:itemid}}})
    if (dish) {
      return res.json({ message: 'Dish deleted' });
    }
    throw new Error('Dish not found');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getdish(req,res){
  let id=req.params.id;
  let dish=await Dish.findById(id)
  return res.json(dish)
  
}
export { createDish, getDishes, updateDish, deleteDish ,getdish};