const fs = require("fs");
const tii = require("../models/taxInvoiceInfo.models");
const { promises: fss } = require("node:fs");
const { pdf } = require("pdf-to-img");
const Jimp = require("jimp");
const { default: jsQR } = require("jsqr");

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
    console.log(req.file.filename);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    const { id } = req.body;

    const TII = await tii.findOne({
      where: { invoice: id },
      order: [["id", "DESC"]],
    });
    if (req.file.size > 2097152) {
      // 2 MiB for bytes.
      return res.send("File size must under 2MB!");
    } else {
      if (TII) {
        n = TII.seq || 0;
        const TEST = n * 1 + 1;
        console.log(n);

        if (TEST === 1 || TEST === 2) {
          const tiiCreate = tii
            .create({
              created_on: new Date(),
              tax_invoice_pdf_file_name: req.file.filename,
              invoice: id,
              mversion: 0,
              seq: TEST,
              is_latest: "Y",
              type: 1,
              extracted: "N",
            })
            .then((u) => {
              return res.send(`File has been uploaded.`);
            });

          const inputPath =
            "upload/tax/" +
            getDatePath(new Date()) +
            req.query.supplier_code +
            "/" +
            `TAX_${req.query.purchase_order}.pdf`;
         
          const document = await pdf(inputPath);

          for await (const image of document) {
            await fss.writeFile(`test.png`, image);

            const buffer = await fss.readFile("test.png");
          }

          const image = await Jimp.read("test.png");
          // Get the image data
          const imageData = {
            data: new Uint8ClampedArray(image.bitmap.data),
            width: image.bitmap.width,
            height: image.bitmap.height,
          };

          // Use jsQR to decode the QR code
          const decodedQR = jsQR(
            imageData.data,
            imageData.width,
            imageData.height
          );

          if (!decodedQR) {
            throw new Error("QR code not found in the image.");
          }
          console.log(decodedQR.data);

          tii
            .update({ url_qr: decodedQR.data }, { where: { invoice: id } })
            .then((u) => {
              console.log(`record(s) updated successfully.`);
            })
            .catch((error) => {
              console.error("Error updating records:", error);
            });

          return decodedQR.data;
        } else {
          return res.send(`maximum 2 file.`);
        }
      } else {
        const tiiCreate = tii
          .create({
            created_on: new Date(),
            tax_invoice_pdf_file_name: req.file.filename,
            invoice: id,
            mversion: 0,
            seq: 1,
            is_latest: "Y",
            type: 1,
            extracted: "N",
          })
          .then((u) => {
            return res.send(`File has been uploaded.`);
          });

        const inputPath =
          "upload/tax/" +
          getDatePath(new Date()) +
          req.query.supplier_code +
          "/" +
          `TAX_${req.query.purchase_order}.pdf`;
  
        const document = await pdf(inputPath);

        for await (const image of document) {
          await fss.writeFile(`test.png`, image);

          const buffer = await fss.readFile("test.png");
        }

        const image = await Jimp.read("test.png");
        // Get the image data
        const imageData = {
          data: new Uint8ClampedArray(image.bitmap.data),
          width: image.bitmap.width,
          height: image.bitmap.height,
        };

        // Use jsQR to decode the QR code
        const decodedQR = jsQR(
          imageData.data,
          imageData.width,
          imageData.height
        );

        if (!decodedQR) {
          throw new Error("QR code not found in the image.");
        }
        console.log(decodedQR.data);

        tii
          .update({ url_qr: decodedQR.data }, { where: { invoice: id } })
          .then((u) => {
            console.log(`record(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating records:", error);
          });

        return decodedQR.data;
      }
    }
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};