const { query } = require("express");
const { Op } = require("sequelize");
const consSalesAnaylysisList = require("../models/consSalesAnalysisList.models");

//list data filter
async function getConsSalesAnaysisList(req, res, next) {
  try {
    const { site } = req.query;
    const { item } = req.query;
    const { supplier } = req.query;
    const { department } = req.query;
    const { start_date } = req.query;
    const { end_date } = req.query;
    const { supplier_code } = req.query;
    const { isactive } = req.query;
    const startedDate = new Date(start_date);
    const endDate = new Date(end_date);

    const filter = {};
    if (site) {
      filter.site = { [Op.iLike]: `%${site}%` };
    }
    if (item) {
      filter.item_name = { [Op.iLike]: `%${item}%` };
    }
    if (supplier) {
      filter.supplier = { [Op.iLike]: `%${supplier}%` };
    }
    if (department) {
      filter.department = { [Op.iLike]: `%${department}%` };
    }
    if (start_date && end_date) {
      filter.sales_date = { [Op.between]: [startedDate, endDate] };
    }
    if (supplier_code) {
      filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
    }
    if (isactive) {
      filter.isactive = "Y";
    }

    const page = req.query.page || 1; // Current page number
    const limit = req.query.limit || 1000; // Number of records per page
    const { field } = req.query;
    const { order } = req.query;

    const SA = await consSalesAnaylysisList.findAll({
      where: filter,
      limit,
    });
    res.status(200).json({
      code: 0,
      result: {
        items: SA,
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
  getConsSalesAnaysisList,
};
