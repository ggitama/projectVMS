const { query } = require("express");
const { Op } = require("sequelize");
const consLitigasiDetail = require("../models/consLitigasiDetail.models");
const consLitigasiInfo = require("../models/consLitigasiInfo.models");
const consLitigasiList = require("../models/consLitigasiList.models");
const saLit = require("../models/saLit.models");
const sli = require("../models/sli.models");

//list data filter
async function getConsLitigasiList(req, res, next) {
  try {
    const { toko } = req.query;
    const { department } = req.query;
    const { start_date } = req.query;
    const { end_date } = req.query;
    const { status } = req.query;
    const { submitted_date } = req.query;
    const { lit_no } = req.query;
    const { supplier_code } = req.query;
    // const { isactive } = req.query;
    const startedDate = new Date(start_date);
    const endDate = new Date(end_date);

    const filter = {};
    if (toko) {
      filter.store = { [Op.iLike]: `%${toko}%` };
    }
    if (department) {
      filter.department = { [Op.iLike]: `%${department}%` };
    }
    if (start_date && end_date) {
      filter.sales_date = { [Op.between]: [startedDate, endDate] };
    }
    if (status) {
      filter.status = { [Op.iLike]: `%${status}%` };
    }
    if (submitted_date) {
      filter.submit_date = { [Op.iLike]: `%${submitted_date}%` };
    }
    if (lit_no) {
      filter.id = { [Op.iLike]: `%${lit_no}%` };
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
    if (req.query.status == "ALL" || Object.keys(filter).length === 0) {
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
        const APL = await consLitigasiList.findAll({
          where: { supplier_code: supplier_code },
          limit: 100,
        });
        res.status(200).json({
          code: 0,
          result: {
            items: APL,
          },
          message: "ok",
          type: "success",
        });
      }
    } else {
      const APL = await consLitigasiList.findAll({
        where: filter,
        // order:  [[field,order]],
        limit,
      });
      res.status(200).json({
        code: 0,
        result: {
          items: APL,
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
      filter.url = { [Op.iLike]: `${cdt}` };
    }

    const page = req.query.page || 1; // Current page number
    const limit = req.query.limit || 1000; // Number of records per page
    const { field } = req.query;
    const { order } = req.query;

    const APL = await consLitigasiInfo.findAll({
      where: filter,
      limit,
    });
    res.status(200).json({
      code: 0,
      result: {
        items: APL,
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

    const APL = await consLitigasiDetail.findAll({
      where: filter,
      limit,
    });
    res.status(200).json({
      code: 0,
      result: {
        items: APL,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

//SAVE PFIR
async function actionClosed(req, res) {
  try {
    const { ID } = req.body;

    const updateLit = await saLit
      .update(
        {
          status: "CLOSED",
        },
        {
          where: { id: ID },
        }
      )
      .then((updateLit) => {
        console.log(`${updateLit} record(s) updated successfully.`);
      })
      .catch((error) => {
        console.error("Error updating records:", error);
      });

    res.status(200).json({
      code: 0,
      result: updateLit,
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  }
}

//SAVE PFIR
async function actionUpdateSLI(req, res) {
  try {
    const { ID } = req.body;
    const { MARGIN } = req.body;
    const { MARGIN_REMARKS } = req.body;
    const { SELLING } = req.body;
    const { SELLING_REMARKS } = req.body;
    const { QTY } = req.body;
    const { QTY_REMARKS } = req.body;

    const updateSLI = await sli
      .update(
        {
          margin: MARGIN,
          margin_remarks: MARGIN_REMARKS,
          selling_price: SELLING,
          selling_price_remarks: SELLING_REMARKS,
          qty: QTY,
          qty_remarks: QTY_REMARKS,
        },
        {
          where: { id: ID },
        }
      )
      .then((updateSLI) => {
        console.log(`${updateSLI} record(s) updated successfully.`);
      })
      .catch((error) => {
        console.error("Error updating records:", error);
      });

    res.status(200).json({
      code: 0,
      result: updateSLI,
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

    const SL = await saLit.update({
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
  getConsLitigasiList,
  viewbycdtinfo,
  viewbycdtdetail,
  actionClosed,
  actionUpdateSLI,
  updateUrl
};
