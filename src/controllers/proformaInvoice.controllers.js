const { Op, where } = require("sequelize");
const sequelize = require("../models/db");
const PO = require("../models/po.models");
const poi = require("../models/poItem.models");
const pfi = require("../models/proformaInvoice.models");
const ra = require("../models/receivingAdvice.models");
const i = require("../models/invoice.models");
const rai = require("../models/receivingAdviceItem.models");
const pfii = require("../models/proformaInvoiceItem.models");
const pfir = require("../models/proformaInvoiceResponse.models");
const pfiList = require("../models/pfiList.models");
const pfiDetail = require("../models/pfiDetail.models");
const invCreated = require("../models/invCreated.models");
const { filter } = require("lodash");
const itemInv = require("../models/itemInv.models");
const InvItemC = require("../models/InvItemC.models");
const piri = require("../models/piri.models");
const pfirItemCreated = require("../models/pfirItemCreated.models");

async function getPfiAll(req, res, next) {
  try {
    const { purchase_order } = req.query;
    const { merchant } = req.query;
    const { store } = req.query;
    const { business_unit } = req.query;
    const { status } = req.query;
    const { start_date } = req.query;
    const { end_date } = req.query;
    const { supplier_code } = req.query;
    // const { isactive } = req.query;

    const startedDate = new Date(start_date);
    const endDate = new Date(end_date);
    const filter = {};
    if (purchase_order) {
      filter.purchase_order = { [Op.iLike]: `%${purchase_order}%` };
    }
    if (merchant) {
      filter.merchant = { [Op.iLike]: `%${merchant}%` };
    }
    if (store) {
      filter.store_code = { [Op.any]: [store] };
    }
    if (business_unit) {
      filter.business_unit = { [Op.iLike]: `%${business_unit}%` };
    }
    if (status) {
      filter.status = { [Op.iLike]: `%${status}%` };
    }
    if (start_date && end_date) {
      filter.date_updated = { [Op.between]: [startedDate, endDate] };
    }
    if (supplier_code) {
      filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
    }
    // if (isactive) {
    //   filter.isactive = "Y";
    // }

    if (
      req.query.status == "ALL" ||
      req.query.business_unit == "ALL" ||
      req.query.store == "ALL" ||
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
        const pfi = await pfiList.findAll({
          where: { supplier_code: supplier_code },
          limit: 100,
        });
        res.status(200).json({
          code: 0,
          result: {
            items: pfi,
          },
          message: "ok",
          type: "success",
        });
      }
    } else {
      const page = req.query.page || 1; // Current page number
      const limit = req.query.limit || 1000; // Number of records per page
      const PFI = await pfiList.findAll({
        where: filter,
      });
      res.status(200).json({
        code: 0,
        result: {
          items: PFI,
        },
        message: "ok",
        type: "success",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

//view info
async function viewbycdtinfo(req, res, next) {
  try {
    const { id } = req.body;
    const filter = {};
    const filter1 = {};
    if (id) {
      filter.url = { [Op.eq]: `${id}` };
    }
    const PFI = await pfi.findOne({
      where: filter,
      attributes: [
        "id",
        "receiving_advice",
        "date_updated",
        "revision",
        "status",
      ],
    });

    filter1.id = { [Op.eq]: `${PFI.receiving_advice}` };

    const RA = await ra.findAll({
      where: filter1,
      include: [
        {
          model: PO,
          as: "po",
          attributes: [
            "sender_code",
            "store_code",
            "delivery_to",
            "dept_code",
            "department_name",
            "po_no",
            "order_date",
            "supplier_name",
            "supplier_code",
            "supplier_phone",
            "supplier_fax_number",
          ],
        },
      ],
      attributes: ["purchase_order"],
    });

    const update = await pfi
      .update(
        {
          status: "AWAITING_ACTION",
        },
        {
          where: { url: id, status: "NEW" },
        }
      )
      .then((update) => {
        console.log(`${update} record(s) updated successfully.`);
      })
      .catch((error) => {
        console.error("Error updating records:", error);
      });

    res.status(200).json({
      code: 0,
      result: { PFI, RA },
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
    const { id } = req.body;
    const filter = {};
    if (id) {
      filter.url = { [Op.eq]: `${id}` };
    }

    const POI = await pfiDetail.findAll({
      where: filter,
    });
    res.status(200).json({
      code: 0,
      result: {
        items: POI,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

async function actionPfi(req, res) {
  const { action } = req.body;
  //console.log(req.body);
  if (action === "ACCEPT") {
    try {
      const { id } = req.body;
      // const filter = {};
      // if (id) {
      // 	filter.pfi_id = { [Op.eq]: `${id}` };
      // }
      const PFI = await invCreated.findByPk(id);

      const creatInvoice = await i.create({
        created_by: "system",
        created_on: new Date(),
        last_updated_by: "system",
        last_updated_on: new Date(),
        currency_code: "IDR",
        due_date: new Date(),
        invoice_date: new Date(),
        invoice_id: PFI.invoice_id,
        receive_code: PFI.receive_code,
        total_gross_amount: PFI.total_gross_amount,
        total_luxury_amount: PFI.total_luxury_amount,
        total_net_amount: PFI.total_net_amount,
        total_vat_amount: PFI.total_vat_amount,
        // vendor_id: '',
        // voucher_id_in_source: '',
        mversion: 0,
        city: PFI.city,
        company_address1: PFI.company_address1,
        company_address2: PFI.company_address2,
        company_name: PFI.company_name,
        country: PFI.country,
        date_updated: new Date(),
        dept_code: PFI.dept_code,
        ima_processed: PFI.ima_processed,
        name: PFI.name,
        // peoplesoft_amount: '',
        postal_code: PFI.postal_code,
        purchase_price_correction: PFI.purchase_price_correction,
        revision: PFI.revision,
        status: "DRAFT",
        store_code: PFI.store_code,
        supplier_code: PFI.supplier_code,
        supplier_grp_id: PFI.supplier_grp_id,
        //tax_invoice_date: '',
        // tax_serial_number: '',
        vat_correction: PFI.vat_correction,
        purchase_order: PFI.purchase_order,
        business_unit: 2,
        //accepted_date: '',
        company_registration_number: PFI.company_registration_number,
        fax: PFI.fax,
        telephone_number: PFI.telephone,
        email: PFI.email,
        // accept_reject_by: '',
        //sent_date: '',
        //ima_sent_date: '',
        is_retracted: "N",
        etax_status: "WO_ETAX",
        flag_status: 0,
        //orig_tax_invoice_date: '',
        pfi_cdt: PFI.pfi_cdt,
        pfi_rev: PFI.pfi_rev,
        //scan2_receive_date: '',
        cdt: PFI.cdt,
      });

      const inv = await InvItemC.findAll({
        where: { pro_forma_invoice: id },
        raw: true, // <--- HERE
      });

      const invItem = await itemInv.bulkCreate(
        inv.map((inv) => {
          return {
            created_by: "system",
            created_on: new Date(),
            // last_updated_by: "system",
            // last_updated_on: new Date(),
            mversion: 0,
            luxury_tax_percentage: 0,
            tax_percentage: 11,
            total_qty: inv.received_qty,
            unit_price: inv.unit_price,
            invoice: creatInvoice.id,
            purchase_order_item: inv.poi_id,
            // c_item_barcode: cPfiItem.barcode,
            // c_item_code: cPfiItem.item_code,
            // c_item_name: cPfiItem.item_name,
            // c_line_no: cPfiItem.line_no,
            // c_tot_base_con_margin: cPfiItem.total_base_con_margin,
            // c_tot_base_con_payable: cPfiItem.total_base_con_payable,
            // c_tot_con_payable_amt: 0,
            // c_ven_promo_support_amt: 0,
          };
        })
      );

      if (creatInvoice) {
        const updatePfi = await pfi
          .update(
            {
              status: "ACCEPTED",
            },
            {
              where: { id: PFI.id },
            }
          )
          .then((updatePfi) => {
            console.log(`${updatePfi} record(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating records:", error);
          });

        const updatePo = await PO.update(
          {
            status: "INV_CREATED",
          },
          {
            where: { id: PFI.purchase_order },
          }
        )
          .then((updatePo) => {
            console.log(`${updatePo} record(s) updated successfully.`);
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
      } else {
        console.log("Error created rows: ", creatInvoice);
      }
    } catch (error) {
      console.log(error);
    }
  } else if (action === "REJECT") {
    const { id } = req.body;
    const { username } = req.body;
    try {
      const PFI = await pfi.findByPk(id);
      if (PFI) {
        const creatPfir = await pfir.create({
          created_by: username,
          created_on: new Date(),
          last_updated_by: username,
          last_updated_on: new Date(),
          pro_forma_invoice_date: PFI.pro_forma_invoice_date,
          receiver_code: PFI.receive_code,
          revision: 1,
          status: "DRAFT",
          total_amount: PFI.total_amount,
          mversion: 0,
          date_updated: PFI.date_updated,
          dept_code: PFI.dept_code,
          litigation_file_processed: "",
          store_code: PFI.store_code,
          supplier_code: PFI.supplier_code,
          supplier_grp_id: 0, //TODO
          receiving_advice: PFI.receiving_advice,
          sent_date: new Date(),
          approved_by: "System",
          // first_approver: '',	//TODO
          // second_approver: 0 //TODO
        });

        const createPfirItem = await pfirItemCreated.findAll({
          where: { pro_forma_invoice: id },
          raw: true, // <--- HERE
        });

        const pfirItem = await piri.bulkCreate(
          createPfirItem.map((createPfirItem) => {
            return {
              created_by: username,
              created_on: new Date(),
              // last_updated_by: "system",
              // last_updated_on: new Date(),
              original_price: createPfirItem.unit_price,
              reconciled: createPfirItem.reconciled,
              //remarks: '',
              mversion: 0,
              is_accepted: "Y",
              pro_forma_invoice_response: creatPfir.id,
              receiving_advice_item: createPfirItem.id,
            };
          })
        );
        if (creatPfir) {
          const updateRA = await ra
            .update(
              {
                status: "REJECTED",
              },
              {
                where: { id: PFI.receiving_advice },
              }
            )
            .then((updateRA) => {
              console.log(`${updateRA} record(s) updated successfully.`);
            })
            .catch((error) => {
              console.error("Error updating records:", error);
            });

          const RA = await ra.findOne({
            where: { id: [PFI.receiving_advice] },
          });
          console.log(RA.purchase_order);

          const updatePo = await PO.update(
            {
              status: "PFI_CREATED",
            },
            {
              where: { id: RA.purchase_order },
            }
          )
            .then((updatePo) => {
              console.log(`${updatePo} record(s) updated successfully.`);
            })
            .catch((error) => {
              console.error("Error updating records:", error);
            });

          res.status(200).json({
            code: 0,
            result: {
              pfir_id: creatPfir.id,
            },
            message: "ok",
            type: "success",
          });
        } else {
          console.log("Error created rows: ", creatPfir);
        }
      } else {
        console.log("ID not found: ", PFI);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function actionBack(req, res) {
  console.log(req.body);
  const { id } = req.body;
  try {
    const PFI = await pfi.findOne({
      where: { id: id },
    });

    if (PFI) {
      console.log(PFI);
      const updatePfi = await ra
        .update(
          {
            status: "AWAITING_ACTION",
          },
          {
            where: { id: PFI.receiving_advice },
          }
        )
        .then((updatePfi) => {
          console.log(`${updatePfi} record(s) updated successfully.`);
        })
        .catch((error) => {
          console.error("Error updating records:", error);
        });

      res.status(200).json({
        code: 0,
        result: {
          ra_id: PFI.receiving_advice,
        },
        message: "ok",
        type: "success",
      });
    } else {
      console.log("test");
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateUrl(req, res, next) {
  try {
    const {id}= req.body;
    const {url}= req.body;

    const PFI = await pfi.update({
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
  getPfiAll,
  viewbycdtinfo,
  viewbycdtdetail,
  actionPfi,
  actionBack,
  updateUrl
};
