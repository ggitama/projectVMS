const fs = require("fs");
const tii = require("../models/taxInvoiceInfo.models");
const unggahBpfrList = require("../models/unggahBpfrList.models");

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
		const { id } = req.body;
    if (req.file.size > 2097152){// 2 MiB for bytes.
      return res.send("File size must under 2MB!");
    }else{
    tii.create({
      created_on: new Date(),
      tax_invoice_pdf_file_name: req.file.filename,
      invoice: id,
      mversion: 0,
      seq: 0,
      is_latest: 'Y',
      type: 5
    }).then((u) => {
      return res.send(`File has been uploaded.`);
    });
  }
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};