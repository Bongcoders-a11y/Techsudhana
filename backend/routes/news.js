import express from "express"
import { submitNews, getNewsById, getAllNews, getTrendingNews, markAsTrending } from "../controllers/newsController.js"

const router = express.Router()

router.post("/", submitNews)
router.get("/", getAllNews)
router.get("/trending", getTrendingNews)
router.get("/:id", getNewsById)
router.patch("/:id/trending", markAsTrending)

export default router
