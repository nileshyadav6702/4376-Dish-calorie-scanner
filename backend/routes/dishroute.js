import express from "express";
import {createDish,getDishes,updateDish,deleteDish,getdish} from "../controllers/dishcontroller.js";

const router = express.Router();

router.post("/", createDish);
router.get("/", getDishes);
router.get("/:id", getdish);
router.put("/", updateDish);
router.delete("/", deleteDish);


export default router;