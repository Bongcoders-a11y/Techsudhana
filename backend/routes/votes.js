import express from "express"
import { voteOnNews } from "../controllers/voteController.js"

const router = express.Router()

router.post("/:id", voteOnNews)

export default router
