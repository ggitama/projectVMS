const multer = require("multer");

const imageFilter = (req, file, cb) => {
 // if (file.mimetype.startsWith("xlsx")) {
  if (['xls', 'xlsx', 'pdf']){
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${(Date.now())}-${file.originalname}.pdf`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;