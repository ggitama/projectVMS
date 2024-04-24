const { query } = require("express");
const { Op, Sequelize } = require("sequelize");
const consPfiList = require("../models/consPfiList.models");
const consPfiInfo = require("../models/consPfiInfo.models");
const consPfiDetail = require("../models/consPfiDetail.models");
const i = require("../models/invoice.models");
const consPfi = require("../models/consPfi.models");
const consPfiItem = require("../models/consPfiItem.models");
const itemInv = require("../models/itemInv.models");
const consPfiUpdate = require("../models/consPfiUpdate.models");

//list data filter
async function getConsPfList(req, res, next) {
  try {
    const { merchant } = req.query;
    const { status } = req.query;
    const { start_date } = req.query;
    const { end_date } = req.query;
    const { toko } = req.query;
    const { business_unit } = req.query;
    const { cdt } = req.query;
    const { supplier_code } = req.query;
    const { consignment } = req.query;
    // const { isactive } = req.query;
    const startedDate = new Date(start_date);
    const endDate = new Date(end_date);

    const filter = {};
    if (merchant) {
      filter.merchant = { [Op.iLike]: `%${merchant}%` };
    }
    if (status) {
      filter.status = { [Op.iLike]: `%${status}%` };
    }
    if (start_date && end_date) {
      filter.tanggal_pfi = { [Op.between]: [startedDate, endDate] };
    }
    if (toko) {
      filter.store = { [Op.iLike]: `%${toko}%` };
    }
    if (business_unit) {
      filter.business_unit = { [Op.iLike]: `%${business_unit}%` };
    }
    if (cdt) {
      filter.referensi = { [Op.iLike]: `%${cdt}%` };
    }
    if (supplier_code) {
      filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
    }
    if (consignment) {
      filter.pfi_source = { [Op.iLike]: `${consignment}` };
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
        const CP = await consPfiList.findAll({
          where: { supplier_code: supplier_code},
          limit: 100,
        });
        res.status(200).json({
          code: 0,
          result: {
            items: CP,
          },
          message: "ok",
          type: "success",
        });
      }
    } else {
      const CP = await consPfiList.findAll({
        where: filter,
        limit,
      });
      res.status(200).json({
        code: 0,
        result: {
          items: CP,
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

//view detail
async function viewbycdtinfo(req, res, next) {
  try {
    const { cdt } = req.body;
    const filter = {};
    if (cdt) {
      filter.url = { [Op.eq]: `${cdt}` };
    }

    const page = req.query.page || 1; // Current page number
    const limit = req.query.limit || 1000; // Number of records per page
    const { field } = req.query;
    const { order } = req.query;

    const CP = await consPfiInfo.findAll({
      where: filter,
      limit,
    });

    const update = await consPfiUpdate.update(
      {
        status: "AWAITING_ACTION",
      },
      {
        where: { cdt: cdt, status: "NEW" },
      }
    );

    res.status(200).json({
      code: 0,
      result: {
        items: CP,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

//view detail
async function viewbycdtdetail(req, res, next) {
  try {
    const { cdt } = req.body;
    const filter = {};
    if (cdt) {
      filter.url = { [Op.eq]: `${cdt}` };
    }

    const page = req.query.page || 1; // Current page number
    const limit = req.query.limit || 1000; // Number of records per page
    const { field } = req.query;
    const { order } = req.query;

    const CP = await consPfiDetail.findAll({
      where: filter,
      limit,
    });
    res.status(200).json({
      code: 0,
      result: {
        items: CP,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

//view detail
async function acceptConsPfi(req, res, next) {
  try {
    const { cdt, cdt2 } = req.body;
    // const { total_net_amount } = req.body;
    // const { total_vat_amount } = req.body;

    const filter = {};
    const filter2 = {};

    if (cdt) {
      filter.cdt = { [Op.iLike]: `${cdt}` };
    }
    if (cdt2) {
      filter2.pfi_cdt = { [Op.iLike]: `${cdt2}` };
    }

    const cPfi = await consPfi.findOne(filter);
    const creatInvoice = await i.create({
      created_by: "system",
      created_on: new Date(),
      last_updated_by: "system",
      last_updated_on: new Date(),
      currency_code: "IDR",
      due_date: new Date(),
      invoice_date: new Date(),
      invoice_id: cPfi.invoice_id,
      //receive_code: PFI.receive_code,
      total_gross_amount: cPfi.total_gross_amount,
      total_luxury_amount: cPfi.total_luxury_amount,
      total_net_amount: cPfi.total_net_amount,
      total_vat_amount: cPfi.total_vat_amount,
      vendor_id: cPfi.vendor_id,
      voucher_id_in_source: cPfi.voucher_id_in_source,
      mversion: cPfi.mversion,
      city: cPfi.city,
      company_address1: cPfi.company_address1,
      company_address2: cPfi.company_address2,
      company_name: cPfi.company_name,
      country: cPfi.country,
      date_updated: new Date(),
      dept_code: cPfi.dept_code,
      ima_processed: "N",
      //   name: cPfi.name,
      //   peoplesoft_amount: cPfi.peoplesoft_amount,
      postal_code: cPfi.postal_code,
      purchase_price_correction: cPfi.purchase_price_correction,
      revision: cPfi.revision,
      status: "DRAFT",
      store_code: cPfi.store_code,
      supplier_code: cPfi.supplier_code,
      //supplier_grp_id: PFI.supplier_grp_id,
      //tax_invoice_date: '',
      // tax_serial_number: '',
      vat_correction: cPfi.vat_correction,
      //   purchase_order: cPfi.purchase_order,
      business_unit: cPfi.business_unit,
      //accepted_date: '',
      company_registration_number: cPfi.company_registration_number,
      fax: cPfi.fax,
      telephone_number: cPfi.telephone,
      email: cPfi.email,
      //   accept_reject_by: ,
      //   sent_date: '',
      //   ima_sent_date: '',
      is_retracted: cPfi.is_retracted,
      etax_status: cPfi.etax_status,
      flag_status: cPfi.flag_status,
      //   orig_tax_invoice_date: cPfi.orig_tax_invoice_date,
      pfi_cdt: cdt,
      pfi_rev: cPfi.pfi_rev,
      //scan2_receive_date: '',
      cdt: cdt,
    });

    const cPfiItem = await consPfiItem.findAll({
      where: filter2,
      raw: true, // <--- HERE
    });

    const invItem = await itemInv.bulkCreate(
      cPfiItem.map((cPfiItem) => {
        return {
          created_by: "system",
          created_on: new Date(),
          last_updated_by: "system",
          last_updated_on: new Date(),
          mversion: 0,
          luxury_tax_percentage: cPfiItem.lgt_amount,
          tax_percentage: 10,
          total_qty: 10,
          unit_price: cPfiItem.total_base_con_payable,
          invoice: creatInvoice.id,
          c_item_barcode: cPfiItem.barcode,
          c_item_code: cPfiItem.item_code,
          c_item_name: cPfiItem.item_name,
          c_line_no: cPfiItem.line_no,
          c_tot_base_con_margin: cPfiItem.total_base_con_margin,
          c_tot_base_con_payable: cPfiItem.total_base_con_payable,
          c_tot_con_payable_amt: 0,
          c_ven_promo_support_amt: 0,
        };
      })
    );

    const updatePfi = await consPfiUpdate
      .update({ status: "ACCEPTED" }, { where: { cdt } })
      .then((updatePfi) => {
        console.log(`${updatePfi} record(s) updated successfully.`);
      })
      .catch((error) => {
        console.error("Error updating records:", error);
      });

    res.status(200).json({
      code: 0,
      result: {
        inv_id: creatInvoice.id,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

async function updateUrl(req, res, next) {
  try {
    const { id }= req.body;
    const { url }= req.body;

    const CP = await consPfiUpdate.update({
      url: url
    }, {where: {cdt: id}});

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
  getConsPfList,
  viewbycdtinfo,
  viewbycdtdetail,
  acceptConsPfi,
  updateUrl
};
