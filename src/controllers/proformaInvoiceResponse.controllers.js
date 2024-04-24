const { query } = require("express");
const { Op, Sequelize } = require("sequelize");
const PO = require("../models/po.models");
const poi = require("../models/poItem.models");
const pfi = require("../models/proformaInvoice.models");
const pfii = require("../models/proformaInvoiceItem.models");
const pfir = require("../models/proformaInvoiceResponse.models");
const ra = require("../models/receivingAdvice.models");
const rai = require("../models/receivingAdviceItem.models");
const i = require("../models/invoice.models");
const pfirList = require("../models/pfirList.models");
const pfirDetail = require("../models/pfirDetail.models");
const piri = require("../models/piri.models");
const pfirInvCreated = require("../models/pfirInvCreated.models");
const itemInv = require("../models/itemInv.models");
const pfirInvItemC = require("../models/pfirInvItemC.models");

async function getPfirAll(req, res, next) {
  try {
    const { purchase_order } = req.query;
    const { supplier_name } = req.query;
    const { start_date } = req.query;
    const { end_date } = req.query;
    const { status } = req.query;
    const { store_code } = req.query;
    const { business_unit } = req.query;
    const { supplier_code } = req.query;
    // const { isactive } = req.query;

    const startedDate = new Date(start_date);
    const endDate = new Date(end_date);
    const filter = {};
    if (purchase_order) {
      filter.referensi = { [Op.iLike]: `%${purchase_order}%` };
    }
    if (supplier_name) {
      filter.merchant = { [Op.iLike]: `%${supplier_name}%` };
    }
    if (store_code) {
      filter.store_code = { [Op.any]: [store_code] };
    }
    if (business_unit) {
      filter.business_unit = { [Op.iLike]: `%${business_unit}%` };
    }
    if (status) {
      filter.status = { [Op.iLike]: `%${status}%` };
    }
    if (start_date && end_date) {
      filter.tanggal_diterima = { [Op.between]: [startedDate, endDate] };
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
      req.query.store_code == "ALL" ||
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
        const pfir = await pfirList.findAll({
          where: { supplier_code: supplier_code },
          limit: 100,
        });
        res.status(200).json({
          code: 0,
          result: {
            items: pfir,
          },
          message: "ok",
          type: "success",
        });
      }
    } else {
      const page = req.query.page || 1; // Current page number
      const limit = req.query.limit || 1000; // Number of records per page

      const PFIR = await pfirList.findAll({
        where: filter,
        limit,
      });
      res.status(200).json({
        code: 0,
        result: {
          items: PFIR,
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
    const PFIR = await pfir.findOne({
      where: filter,
      attributes: [
        "id",
        "receiving_advice",
        "date_updated",
        "revision",
        "status",
      ],
    });

    if (PFIR) {
      filter1.id = { [Op.eq]: `${PFIR.receiving_advice}` };

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
        attributes: ["id", "purchase_order"],
      });

      res.status(200).json({
        code: 0,
        result: { PFIR, RA },
        message: "ok",
        type: "success",
      });
    } else {
      res.status(200).json({
        code: 0,
        result: "Pro forma Invoice data not found",
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
async function viewbycdtdetail(req, res, next) {
  try {
    const { id } = req.body;
    const filter = {};

    if (id) {
      filter.url = { [Op.eq]: `${id}` };
    }

    const PFIR = await pfirDetail.findAll({
      where: filter,
    });

    res.status(200).json({
      code: 0,
      result: {
        items: PFIR,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

//CANCEL SEND PFIR
async function actionPfir(req, res) {
  const { action } = req.body;
  console.log(action);
  if (action === "CANCEL") {
    try {
      const { id } = req.body;
      const filter = {};
      const filter1 = {};
      const filter2 = {};
      if (id) {
        filter.id = { [Op.eq]: `${id}` };
      }
      const PFIR = await pfir.findOne({
        where: filter,
        attributes: ["receiving_advice"],
      });

      filter1.id = { [Op.eq]: `${PFIR.receiving_advice}` };

      const RA = await ra.findOne({
        where: filter1,
        attributes: ["purchase_order"],
      });

      const updatePfir = await pfir
        .update(
          {
            status: "CANCELLED",
          },
          {
            where: filter,
          }
        )
        .then((updatePfir) => {
          console.log(`${updatePfir} record(s) updated successfully.`);
        })
        .catch((error) => {
          console.error("Error updating records:", error);
        });

      const updatePfi = await pfi
        .update(
          {
            status: "AWAITING_ACTION",
          },
          {
            where: { receiving_advice: [PFIR.receiving_advice] },
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
          status: "PFI_CREATED",
        },
        {
          where: { id: [RA.purchase_order] },
        }
      )
        .then((updatePo) => {
          console.log(`${updatePo} record(s) updated successfully.`);
        })
        .catch((error) => {
          console.error("Error updating records:", error);
        });

      const PFI = await pfi.findAll({
        where: { receiving_advice: [PFIR.receiving_advice] },
        attributes: ["id"],
      });

      res.status(200).json({
        code: 0,
        result: PFI,
        message: "ok",
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  } else if (action === "SEND") {
    try {
      const { id } = req.body;
      const filter = {};
      const filter1 = {};
      if (id) {
        filter.id = { [Op.eq]: `${id}` };
      }
      const PFIR = await pfir.findOne({
        where: filter,
        attributes: ["receiving_advice"],
      });

      const updatePfir = await pfir
        .update(
          {
            status: "SENT",
          },
          {
            where: { id: id },
          }
        )
        .then((updatePfir) => {
          console.log(`${updatePfir} record(s) updated successfully.`);
        })
        .catch((error) => {
          console.error("Error updating records:", error);
        });

      const updatePfi = await pfi
        .update(
          {
            status: "LITIGATION",
          },
          {
            where: { receiving_advice: PFIR.receiving_advice },
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
          pfir_id: PFIR.id,
        },
        message: "ok",
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

//TERIMA TOLAK PFIR
async function actionAcceptReject(req, res) {
  const { action } = req.body;
  console.log(req.body);
  if (action === "ACCEPT") {
    const { id } = req.body;
    const { username } = req.body;
    try {
      const PFIR = await pfirInvCreated.findByPk(id);

      const creatInvoice = await i.create({
        created_by: username,
        created_on: new Date(),
        last_updated_by: username,
        last_updated_on: new Date(),
        currency_code: "IDR",
        due_date: new Date(),
        invoice_date: new Date(),
        invoice_id: PFIR.invoice_id,
        receive_code: PFIR.receive_code,
        total_gross_amount: PFIR.total_gross_amount,
        total_luxury_amount: PFIR.total_luxury_amount,
        total_net_amount: PFIR.total_net_amount,
        total_vat_amount: PFIR.total_vat_amount,
        // vendor_id: '',
        // voucher_id_in_source: '',
        mversion: 0,
        city: PFIR.city,
        company_address1: PFIR.company_address1,
        company_address2: PFIR.company_address2,
        company_name: PFIR.company_name,
        country: PFIR.country,
        date_updated: new Date(),
        dept_code: PFIR.dept_code,
        ima_processed: PFIR.ima_processed,
        name: PFIR.name,
        // peoplesoft_amount: '',
        postal_code: PFIR.postal_code,
        purchase_price_correction: PFIR.purchase_price_correction,
        revision: PFIR.revision,
        status: "DRAFT",
        store_code: PFIR.store_code,
        supplier_code: PFIR.supplier_code,
        supplier_grp_id: PFIR.supplier_grp_id,
        //tax_invoice_date: '',
        // tax_serial_number: '',
        vat_correction: PFIR.vat_correction,
        purchase_order: PFIR.purchase_order,
        business_unit: 2,
        //accepted_date: '',
        company_registration_number: PFIR.company_registration_number,
        fax: PFIR.fax,
        telephone_number: PFIR.telephone,
        email: PFIR.email,
        // accept_reject_by: '',
        //sent_date: '',
        //ima_sent_date: '',
        is_retracted: "N",
        etax_status: "WO_ETAX",
        flag_status: 0,
        //orig_tax_invoice_date: '',
        pfi_cdt: PFIR.pfi_cdt,
        pfi_rev: PFIR.pfi_rev,
        //scan2_receive_date: '',
        cdt: PFIR.cdt,
      });

      const inv = await pfirInvItemC.findAll({
        where: { pro_forma_invoice_response: id },
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
      if (PFIR) {
        const updatePfi = await pfi
          .update(
            {
              status: "PFIR_ACCEPTED",
            },
            {
              where: { receiving_advice: PFIR.receiving_advice },
            }
          )
          .then((updatePfi) => {
            console.log(`${updatePfi} record(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating records:", error);
          });

        const updatePfir = await pfir
          .update(
            {
              status: "ACCEPTED",
            },
            {
              where: { id: id },
            }
          )
          .then((updatePfir) => {
            console.log(`${updatePfir} record(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating records:", error);
          });

        const RA = await ra.findOne({
          where: { id: PFIR.receiving_advice },
        });

        const updatePo = await PO.update(
          {
            status: "INV_CREATED",
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
            invoice_id: creatInvoice.id,
          },
          message: "ok",
          type: "success",
        });
      } else {
        console.log("Error created rows: ", creatPfi);
      }
    } catch (error) {
      console.log(error);
    }
  } else if (action === "REJECT") {
    const { id } = req.body;
    const { username } = req.body;
    const { username2 } = req.body;
    const { total_amount } = req.body;
    const { price } = req.body;
    if (price === "UP") {
      try {
        const PFIR = await pfir.findByPk(id);
        console.log("masuk");
        if (PFIR) {
          n = PFIR.revision;
          const TEST = n * 1 + 1;
          console.log(TEST);
          const creatPfir = await pfir.create({
            created_by: username,
            created_on: new Date(),
            // last_updated_by: username,
            // last_updated_on: new Date,
            pro_forma_invoice_date: PFIR.pro_forma_invoice_date,
            receiver_code: PFIR.receive_code,
            revision: TEST,
            status: "FOR_APPROVAL",
            total_amount: total_amount,
            mversion: 0,
            date_updated: PFIR.date_updated,
            dept_code: PFIR.dept_code,
            litigation_file_processed: "",
            store_code: PFIR.store_code,
            supplier_code: PFIR.supplier_code,
            supplier_grp_id: 0, //TODO
            receiving_advice: PFIR.receiving_advice,
            sent_date: new Date(),
            approved_by: "System",
            first_approver: username, //TODO
            second_approver: username2, //TODO
          });

          const createPfirItem = await piri.findAll({
            where: { pro_forma_invoice_response: id },
            raw: true, // <--- HERE
          });

          const pfirItem = await piri.bulkCreate(
            createPfirItem.map((createPfirItem) => {
              return {
                created_by: username,
                created_on: new Date(),
                // last_updated_by: "system",
                // last_updated_on: new Date(),
                original_price: createPfirItem.reconciled,
                reconciled: createPfirItem.reconciled,
                //remarks: '',
                mversion: 0,
                is_accepted: "Y",
                pro_forma_invoice_response: creatPfir.id,
                receiving_advice_item: createPfirItem.receiving_advice_item,
              };
            })
          );
          if (creatPfir) {
            const updatepfir = await pfir
              .update(
                {
                  status: "REJECTED",
                  last_updated_oN: new Date(),
                  last_updated_by: username,
                },
                {
                  where: { id: id },
                }
              )
              .then((updatepfir) => {
                console.log(`${updatepfir} record(s) updated successfully.`);
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
          console.log("ID not found: ", PFIR);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const PFIR = await pfir.findByPk(id);
        console.log(PFIR);
        if (PFIR) {
          console.log(PFIR);
          n = PFIR.revision;
          const TEST = n * 1 + 1;
          console.log(TEST);
          const creatPfir = await pfir.create({
            created_by: username,
            created_on: new Date(),
            // last_updated_by: username,
            // last_updated_on: new Date,
            pro_forma_invoice_date: PFIR.pro_forma_invoice_date,
            receiver_code: PFIR.receive_code,
            revision: TEST,
            status: "DRAFT",
            total_amount: total_amount,
            mversion: 0,
            date_updated: PFIR.date_updated,
            dept_code: PFIR.dept_code,
            litigation_file_processed: "",
            store_code: PFIR.store_code,
            supplier_code: PFIR.supplier_code,
            supplier_grp_id: 0, //TODO
            receiving_advice: PFIR.receiving_advice,
            sent_date: new Date(),
            approved_by: "System",
            first_approver: username, //TODO
            //second_approver: username //TODO
          });

          const createPfirItem = await piri.findAll({
            where: { pro_forma_invoice_response: id },
            raw: true, // <--- HERE
          });

          const pfirItem = await piri.bulkCreate(
            createPfirItem.map((createPfirItem) => {
              return {
                created_by: username,
                created_on: new Date(),
                // last_updated_by: "system",
                // last_updated_on: new Date(),
                original_price: createPfirItem.reconciled,
                reconciled: createPfirItem.reconciled,
                //remarks: '',
                mversion: 0,
                is_accepted: "Y",
                pro_forma_invoice_response: creatPfir.id,
                receiving_advice_item: createPfirItem.receiving_advice_item,
              };
            })
          );
          if (creatPfir) {
            const updatepfir = await pfir
              .update(
                {
                  status: "REJECTED",
                  last_updated_oN: new Date(),
                  last_updated_by: username,
                },
                {
                  where: { id: id },
                }
              )
              .then((updatepfir) => {
                console.log(`${updatepfir} record(s) updated successfully.`);
              })
              .catch((error) => {
                console.error("Error updating records:", error);
              });

            // const updatePfi =await pfi.update({
            // 	status:'REJECTED'},{
            // 	where: {receiving_advice: PFIR.receiving_advice}}
            // 	).then((updatePfi ) => {
            // 		console.log(`${updatePfi} record(s) updated successfully.`);
            // 	  })
            // 	  .catch((error) => {
            // 		console.error('Error updating records:', error);
            // 	});

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
          console.log("ID not found: ", PFIR);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

//SAVE PFIR
async function actionSave(req, res) {
  try {
    const { RECONCILED } = req.body;
    const { REMARKS } = req.body;
    const { RAIID } = req.body;
    const { USERNAME } = req.body;

    const pfirItem = await piri.findOne({
      where: { id: RAIID },
    });
    console.log(pfirItem);
    n = pfirItem.mversion;
    const TEST = n * 1 + 1;
    console.log(TEST);

    const updatePfir = await piri
      .update(
        {
          last_updated_by: USERNAME,
          last_updated_on: new Date(),
          is_accepted: "N",
          reconciled: RECONCILED,
          remarks: REMARKS,
          mversion: TEST,
        },
        { where: { id: RAIID } }
      )
      .then((updatePfir) => {
        console.log(`${updatePfir} record(s) updated successfully.`);
      })
      .catch((error) => {
        console.error("Error updating records:", error);
      });

    res.status(200).json({
      code: 0,
      result: updatePfir,
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateUrl(req, res, next) {
  try {
    const {id}= req.body;
    const {url}= req.body;

    const PFIR = await pfir.update({
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
  getPfirAll,
  viewbycdtinfo,
  viewbycdtdetail,
  actionPfir,
  actionAcceptReject,
  actionSave,
  updateUrl
};
