const uploader = require("../../utilities/singleUploader");

function flatAvatarUpload(req, res, next) {
  const upload = uploader(
    "files",
    ["text/plain", "text/csv"],
    100000000,
    "Only csv & text files are allowed!"
  );

  //call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}
module.exports = flatAvatarUpload;
