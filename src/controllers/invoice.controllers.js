const { query } = require("express");
const { Op } = require("sequelize");
const i = require("../models/invoice.models");
//const PO = require("../models/po.models");
const { call } = require("function-bind");
const sc = require("../models/supplierContact.models");
const tii = require("../models/taxInvoiceInfo.models");
const multer = require("multer");
const fs = require("fs");
const TII3 = require("../models/TII3");
const TII2 = require("../models/TII2");
const TII4 = require("../models/TII4");
const TII1 = require("../models/TII1");
const ra = require("../models/receivingAdvice.models");
const pfi = require("../models/proformaInvoice.models");
const itemInv = require("../models/itemInv.models");
const invoiceList = require("../models/invoiceList.models");
const TII5 = require("../models/TII5");
const ibtinvoice = require("../models/ibtinvoice.models");
const PO = require("../models/po.models");
//list data filter
async function getInvoiceAll(req, res, next) {
  try {
    const { purchase_order } = req.query;
    const { status } = req.query;
    const { start_date } = req.query;
    const { end_date } = req.query;
    const { business_unit_name } = req.query;
    const { store_code } = req.query;
    const { dept_code } = req.query;
    const { digital_invoice } = req.query;
    const { supplier_code } = req.query;
    // const { isactive } = req.query;

    const startedDate = new Date(start_date);
    const endDate = new Date(end_date);

    const filter = {};
    const filter2 = {};
    if (purchase_order) {
      filter.purchase_order = { [Op.iLike]: `%${purchase_order}%` };
    }
    if (status) {
      filter.status = { [Op.iLike]: `%${status}%` };
    }
    if (start_date && end_date) {
      filter.date_updated = { [Op.between]: [startedDate, endDate] };
    }
    if (business_unit_name) {
      filter.business_unit_name = { [Op.iLike]: `%${business_unit_name}%` };
    }
    if (store_code) {
      filter.store_code = { [Op.any]: [store_code] };
    }
    if (dept_code) {
      filter.dept_code = { [Op.iLike]: `%${dept_code}%` };
    }
    if (digital_invoice) {
      filter2.digital_invoice = { [Op.iLike]: `%${digital_invoice}%` };
    }
    if (supplier_code) {
      filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
    }
    // if (isactive) {
    //   filter.isactive = "Y";
    // }

    const page = req.query.page || 1; // Current page number
    const limit = req.query.limit || 1000; // Number of records per page
    const { field } = req.query;
    const { order } = req.query;

    if (
      req.query.status == "ALL" ||
      req.query.store_code == "ALL" ||
      (Object.keys(filter).length === 0 && Object.keys(filter2).length === 0)
    ) {
      if (
        Object.keys(filter).length === 0 &&
        Object.keys(filter2).length === 0
      ) {
        res.status(200).json({
          code: 0,
          result: {
            items: [],
          },
          message: "ok",
          type: "success",
        });
      } else {
        console.log("masuk");
        const I = await invoiceList.findAll({
          where: { supplier_code: supplier_code },
          limit: 1000,
        });
        res.status(200).json({
          code: 0,
          result: {
            items: I,
          },
          message: "ok",
          type: "success",
        });
      }
    } else {
      const page = req.query.page || 1; // Current page number
      const limit = req.query.limit || 1000; // Number of records per page

      const I = await invoiceList.findAll({
        where: filter,
        limit,
      });
      res.status(200).json({
        code: 0,
        result: {
          items: I,
        },
        message: "ok",
        type: "success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

//SAVE INFO SUPPLIER
async function actionSaveInfoSupp(req, res) {
  try {
    const { NAMA_PERUSAHAAN } = req.body;
    const { ALAMAT_PERUSAHAAN } = req.body;
    const { KODE_POS } = req.body;
    const { KOTA } = req.body;
    const { NEGARA } = req.body;
    const { NAMA } = req.body;
    const { TELEPON } = req.body;
    const { FAX } = req.body;
    const { NPWP } = req.body;
    const { EMAIL } = req.body;
    const { I_ID } = req.body;
    console.log(req.body);
    const updateSup = await i
      .update(
        {
          company_name: NAMA_PERUSAHAAN,
          company_address1: ALAMAT_PERUSAHAAN,
          postal_code: KODE_POS,
          city: KOTA,
          country: NEGARA,
          name: NAMA,
          telephone_number: TELEPON,
          fax: FAX,
          company_registration_number: NPWP,
          email: EMAIL,
        },
        {
          where: { id: I_ID },
        }
      )
      .then((updateSup) => {
        console.log(`${updateSup} record(s) updated successfully.`);
      })
      .catch((error) => {
        console.error("Error updating records:", error);
      });

    res.status(200).json({
      code: 0,
      result: updateSup,
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  }
}

//SAVE DETAIL INVOICE
async function actionSaveDetailInv(req, res) {
  try {
    const { NOMOR_SERI_PAJAK } = req.body;
    const { CONFIRM_N_SERI_PAJAK } = req.body;
    const { TANGGAL_FAKTUR_PAJAK } = req.body;
    const { NOMOR_INVOICE_SUPPLIER } = req.body;
    const { TANGGAL_INVOICE_SUPPLIER } = req.body;
    const { FLAG_STATUS } = req.body;
    const { ID } = req.body;

    const updateInv = await i
      .update(
        {
          tax_serial_number: NOMOR_SERI_PAJAK,
          tax_serial_number: CONFIRM_N_SERI_PAJAK,
          tax_invoice_date: TANGGAL_FAKTUR_PAJAK,
          invoice_id: NOMOR_INVOICE_SUPPLIER,
          flag_status: FLAG_STATUS,
          invoice_date: TANGGAL_INVOICE_SUPPLIER,
        },
        {
          where: { id: ID },
        }
      )
      .then((updateInv) => {
        console.log(`${updateInv} record(s) updated successfully.`);
      })
      .catch((error) => {
        console.error("Error updating records:", error);
      });

    res.status(200).json({
      code: 0,
      result: updateInv,
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  }
}

//SAVE DETAIL ITEM INVOICE
async function actionSaveDetailItem(req, res) {
  try {
    const { vat_correction } = req.body;
    const { ppn_bm } = req.body;
    const { ID } = req.body;

    const updateInv = await i
      .update(
        {
          vat_correction: vat_correction,
          total_vat_amount: ppn_bm,
        },
        {
          where: { id: ID },
        }
      )
      .then((updateInv) => {
        console.log(`${updateInv} record(s) updated successfully.`);
      })
      .catch((error) => {
        console.error("Error updating records:", error);
      });

    res.status(200).json({
      code: 0,
      result: updateInv,
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  }
}

//KIRIM INVOICE
async function actionSend(req, res) {
  console.log(req.body);
  const { id } = req.body;
  try {
    const I = await i.findOne({
      where: { id: id },
    });

    const updateInv = await i
      .update(
        {
          status: "ACCEPTED",
        },
        {
          where: { id: id },
        }
      )
      .then((updateInv) => {
        console.log(`${updateInv} record(s) updated successfully.`);
      })
      .catch((error) => {
        console.error("Error updating records:", error);
      });

    const updatePO = await PO.update(
      {
        status: "INV_ACCEPTED",
      },
      {
        where: { id: I.purchase_order },
      }
    );

    res.status(200).json({
      code: 0,
      result: {
        i_id: I.id,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  }
}

async function taxInvoiceFile(req, res) {
  try {
    const { id } = req.body;

    const filter = {};
    if (id) {
      filter.invoice = { [Op.eq]: `${id}` };
    }
    const TII = await TII1.findAll({
      where: filter,
    });
    res.status(200).json({
      code: 0,
      result: {
        items: TII,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

async function supportDocSuratJalan(req, res) {
  const { invoice } = req.body;
  try {
    const filter = {};
    if (invoice) {
      filter.invoice = { [Op.eq]: `${invoice}` };
    }
    const TII = await TII2.findAll({
      where: filter,
    });
    res.status(200).json({
      code: 0,
      result: {
        items: TII,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

async function supportDocFileInvoice(req, res) {
  const { invoice } = req.body;

  try {
    const filter = {};
    if (invoice) {
      filter.invoice = { [Op.eq]: `${invoice}` };
    }
    const TII = await TII3.findAll({
      where: filter,
    });

    res.status(200).json({
      code: 0,
      result: {
        items: TII,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

async function supportDocFileKwitansi(req, res) {
  const { invoice } = req.body;

  try {
    const filter = {};
    if (invoice) {
      filter.invoice = { [Op.eq]: `${invoice}` };
    }
    const TII = await TII4.findAll({
      where: filter,
    });
    res.status(200).json({
      code: 0,
      result: {
        items: TII,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

async function supportDocEkspedisi(req, res) {
  const { invoice } = req.body;
  try {
    const filter = {};
    if (invoice) {
      filter.invoice = { [Op.eq]: `${invoice}` };
    }
    const TII = await TII5.findAll({
      where: filter,
    });
    res.status(200).json({
      code: 0,
      result: {
        items: TII,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

async function deleteTaxInv(req, res) {
  try {
    const { id } = req.body;

    const filter = {};
    if (id) {
      filter.invoice = { [Op.eq]: `${id}` };
    }
    filter.type = { [Op.eq]: `1` };

    const INV = await tii.findOne({
      where: filter,
    });
    if (INV) {
      const TII = await tii.destroy({
        where: { id: INV.id },
      });
      res.status(200).json({
        code: 0,
        result: {
          items: TII,
        },
        message: "ok",
        type: "success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

async function deleteSuratJalan(req, res) {
  try {
    const { id } = req.body;

    const filter = {};
    if (id) {
      filter.invoice = { [Op.eq]: `${id}` };
    }
    filter.type = { [Op.eq]: `2` };

    const INV = await tii.findOne({
      where: filter,
    });
    if (INV) {
      const TII = await tii.destroy({
        where: { id: INV.id },
      });
      res.status(200).json({
        code: 0,
        result: {
          items: TII,
        },
        message: "ok",
        type: "success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

async function deleteInv(req, res) {
  try {
    const { id } = req.body;

    const filter = {};
    if (id) {
      filter.invoice = { [Op.eq]: `${id}` };
    }
    filter.type = { [Op.eq]: `3` };

    const INV = await tii.findOne({
      where: filter,
    });
    if (INV) {
      const TII = await tii.destroy({
        where: { id: INV.id },
      });
      res.status(200).json({
        code: 0,
        result: {
          items: TII,
        },
        message: "ok",
        type: "success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

async function deleteKwitansi(req, res) {
  try {
    const { id } = req.body;

    const filter = {};
    if (id) {
      filter.invoice = { [Op.eq]: `${id}` };
    }
    filter.type = { [Op.eq]: `4` };

    const INV = await tii.findOne({
      where: filter,
    });
    if (INV) {
      const TII = await tii.destroy({
        where: { id: INV.id },
      });
      res.status(200).json({
        code: 0,
        result: {
          items: TII,
        },
        message: "ok",
        type: "success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

async function deleteEkspedisi(req, res) {
  try {
    const { id } = req.body;

    const filter = {};
    if (id) {
      filter.invoice = { [Op.eq]: `${id}` };
    }
    filter.type = { [Op.eq]: `5` };

    const INV = await tii.findOne({
      where: filter,
    });
    if (INV) {
      const TII = await tii.destroy({
        where: { id: INV.id },
      });
      res.status(200).json({
        code: 0,
        result: {
          items: TII,
        },
        message: "ok",
        type: "success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

//BATALKAN INVOICE
async function actionBack(req, res) {
  const { id } = req.body;
  try {
    const I = await i.findOne({
      where: { id: id },
    });

    const RA = await ra.findOne({
      where: { purchase_order: I.purchase_order },
      attributes: ["id", "purchase_order"],
    });
    console.log(RA.id);
    const updatePfi = await pfi
      .update(
        {
          status: "AWAITING_ACTION",
        },
        {
          where: { receiving_advice: RA.id },
        }
      )
      .then((updatePfi) => {
        console.log(`${updatePfi} record(s) updated successfully.`);
      })
      .catch((error) => {
        console.error("Error updating records:", error);
      });

    const updateInv = await I.update(
      {
        status: "CANCELLED",
      },
      { where: { id: id } }
    );

    const PFI = await pfi.findOne({
      where: { receiving_advice: RA.id },
    });

    res.status(200).json({
      code: 0,
      result: {
        pfi_id: PFI.id,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  }
}

async function verifikasiDoc(req, res) {
  const { id } = req.body;
  try {
    const I = await i.findOne({
      where: { id: id },
    });

    const updateInv = await i
      .update(
        {
          status: "ACCEPTED",
        },
        {
          where: { id: id, status: "SENT" },
        }
      )
      .then((updateInv) => {
        console.log(`${updateInv} record(s) updated successfully.`);
      })
      .catch((error) => {
        console.error("Error updating records:", error);
      });

    const po = await PO.findOne({
      where: { id: I.purchase_order },
    });

    const itoProfit = await ibtinvoice.create({
      iivsitcd: I.store_code, 
      iivvencd: I.supplier_code, 
      iivinvno: I.purchase_order, 
      iivinvdate: I.invoice_date, 
      iivinvrcvdate: I.created_on, 
      iivnetamt: I.total_net_amount, 
      iivvatamt: I.total_vat_amount, 
      iivinvamt: I.total_net_amount + I.total_vat_amount, 
      iivordno: po.po_no, 
      iivorddate: po.order_date, 
      iivtaxinvno: I.tax_serial_number, 
      iivtaxinvdate: I.tax_invoice_date, 
      // iivnote, 
      iivlgtrate1:0, 
      iivlgtamt1: 0, 
      iivlgtrate2: 0, 
      iivlgtamt2: 0, 
      iivlgtrate3: 0, 
      iivlgtamt3: 0, 
      iivlgtrate4: 0, 
      iivlgtamt4: 0, 
      iivlgtrate5: 0, 
      iivlgtamt5: 0, 
      iivoptdat: po.expected_delivery_date, 
      iivcredat: I.created_on, 
      // iivuptdat: (I.last_updated_on), 
      flag_status: 0
    });
    res.status(200).json({
      code: 0,
      result: {
        inv_id: itoProfit,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  }
}

async function actionSaveDetailItem(req, res) {
  const { pajak } = req.body;
  const { ppn_bm } = req.body;
  const { ID } = req.body;
  try {
    console.log(req.body);
    const II = await itemInv.findOne({
      where: { id: ID },
    });

    const updateInv = await itemInv.update(
      {
        tax_percentage: pajak,
        luxury_tax_percentage: ppn_bm,
      },
      {
        where: { id: ID },
      }
    );

    res.status(200).json({
      code: 0,
      result: {
        i_id: II.invoice,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  }
}

async function getDataUpload(req, res) {
  const { INV } = req.body;
  try {
    console.log(req.query);
    const II = await tii.findOne({
      where: { invoice: INV, type: 1 },
    });

    const test = II.toJSON();
    const xx = test.resp_qr;
    console.log(xx);
    //res.send(test.resp_qr);

    res.status(200).json({
      code: 0,
      result: {
        xx,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  }
}

async function convertPdftoPng(req, res) {
  const filename = "pajak.pdf";
  const options = {
    density: 100,
    saveFilename: "file",
    savePath: "public/",
    format: "jpeg",
    width: 100,
    height: 100,
  };
  const storeAsImage = fromPath(`public/${filename}`, options);
  let dataBuffer = fs.readFileSync(`public/${filename}`);
  console.log(dataBuffer);
  pdf(dataBuffer).then(function (data) {
    for (
      var pageToConvertAsImage = 1;
      pageToConvertAsImage <= data.numpages;
      pageToConvertAsImage++
    ) {
      storeAsImage(pageToConvertAsImage).then((resolve) => {
        return resolve;
      });
    }

    res.send({
      filename: filename,
    });
  });
}

//SAVE DETAIL INVOICE
async function updateTaxExpired(req, res) {
  try {
    const { FLAG_TAX_EXPIRED } = req.body;
    const { ID } = req.body;

    const updateFlag = await i
      .update(
        {
          flag_status: FLAG_TAX_EXPIRED,
        },
        { where: { id: ID } }
      )
      .then((updateFlag) => {
        console.log(`${updateFlag} record(s) updated successfully.`);
      })
      .catch((error) => {
        console.error("Error updating records:", error);
      });

    const updateTax = await itemInv
      .update(
        {
          tax_percentage: 0,
        },
        { where: { invoice: ID } }
      )
      .then((updateTax) => {
        console.log(`${updateTax} record(s) updated successfully.`);
      })
      .catch((error) => {
        console.error("Error updating records:", error);
      });

    res.status(200).json({
      code: 0,
      result: updateFlag,
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateUrl(req, res, next) {
  try {
    const { id }= req.body;
    const { url }= req.body;

    const I = await i.update({
      url: url
    }, {where: {id: id}});

      res.status(200).json({
        code: 0,
        result: {
          items: id,
        },
        message: "ok",
        type: "success",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}
module.exports = {
  getInvoiceAll,
  actionSaveInfoSupp,
  actionSaveDetailInv,
  actionSaveDetailItem,
  actionSend,
  taxInvoiceFile,
  supportDocSuratJalan,
  supportDocFileInvoice,
  supportDocFileKwitansi,
  supportDocEkspedisi,
  deleteTaxInv,
  deleteSuratJalan,
  deleteInv,
  deleteKwitansi,
  deleteEkspedisi,
  actionBack,
  verifikasiDoc,
  actionSaveDetailItem,
  getDataUpload,
  convertPdftoPng,
  updateTaxExpired,
  updateUrl
};
