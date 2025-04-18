import express from "express"
import { getTrendingNews } from "../controllers/newsController.js"

const router = express.Router()

router.get("/", getTrendingNews)

export default router
