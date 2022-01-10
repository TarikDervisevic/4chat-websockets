import express from "express";
import BoardsController from "../controllers/boards.js";
import catchAsync from "../utils/catchAsync.js";
const router = express.Router();

router.post("/:boardname", catchAsync(BoardsController.postMessage))

router.get("/:boardname", catchAsync(BoardsController.getXMessages))

export default router;