import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to the root uploads folder
const uploadPath = path.resolve(__dirname, "uploads");

// Ensure it exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png||image\/webp/;
  const extname = path.extname(file.originalname);
  const mimetype = file.mimetype;
  console.log("upload path is", uploadPath);
  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("images only"), false);
  }
};

const upload = multer({ storage, fileFilter });

const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (error) => {
    if (error) {
      res.status(400).json(error.message);
    } else if (req.file) {
      res.status(200).json({
        message: "image uploaded succesfully",
        image: `https://movieshub-ivub.onrender.com/uploads/${req.file.filename}`,
      });
    } else {
      res.status(400).json({ message: "no image found" });
    }
  });
});

export default router;
