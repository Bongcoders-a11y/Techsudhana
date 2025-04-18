import express from "express"
import { submitFeedback, getFeedbackByNewsId } from "../controllers/feedbackController.js"

const router = express.Router()

router.post("/", submitFeedback)
router.get("/:newsId", getFeedbackByNewsId)

export default router
