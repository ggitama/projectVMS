const { Op } = require("sequelize");
const PO = require("../models/po.models");
const poi = require("../models/poItem.models");
const revisionPoExp = require("../models/revisionPoExp.models");
const revisionPO = require("../models/revisionPo.models");
const poiu = require("../models/poiu.models");
const poiSupp = require("../models/poiSupp.models");

async function getPoAll(req, res, next) {
  try {
    const { id } = req.query;
    const { supplier_name_local } = req.query;
    const { supplier_code } = req.query;
    const { store_code } = req.query;
    const { business_unit_code } = req.query;
    const { status } = req.query;
    const { isactive } = req.query;
    const { start_date } = req.query;
    const { end_date } = req.query;
    const startedDate = new Date(start_date);
    const endDate = new Date(end_date);
    const filter = {};
    if (id) {
      filter.id = { [Op.iLike]: `%${id}%` };
    }
    if (supplier_name_local) {
      filter.supplier_name_local = { [Op.iLike]: `%${supplier_name_local}%` };
    }
    if (supplier_code) {
      filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
    }
    if (store_code) {
      filter.store_code = { [Op.any]: [store_code] };
    }
    if (business_unit_code) {
      filter.business_unit_code = { [Op.iLike]: `%${business_unit_code}%` };
    }
    if (status) {
      filter.status = { [Op.iLike]: `%${status}%` };
    }
    if (start_date && end_date) {
      filter.order_date = { [Op.between]: [startedDate, endDate] };
    }
    if (isactive) {
      filter.isactive = "Y";
    }

    const page = req.query.page || 1; // Current page number
    const limit = req.query.limit || 1000; // Number of records per page
    const { field } = req.query;
    const { order } = req.query;
    console.log(req.query);
    const value = req.query.store_code;
    if (
      req.query.status == "ALL" ||
      req.query.business_unit_code == "ALL" ||
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
        const po = await PO.findAll({
          where: { supplier_code: supplier_code, isactive },
          attributes: [
            "id",
            "supplier_name",
            "po_no",
            "order_date",
            "status",
            "date_updated",
            "store_code",
            "delivery_to",
            "total_amount",
            "isactive",
          ],
          limit: 100,
        });
        res.status(200).json({
          code: 0,
          result: {
            items: po,
          },
          message: "ok",
          type: "success",
        });
      }
    } else {
      const page = req.query.page || 1;
      const limit = req.query.limit || 1000;

      const po = await PO.findAll({
        where: filter,
        attributes: [
          "id",
          "supplier_name",
          "po_no",
          "order_date",
          "status",
          "date_updated",
          "store_code",
          "delivery_to",
          "total_amount",
          "isactive",
        ],
        limit,
      });
      res.status(200).json({
        code: 0,
        result: {
          items: po,
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
    if (id) {
      filter.url = { [Op.iLike]: `%${id}%` };
    }

    const po = await PO.findAll({
      where: filter,
      attributes: [
        "id",
        "po_no",
        "sender_code",
        "dept_code",
        "department_name",
        "delivery_to",
        "order_date",
        "date_updated",
        "expected_delivery_date",
        "business_unit_name",
        "business_unit_registration",
        "business_unit_address",
        "business_unit_name",
        "supplier_name",
        "supplier_code",
        "supplier_phone",
        "supplier_fax_number",
        "total_amount",
        "status",
        "isactive",
      ],
    });

    const update = await PO.update(
      {
        status: "CONFIRMED",
      },
      {
        where: { id: id, status: "NEW" },
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
        items: po,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

// //view detail
// async function viewbycdtdetail(req, res, next) {
//   try {
//     const { purchase_order } = req.query;
//     const filter = {};
//     if (purchase_order) {
//       filter.purchase_order = { [Op.iLike]: `%${purchase_order}%` };
//     }

//     const po = await poi.findAll({
//       where: filter,
//       attributes: [
//         "line_no",
//         "item_code",
//         "sub_code",
//         "unit_code",
//         "capacity",
//         "barcode",
//         "item_name",
//         "sub_code_name",
//         "order_qty_in_pack",
//         "purchase_price_type",
//         "free_qty_insku",
//         "qty_per_pack",
//         "unit_price",
//       ],
//       order: ["line_no"],
//     });
//     res.status(200).json({
//       code: 0,
//       result: {
//         items: po,
//       },
//       message: "ok",
//       type: "success",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Invalid" });
//   }
// }

//view detail
async function viewbycdtdetail(req, res, next) {
  try {
    const { purchase_order } = req.query;
    const filter = {};
    if (purchase_order) {
      filter.url = { [Op.iLike]: `%${purchase_order}%` };
    }

    const po = await poiu.findAll({
      where: filter,
      order: ["line_no"],
    });
    res.status(200).json({
      code: 0,
      result: {
        items: po,
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
async function revisionPo(req, res, next) {
  try {
    const { purchase_order } = req.query;
    const filter = {};
    if (purchase_order) {
      filter.id = { [Op.iLike]: `%${purchase_order}%` };
    }

    const po = await PO.findOne({
      where: filter,
    });

    const status = po.status;
    console.log(status);
    if (status == "EXPIRED") {
      const poexp = await revisionPO.findAll({
        where: filter,
      });

      res.status(200).json({
        code: 0,
        result: {
          items: poexp,
        },
        message: "ok",
        type: "success",
      });
    } else {
      const po = await revisionPoExp.findAll({
        where: filter,
      });

      res.status(200).json({
        code: 0,
        result: {
          items: po,
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

async function updateUrl(req, res, next) {
  try {
    const {id}= req.body;
    const {url}= req.body;

    const po = await PO.update({
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

async function poSupplier(req, res, next) {
  try {
    const { supplier_code } = req.query;
    const filter = {};
    if (supplier_code) {
      filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
    }
      filter.isactive = "Y";

    const po = await PO.findAll({
      where: filter,
      attributes: [
        "id",
        "supplier_code",
        "supplier_name",
        "store_code",
        "po_no",
        "sender_code",
        "dept_code",
        "department_name",
        "delivery_to",
        "order_date",
        "date_updated",
        "expected_delivery_date",
        "business_unit_name",
        "business_unit_registration",
        "business_unit_address",
        "business_unit_name",
        "supplier_name",
        "supplier_code",
        "supplier_phone",
        "supplier_fax_number",
        "total_amount",
        "status",
        "isactive",
      ],
      raw: true
    });

    res.status(200).json({
      code: 0,
      result: po,
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

async function poItemSupplier(req, res, next) {
  try {
    const { supplier_code } = req.query;
    const filter = {};
    if (supplier_code) {
      filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
    }

    const poi = await poiSupp.findAll({
      where: filter
    });

    res.status(200).json({
      code: 0,
      result: poi,
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

module.exports = {
  getPoAll,
  viewbycdtinfo,
  viewbycdtdetail,
  revisionPo,
  updateUrl,
  poSupplier,
  poItemSupplier,
  // generateAccessToken
};
