import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  calories: { type: Number, required: true },
});

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [itemSchema],
});


const Dish = mongoose.model("Dish", dishSchema);

export default Dish;