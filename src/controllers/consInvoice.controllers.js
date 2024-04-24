const { query } = require("express");
const { Op } = require("sequelize");
const ci = require("../models/consInvList.models");
const ciInfo = require("../models/consInvInfo.models");
const ciDetail = require("../models/consInvDetail.models");
const tii = require("../models/taxInvoiceInfo.models");
const i = require("../models/invoice.models");
const sc = require("../models/supplierContact.models");
const TII4 = require("../models/TII4");
const TII3 = require("../models/TII3");
const TII1 = require("../models/TII1");
const fs = require("fs");
const path = require("path");
const itemInv = require("../models/itemInv.models");
const consInvList = require("../models/consInvList.models");
//list data filter

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

async function getConsInvAll(req, res, next) {
  try {
    const { merchant } = req.query;
    const { start_date } = req.query;
    const { end_date } = req.query;
    const { status } = req.query;
    const { business_unit } = req.query;
    const { supplier } = req.query;
    const { id_invoice } = req.query;
    const { supplier_code } = req.query;
    const { consignment } = req.query;
    // const { isactive } = req.query;
    const startedDate = new Date(start_date);
    const endDate = new Date(end_date);

    const filter = {};
    if (merchant) {
      filter.merchant = { [Op.iLike]: `%${merchant}%` };
    }
    if (start_date && end_date) {
      filter.invoice_date = { [Op.between]: [startedDate, endDate] };
    }
    if (status) {
      filter.status = { [Op.iLike]: `%${status}%` };
    }
    if (business_unit) {
      filter.business_unit = { [Op.iLike]: `%${business_unit}%` };
    }
    if (supplier) {
      filter.supplier = { [Op.iLike]: `%${supplier}%` };
    }
    if (id_invoice) {
      filter.id_invoice = { [Op.iLike]: `%${id_invoice}%` };
    }
    if (supplier_code) {
      filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
    }
    if (consignment) {
      filter.pfi_source = { [Op.iLike]: `%${consignment}%` };
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
      req.query.business_unit == "ALL" ||
      Object.keys(filter).length === 0
    ) {
      if (Object.keys(filter).length === 0) {
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
        const CI = await ci.findAll({
          where: { supplier_code: supplier_code },
          limit: 100,
        });
        res.status(200).json({
          code: 0,
          result: {
            items: CI,
          },
          message: "ok",
          type: "success",
        });
      }
    } else {
      const CI = await ci.findAll({
        where: filter,
      });
      res.status(200).json({
        code: 0,
        result: {
          items: CI,
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

//list data filter
async function consInvInfo(req, res, next) {
  try {
    if (
      !fs.existsSync(
        "upload/cons/tax/" +
          getDatePath(new Date()) +
          req.query.supplier_code +
          "/"
      ) ||
      !fs.existsSync(
        "upload/cons/invoice/" +
          getDatePath(new Date()) +
          req.query.supplier_code +
          "/"
      ) ||
      !fs.existsSync(
        "upload/cons/kwitansi/" +
          getDatePath(new Date()) +
          req.query.supplier_code +
          "/"
      )
    ) {
      fs.promises.mkdir(
        "upload/cons/tax/" +
          getDatePath(new Date()) +
          req.query.supplier_code +
          "/",
        { recursive: true }
      );
      fs.promises.mkdir(
        "upload/cons/invoice/" +
          getDatePath(new Date()) +
          req.query.supplier_code +
          "/",
        { recursive: true }
      );
      fs.promises.mkdir(
        "upload/cons/kwitansi/" +
          getDatePath(new Date()) +
          req.query.supplier_code +
          "/",
        { recursive: true }
      );

      console.log(getDatePath(new Date()));
      console.log(req.query.supplier_code);
      const { id } = req.body;
      const filter = {};
      if (id) {
        filter.url = { [Op.eq]: `${id}` };
      }
      const CI = await ciInfo.findAll({
        where: filter,
      });
      res.status(200).json({
        code: 0,
        result: {
          items: CI,
        },
        message: "ok",
        type: "success",
      });
    } else {
      const { id } = req.body;
      const filter = {};
      if (id) {
        filter.url = { [Op.eq]: `${id}` };
      }
      const CI = await ciInfo.findAll({
        where: filter,
      });
      res.status(200).json({
        code: 0,
        result: {
          items: CI,
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

//list data filter
async function consInvDetail(req, res, next) {
  try {
    const { id } = req.body;
    const filter = {};
    if (id) {
      filter.url = { [Op.eq]: `${id}` };
    }
    const page = req.query.page || 1; // Current page number
    const limit = req.query.limit || 1000; // Number of records per page
    const { field } = req.query;
    const { order } = req.query;

    const CI = await ciDetail.findAll({
      where: filter,
    });

    res.status(200).json({
      code: 0,
      result: {
        items: CI,
      },
      message: "ok",
      type: "success",
    });
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
    const { SC_ID } = req.body;
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
    const updateSupC = await sc
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
          business_unit_registration: NPWP,
        },
        {
          where: { id: SC_ID },
        }
      )
      .then((updateSupC) => {
        console.log(`${updateSupC} record(s) updated successfully.`);
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
    const { ID } = req.body;

    const updateInv = await i
      .update(
        {
          tax_serial_number: NOMOR_SERI_PAJAK,
          tax_serial_number: CONFIRM_N_SERI_PAJAK,
          tax_invoice_date: TANGGAL_FAKTUR_PAJAK,
          invoice_id: NOMOR_INVOICE_SUPPLIER,
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

async function supportDocFileInvoice(req, res) {
  const { id } = req.body;

  try {
    const filter = {};
    if (id) {
      filter.invoice = { [Op.eq]: `${id}` };
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
  const { id } = req.body;

  try {
    const filter = {};
    if (id) {
      filter.invoice = { [Op.eq]: `${id}` };
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
          status: "SENT",
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
      
      // const po = await consInvList.findOne({
      //   where: { id: I.purchase_order },
      // });

      const itoProfit = await ibtinvoice.create({
        iivsitcd: I.store_code, 
        iivvencd: I.supplier_code, 
        iivinvno: I.pfi_cdt, 
        iivinvdate: I.invoice_date, 
        iivinvrcvdate: I.created_on, 
        iivnetamt: I.total_net_amount, 
        iivvatamt: I.total_vat_amount, 
        iivinvamt: I.total_net_amount + I.total_vat_amount, 
        // iivordno: po.po_no, 
        // iivorddate: po.order_date, 
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
        inv_id: I.id,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  }
}

async function revisiDoc(req, res) {
  const { id } = req.body;
  try {
    const I = await i.findOne({
      where: { id: id },
    });

    const updateInv = await i
      .update(
        {
          status: "DRAFT",
          revision: +1,
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

    const TII = await tii.destroy({
      where: { invoice: id },
    });

    res.status(200).json({
      code: 0,
      result: {
        inv_id: I.id,
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
  getConsInvAll,
  consInvInfo,
  consInvDetail,
  actionSaveInfoSupp,
  actionSaveDetailInv,
  taxInvoiceFile,
  supportDocFileInvoice,
  supportDocFileKwitansi,
  actionSend,
  deleteTaxInv,
  deleteInv,
  deleteKwitansi,
  verifikasiDoc,
  revisiDoc,
  actionSaveDetailItem,
  updateUrl
  // actionBack
};
