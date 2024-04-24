const fs = require("fs");
const fue = require("../models/fue.models");

function getDatePath(date) {
  return (
    date.getFullYear() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "/"
  );
}

const uploadFiles = async (req, res) => {
  try {
    if (!fs.existsSync('upload/Efaktur/' + getDatePath(new Date())+ req.body.supp_code + '/')) {
				fs.promises.mkdir('upload/Efaktur/' + getDatePath(new Date())+ req.body.supp_code + '/', { recursive: true });
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
		const { taxnumber } = req.body;
    const { supp_code } = req.body;
    if (req.file.size > 2097152){// 2 MiB for bytes.
      return res.send("File size must under 2MB!");
    }else{
      fue.create({
        file_name: req.file.filename,
        taxnumber: taxnumber,
        upload_date:  new Date,
        status: 'NEW',
        supp_code: supp_code
      }).then((u) => {
        return res.send(`File has been uploaded.`);
      });
    }
  }else{
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
		const { taxnumber } = req.body;
    const { supp_code } = req.body;
    if (req.file.size > 2097152){// 2 MiB for bytes.
      return res.send("File size must under 2MB!");
    }else{
      fue.create({
        file_name: req.file.filename,
        taxnumber: taxnumber,
        upload_date:  new Date,
        status: 'NEW',
        supp_code: supp_code
      }).then((u) => {
        return res.send(`File has been uploaded.`);
      });
    }
  }
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};