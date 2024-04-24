const { query } = require("express");
const PO = require("../models/po.models");
const poi = require("../models/poItem.models");
const rar = require("../models/receivingAdviceResponse.models");
const store = require("../models/store.models");
const supplier = require("../models/supplier.models");
const { Op } = require("sequelize");
const rai = require("../models/receivingAdviceItem.models");
const sequelize = require("../models/db");
const ra = require("../models/receivingAdvice.models");
const rarList = require("../models/rarList.models");
const pfi = require("../models/proformaInvoice.models");
const { count } = require("console");
const rarDetail = require("../models/rarDetail.models");
const rri = require("../models/rri.models");
const pfiic = require("../models/PFIItem.models");
const pfii = require("../models/proformaInvoiceItem.models");
const raiItemCreated = require("../models/raiItemCreated.models");

async function getRarAll(req, res, next) {
  try {
    const { supplier_name } = req.query;
    const { store } = req.query;
    const { business_unit_code } = req.query;
    const { status } = req.query;
    const { start_date } = req.query;
    const { end_date } = req.query;
    const startedDate = new Date(start_date);
    const endDate = new Date(end_date);
    const { receiving_advice_number } = req.query;
    const { purchase_order } = req.query;
    const { supplier_code } = req.query;
    // const { isactive } = req.query;

    const filter = {};
    if (supplier_name) {
      filter.supplier_name = { [Op.iLike]: `%${supplier_name}%` };
    }
    if (store) {
      filter.store_code = { [Op.any]: [store] };
    }
    if (business_unit_code) {
      filter.business_unit_code = { [Op.iLike]: `%${business_unit_code}%` };
    }
    if (status) {
      filter.status = { [Op.iLike]: `%${status}%` };
    }
    if (receiving_advice_number) {
      filter.receiving_advice_number = {
        [Op.iLike]: `%${receiving_advice_number}%`,
      };
    }
    if (start_date && end_date) {
      filter.receiving_advice_date = { [Op.between]: [startedDate, endDate] };
    }
    if (purchase_order) {
      filter.purchase_order = { [Op.iLike]: `%${purchase_order}%` };
    }
    if (supplier_code) {
      filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
    }
    // if (isactive) {
    //   filter.isactive = "Y";
    // }

    const page = req.query.page || 1; // Current page number
    const limit = req.query.pageSize || 10; // Number of records per page
    const { field } = req.query;
    const { order } = req.query;
    if (
      req.query.status == "ALL" ||
      req.query.business_unit_code == "ALL" ||
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
        const rar = await rarList.findAll({
          where: { supplier_code: supplier_code },
          limit: 100,
        });
        res.status(200).json({
          code: 0,
          result: {
            items: rar,
          },
          message: "ok",
          type: "success",
        });
      }
    } else {
      const page = req.query.page || 1;
      const limit = req.query.pageSize || 1000;

      if (field && order) {
        const RAR = await rarList.findAll({
          where: filter,
        });
        res.status(200).json({
          code: 0,
          result: {
            items: RAR,
          },
          message: "ok",
          type: "success",
        });
      } else {
        const RAR = await rarList.findAll({
          where: filter,
        });
        res.status(200).json({
          code: 0,
          result: {
            items: RAR,
          },
          message: "ok",
          type: "success",
        });
      }
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
    if (id) {
      filter.url = { [Op.eq]: `${id}` };
    }

    const RAR = await rar.findAll({
      where: filter,
      include: [
        {
          model: PO,
          as: "po",
          attributes: [
            "id",
            "po_no",
            "order_date",
            "dept_code",
            "store_code",
            "delivery_to",
            "supplier_name",
            "supplier_code",
            "supplier_phone",
            "supplier_fax_number",
            "sales_start_date",
            "sales_end_date",
          ],
        },
      ],
      attributes: [
        "id",
        "receiving_advice_number",
        "receiving_advice_date",
        "status",
        "revision_number",
      ],
    });

    res.status(200).json({
      code: 0,
      result: {
        items: RAR,
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
    const { id } = req.body;
    const filter = {};
    if (id) {
      filter.url = { [Op.eq]: `${id}` };
    }

    const RAR = await rarDetail.findAll({
      where: filter,
    });

    res.status(200).json({
      code: 0,
      result: {
        items: RAR,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

//TERIMA TOLAK RAR
async function actionAcceptReject(req, res) {
  const { action } = req.body;
  console.log(req.body);
  if (action === "ACCEPT") {
    const { id } = req.body;
    const { editor_name } = req.body;
    try {
      const RAR = await rar.findOne({
        where: { id: id },
      });
      console.log(RAR);
      if (RAR) {
        const RA = await ra.findOne({
          where: { purchase_order: [RAR.purchase_order] },
        });
        console.log(RA.purchase_order);
        const creatPfi = await pfi.create({
          created_by: editor_name,
          created_on: new Date(),
          last_updated_by: editor_name,
          last_updated_on: new Date(),
          pro_forma_invoice_date: new Date(),
          receiver_code: RA.receiver_code,
          revision: 0,
          status: "AWAITING_ACTION",
          total_amount: RA.total_amount,
          mversion: RA.mversion,
          dept_code: RA.dept_code,
          store_code: RA.store_code,
          supplier_code: RA.supplier_code,
          receiving_advice: RA.id,
        });

        const raiItem = await pfiic.findAll({
          where: { receiving_advice: RA.id },
          raw: true, // <--- HERE
        });

        console.log(raiItem);

        const pfiItem = await pfii.bulkCreate(
          raiItem.map((raiItem) => {
            return {
              created_by: "system",
              created_on: new Date(),
              // last_updated_by: '',
              // last_updated_on: '',
              // original_price: '',
              reconciled: raiItem.unit_price,
              remarks: "",
              mversion: 0,
              is_accepted: "Y",
              pro_forma_invoice: creatPfi.id,
              receiving_advice_item: raiItem.rai_id,
            };
          })
        );
        if (creatPfi) {
          const updateRaR = await rar
            .update(
              {
                status: "ACCEPTED",
              },
              {
                where: { id: id },
              }
            )
            .then((updateRaR) => {
              console.log(`${updateRaR} record(s) updated successfully.`);
            })
            .catch((error) => {
              console.error("Error updating records:", error);
            });

          const updateRa = await ra
            .update(
              {
                status: "ACCEPTED",
              },
              {
                where: { id: RA.id },
              }
            )
            .then((updateRa) => {
              console.log(`${updateRa} record(s) updated successfully.`);
            })
            .catch((error) => {
              console.error("Error updating records:", error);
            });

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
              pfi_id: creatPfi.id,
            },
            message: "ok",
            type: "success",
          });
        } else {
          console.log("Error created rows: ", creatPfi);
        }
      } else {
        console.log("ID not found: ", RAR);
      }
    } catch (error) {
      console.log(error);
    }
  } else if (action === "REJECT") {
    const { id } = req.body;
    const { username } = req.body;
    try {
      const RAR = await rar.findByPk(id);
      if (RAR) {
        n = RAR.revision_number;
        const TEST = n * 1 + 1;
        console.log(TEST);

        const creatRar = await rar.create({
          created_by: username,
          created_on: new Date(),
          last_updated_by: username,
          last_updated_on: new Date(),
          mversion: 0,
          date_updated: new Date(),
          dept_code: RAR.dept_code,
          litigation_file_processed: "N",
          receiver_code: RAR.receiver_code,
          receiving_advice_date: new Date(),
          receiving_advice_number: RAR.receiving_advice_number,
          revision_number: TEST,
          status: "DRAFT",
          store_code: RAR.store_code,
          supplier_code: RAR.supplier_code,
          purchase_order: RAR.purchase_order,
        });

        const createRarItem = await rri.findAll({
          where: { receiving_advice_response: id },
          raw: true, // <--- HERE
        });

        const rarItem = await rri.bulkCreate(
          createRarItem.map((createRarItem) => {
            return {
              created_by: username,
              created_on: new Date(),
              // last_updated_by: "system",
              // last_updated_on: new Date(),
              mversion: 1,
              is_accepted: "N",
              line_no: createRarItem.line_no,
              original_qty: createRarItem.received_qty,
              received_qty: createRarItem.received_qty,
              // remarks: '',
              purchase_order_item: createRarItem.purchase_order_item,
              receiving_advice_response: creatRar.id,
              litigated: "Y",
            };
          })
        );

        const updateRar = await rar
          .update(
            {
              status: "REJECTED",
            },
            {
              where: { id: id },
            }
          )
          .then((updateRar) => {
            console.log(`${updateRar} record(s) updated successfully.`);
          })
          .catch((error) => {
            console.error("Error updating records:", error);
          });

        res.status(200).json({
          code: 0,
          result: {
            rar_id: creatRar.id,
          },
          message: "ok",
          type: "success",
        });
      } else {
        console.log("Error created rows: ", RAR);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

//view info button diterima
async function actionRar(req, res) {
  const { action } = req.body;
  //console.log(req.body);
  if (action === "CANCEL") {
    try {
      const { id } = req.body;
      const RAR = await rar.findByPk(id);

      const updateRar = await rar
        .update(
          {
            status: "CANCELLED",
            mversion: 1,
          },
          {
            where: { id: id },
          }
        )
        .then((updateRar) => {
          console.log(`${updateRar} record(s) updated successfully.`);
        })
        .catch((error) => {
          console.error("Error updating records:", error);
        });

      if (RAR) {
        const RA = await ra.findOne({
          where: { purchase_order: RAR.purchase_order },
        });
        if (RA) {
          const updateRa = await ra
            .update(
              {
                status: "AWAITING_ACTION",
              },
              {
                where: { id: [RA.id] },
              }
            )
            .then((updateRa) => {
              console.log(`${updateRa} record(s) updated successfully.`);
            })
            .catch((error) => {
              console.error("Error updating records:", error);
            });

          res.status(200).json({
            code: 0,
            result: {
              ra_id: RA.id,
            },
            message: "ok",
            type: "success",
          });
        }
        console.log(RA);
      } else {
        console.log("ID not found: ", a);
      }
    } catch (error) {
      console.log(error);
    }
  } else if (action === "SEND") {
    //console.log(action);
    try {
      const { id } = req.body;
      const RAR = await rar.findByPk(id);

      // n=RAR.revision_number;
      // const TEST= ((n * 1)+1);
      // console.log(TEST);

      const updateRar = await rar
        .update(
          {
            status: "SENT",
          },
          {
            where: { id: id },
          }
        )
        .then((updateRar) => {
          console.log(`${updateRar} record(s) updated successfully.`);
        })
        .catch((error) => {
          console.error("Error updating records:", error);
        });

      res.status(200).json({
        code: 0,
        result: {
          ra_id: id,
        },
        message: "ok",
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

async function actionSave(req, res) {
  try {
    // const { IS_REVISED } = req.body;
    const { RECEIVED_QTY } = req.body;
    const { REMARKS } = req.body;
    const { ID } = req.body;

    const updateRri = await rri
      .update(
        {
          received_qty: RECEIVED_QTY,
          remarks: REMARKS,
          is_accepted: "N",
          is_revised: "Y",
        },
        {
          where: { id: ID },
        }
      )
      .then((updateRri) => {
        console.log(`${updateRri} record(s) updated successfully.`);
      })
      .catch((error) => {
        console.error("Error updating records:", error);
      });

    res.status(200).json({
      code: 0,
      result: updateRri,
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

    const RAR = await rar.update({
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
  getRarAll,
  viewbycdtinfo,
  viewbycdtdetail,
  actionAcceptReject,
  actionRar,
  actionSave,
  updateUrl
};
