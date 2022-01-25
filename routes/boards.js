import express from "express";
import BoardsController from "../controllers/boards.js";
import catchAsync from "../utils/catchAsync.js";
const router = express.Router();

router.post("/:board", catchAsync(BoardsController.postMessage));

router.get("/:board/update_messages/:newest_message_id", catchAsync(BoardsController.getNewMessages));

router.get("/:board/get_messages/:num_messages_requested/:last_message_id", catchAsync(BoardsController.getXMessages));

export default router;