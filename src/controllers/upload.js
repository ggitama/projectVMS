const fs = require("fs");
const unggahBpfrList = require("../models/unggahBpfrList.models");

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    unggahBpfrList.create({
      // namafile: req.file.originalname,
      tanggal_upload: new Date,
      data_file: fs.readFileSync(
        __basedir + "/resources/uploads/" + req.file.filename
      ),
    }).then((u) => {
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};