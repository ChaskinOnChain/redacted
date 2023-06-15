import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    picture: String,
    comments: {
      type: Array,
      default: [],
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

let Post;

if (mongoose.models.Post) {
  Post = mongoose.model("Post");
} else {
  Post = mongoose.model("Post", PostSchema);
}

export default Post;
