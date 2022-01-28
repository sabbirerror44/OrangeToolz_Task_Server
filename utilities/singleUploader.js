//external imports
const multer = require("multer");
const path = require("path");
const createError = require("http-errors");
const fs = require('fs');

function uploader(
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) {
  //File upload folder
  fs.mkdir = `${__dirname}/../public/uploads/${subfolder_path}/`
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;

  //define the storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const name = req.body.name;
      const fileExt = path.extname(file.originalname);
      const fileName = name;
      cb(null, fileName + fileExt);
    },
  });

  //prepare the final multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_msg));
      }
    },
  });

  return upload;
}

module.exports = uploader;
