import mongoose from "mongoose"

const newsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  analysis: {
    type: String,
    required: true,
  },
  realVotes: {
    type: Number,
    default: 0,
  },
  fakeVotes: {
    type: Number,
    default: 0,
  },
  realPercentage: {
    type: Number,
    default: 0,
  },
  fakePercentage: {
    type: Number,
    default: 0,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model("News", newsSchema)
