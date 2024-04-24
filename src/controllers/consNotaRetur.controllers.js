const { https } = require("https");
const { Op } = require("sequelize");
const consNotaReturList = require("../models/consNotaReturList.models");
const consNotaReturDownload = require("../models/consNotaReturDownload.models");

//list data filter
async function getConsNotaReturList(req, res, next) {
  try {
    const { status } = req.query;
    const { supplier_code } = req.query;
    const { start_date } = req.query;
    const { end_date } = req.query;
    const { business_unit_code } = req.query;
    const { nomor_pfi } = req.query;
    const startedDate = new Date(start_date);
    const endDate = new Date(end_date);
    const { search } = req.query;
    // const { isactive } = req.query;

    const filter = {};
    if (status) {
      filter.status = { [Op.iLike]: `%${status}%` };
    }
    if (supplier_code) {
      filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
    }
    if (start_date && end_date) {
      filter.pfi_date = { [Op.between]: [startedDate, endDate] };
    }
    if (business_unit_code) {
      filter.business_unit_code = { [Op.iLike]: `%${business_unit_code}%` };
    }
    if (nomor_pfi) {
      filter.nomor_pfi = { [Op.iLike]: `%${nomor_pfi}%` };
    }
    if (search) {
      filter.search = { [Op.iLike]: `%${search}%` };
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
      req.query.business_unit_code == "ALL" ||
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
        const NR = await consNotaReturList.findAll({
          where: { supplier_code: supplier_code },
          limit: 1000,
        });
        res.status(200).json({
          code: 0,
          result: {
            items: NR,
          },
          message: "ok",
          type: "success",
        });
      }
    } else {
      const NR = await consNotaReturList.findAll({
        where: filter,
        // order:  [[field,order]],
        limit,
      });
      res.status(200).json({
        code: 0,
        result: {
          items: NR,
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

async function getConsNotaReturDownload(req, res, next) {
  try {
    const { id } = req.query;

    const filter = {};
    if (id) {
      filter.id = { [Op.eq]: id };
    }

    const page = req.query.page || 1; // Current page number
    const limit = req.query.limit || 1000; // Number of records per page
    const { field } = req.query;
    const { order } = req.query;

    const NRD = await consNotaReturDownload.findAll({
      where: filter,
      // order:  [[field,order]],
      limit,
    });

    const updateConsNotaRetur = await consNotaReturDownload
      .update(
        {
          status: "DOWNLOADED",
          download_date: new Date(),
        },
        {
          where: { id: id },
        }
      )
      .then((updateConsNotaRetur) => {
        console.log(`${updateConsNotaRetur} record(s) updated successfully.`);
      })
      .catch((error) => {
        console.error("Error updating records:", error);
      });

    res.status(200).json({
      code: 0,
      result: {
        items: NRD,
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

    const CNR = await consNotaReturDownload.update({
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
  getConsNotaReturList,
  getConsNotaReturDownload,
  updateUrl
};
