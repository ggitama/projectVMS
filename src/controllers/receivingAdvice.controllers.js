const { Op, where } = require("sequelize");
const sequelize = require("../models/db");
const PO = require("../models/po.models");
const poi = require("../models/poItem.models");
const pfi = require("../models/proformaInvoice.models");
const pfii = require("../models/proformaInvoiceItem.models");
const ra = require("../models/receivingAdvice.models");
const rai = require("../models/receivingAdviceItem.models");
const rar = require("../models/receivingAdviceResponse.models");
const raList = require("../models/raList.models");
const pfiic = require("../models/PFIItem.models");
const raiItemCreated = require("../models/raiItemCreated.models");
const rri = require("../models/rri.models");

async function getRaAll(req, res, next) {
  try {
    const { purchase_order } = req.query;
    const { supplier_name } = req.query;
    const { store_code } = req.query;
    const { business_unit_name } = req.query;
    const { status } = req.query;
    const { start_date } = req.query;
    const { end_date } = req.query;
    const { supplier_code } = req.query;
    // const { isactive } = req.query;
    const startedDate = new Date(start_date);
    const endDate = new Date(end_date);
    const filter = {};
    if (supplier_name) {
      filter.merchant = { [Op.iLike]: `%${supplier_name}%` };
    }
    if (purchase_order) {
      filter.purchase_order = { [Op.iLike]: `%${purchase_order}%` };
    }
    if (store_code) {
      filter.store_code = { [Op.any]: [store_code] };
    }
    if (business_unit_name) {
      filter.business_unit = { [Op.iLike]: `%${business_unit_name}%` };
    }
    if (status) {
      filter.status = { [Op.iLike]: `%${status}%` };
    }
    if (start_date && end_date) {
      filter.receiving_advice_date = { [Op.between]: [startedDate, endDate] };
    }
    if (supplier_code) {
      filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
    }

    const page = req.query.page || 1; // Current page number
    const limit = req.query.limit || 1000; // Number of records per page
    const { field } = req.query;
    const { order } = req.query;
    if (
      req.query.status == "ALL" ||
      req.query.business_unit_name == "ALL" ||
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
        const RA = await raList.findAll({
          where: { supplier_code: supplier_code },
          limit: 100,
        });

        res.status(200).json({
          code: 0,
          result: {
            items: RA,
          },
          message: "ok",
          type: "success",
        });
      }
    } else {
      const page = req.query.page || 1;
      const limit = req.query.limit || 1000;

      if (field && order) {
        const RA = await raList.findAll({
          where: filter,
          limit,
          order: [[field, order]],
        });
        //console.log(filter2);
        res.status(200).json({
          code: 0,
          result: {
            items: RA,
          },
          message: "ok",
          type: "success",
        });
      } else {
        const RA = await raList.findAll({
          where: filter,
          limit,
        });
        res.status(200).json({
          code: 0,
          result: {
            items: RA,
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

    const RA = await ra.findAll({
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
          ],
        },
      ],
      attributes: [
        "id",
        "receiving_advice_number",
        "receiving_advice_date",
        "status",
      ],
    });

    const update = await ra
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
      result: {
        items: RA,
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
    const filter2 = {};
    if (id) {
      filter.url = { [Op.eq]: `${id}` };
    }

    const RA = await ra.findOne({
      where: filter,
      attributes: ["purchase_order"],
    });

    filter2.purchase_order = { [Op.iLike]: `${RA.purchase_order}` };

    const POI = await poi.findAll({
      where: filter2,
      include: [
        {
          model: rai,
          as: "raipoi",
          attributes: ["received_qty"],
          required: false,
        },
      ],
      attributes: [
        "line_no",
        "item_code",
        "sub_code",
        "unit_code",
        "capacity",
        "barcode",
        "item_name",
        "sub_code_name",
        "free_qty_insku",
        "order_qty_insku",
      ],
      order: ["line_no"],
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

//view info button diterima
async function actionRa(req, res) {
  const { action } = req.body;
  //console.log(req.body);
  if (action === "ACCEPT") {
    try {
      const { id } = req.body;
      const { editor_name } = req.body;
      const { email } = req.body;
      const a = await ra.findByPk(id);
      if (a) {
        const creatPfi = await pfi.create({
          created_by: editor_name,
          created_on: new Date(),
          last_updated_by: editor_name,
          last_updated_on: new Date(),
          pro_forma_invoice_date: new Date(),
          receiver_code: a.receiver_code,
          revision: 0,
          status: "NEW",
          total_amount: a.total_amount,
          mversion: a.mversion,
          dept_code: a.dept_code,
          store_code: a.store_code,
          supplier_code: a.supplier_code,
          receiving_advice: a.id,
        });

        const raiItem = await pfiic.findAll({
          where: { receiving_advice: a.id },
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
          const updateRa = await ra
            .update(
              {
                status: "ACCEPTED",
              },
              {
                where: { id: id },
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
              where: { id: a.purchase_order },
            }
          )
            .then((updatePo) => {
              console.log(`${updatePo} record(s) updated successfully.`);
            })
            .catch((error) => {
              console.error("Error updating records:", error);
            });

          // sendingMail({
          // 		from: "gitamolyayu152@gmail.com",
          // 		to: `${email}`,
          // 		subject: "Account Verification Link",
          // 		text: `Hello, gita Please verify your email by
          // 			  clicking this link :`,
          // 	  });
          // console.log(email);

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
        console.log("ID not found: ", a);
      }
    } catch (error) {
      console.log(error);
    }
  } else if (action === "REJECT") {
    const { id } = req.body;
    const { username } = req.body;
    try {
      const a = await ra.findByPk(id);
      if (a) {
        const creatRar = await rar.create({
          created_by: username,
          created_on: new Date(),
          last_updated_by: username,
          last_updated_on: new Date(),
          mversion: 0,
          date_updated: new Date(),
          dept_code: a.dept_code,
          litigation_file_processed: "N",
          receiver_code: a.receiver_code,
          receiving_advice_date: new Date(),
          receiving_advice_number: a.receiving_advice_number,
          revision_number: 1,
          status: "DRAFT",
          store_code: a.store_code,
          supplier_code: a.supplier_code,
          purchase_order: a.purchase_order,
        });

        const createRarItem = await raiItemCreated.findAll({
          where: { receiving_advice: id },
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
              purchase_order_item: createRarItem.id,
              receiving_advice_response: creatRar.id,
              litigated: "Y",
            };
          })
        );
        if (creatRar) {
          const updateRa = await ra
            .update(
              {
                status: "REJECTED",
              },
              {
                where: { id: id },
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
              status: "RA_LITIGATION",
            },
            {
              where: { id: a.purchase_order },
            }
          )
            .then((updatePo) => {
              console.log(`${updatePo} record(s) updated successfully.`);
            })
            .catch((error) => {
              console.error("Error updating records:", error);
            });

          console.log(a.purchase_order);
          res.status(200).json({
            code: 0,
            result: {
              rar_id: creatRar.id,
            },
            message: "ok",
            type: "success",
          });
        } else {
          console.log("Error created rows: ", creatPfi);
        }
      } else {
        console.log("ID not found: ", a);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function updateUrl(req, res, next) {
  try {
    const {id}= req.body;
    const {url}= req.body;

    const RA = await ra.update({
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
  getRaAll,
  viewbycdtinfo,
  viewbycdtdetail,
  actionRa,
  updateUrl
};
