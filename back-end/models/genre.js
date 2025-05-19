import mongoose from "mongoose";

const genrescehma = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
    unique: true,
  },
});

export default mongoose.model("genre", genrescehma);
