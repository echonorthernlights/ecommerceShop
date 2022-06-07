import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

//Image upload using multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
//Check file type
function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb("Images Only");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.route("/").post(upload.single("image"), (req, res) => {
  console.log(req.file, req.body);
  res.send(`/${req.file.path}`);
});

// router.post("/", upload.single("image"), (req, res) => {
//   res.send(`/${req.file.path}`);
// });
export default router;
