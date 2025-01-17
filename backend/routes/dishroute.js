import express from "express";
import {createDish,getDishes,updateDish,deleteDish} from "../controllers/dishcontroller.js";

const router = express.Router();

router.post("/", createDish);
router.get("/", getDishes);
router.put("/:id", updateDish);
router.delete("/:id", deleteDish);


export default router;