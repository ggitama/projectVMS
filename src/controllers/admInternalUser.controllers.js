const { query } = require("express");
const { Op } = require("sequelize");
const intUserList = require("../models/adm.internalUser.models");
const accountUser = require("../models/accountUser.models");
const accountUserRole = require("../models/accountUserRole.models");
const person = require("../models/person.models");

//list data filter
async function getIntUserList(req, res, next) {
  try {
    const { id } = req.query;
    const { first_name } = req.query;
    const { last_name } = req.query;
    const { username } = req.query;
    const { role } = req.query;
    const { search } = req.query;

    const filter = {};
    if (first_name) {
      filter.first_name = { [Op.iLike]: `%${first_name}%` };
    }
    if (last_name) {
      filter.last_name = { [Op.iLike]: `%${last_name}%` };
    }
    if (username) {
      filter.username = { [Op.iLike]: `%${username}%` };
    } else if (id) {
      filter.id = { [Op.eq]: id };
    }
    if (role) {
      filter.role = { [Op.iLike]: `%${role}%` };
    }
    if (search) {
      filter.search = { [Op.iLike]: `%${search}%` };
    }

    console.log(filter);

    const page = req.query.page || 1; // Current page number
    const limit = req.query.limit || 1000; // Number of records per page
    const { field } = req.query;
    const { order } = req.query;

    const intUser = await intUserList.findAll({
      where: filter,
      // order:  [[field,order]],
      limit,
    });
    res.status(200).json({
      code: 0,
      result: {
        items: intUser,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}
async function getIntById(req, res, next) {
  try {
    const { id } = req.body;

		const filter = {};
    if (id) {
      filter.id = id;
    }

    const page = req.query.page || 1; // Current page number
    const limit = req.query.limit || 1000; // Number of records per page
    const { field } = req.query;
    const { order } = req.query;

    const intUser = await intUserList.findAll({
      where: filter,
      limit,
    });
    res.status(200).json({
      code: 0,
      result: {
        items: intUser,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}
async function actionCreate(req, res) {
  try {
    const { first_name, last_name, email, username, role } = req.body;

    const addAccountUser = await accountUser.create({
      email,
      username,
      enabled: "Y",
    });

    const accountUserId = addAccountUser.dataValues.id;

    role.forEach(async (role) => {
      await accountUserRole.create({
        user_id: accountUserId,
        role_id: role,
      });
    });

    await person.create({
      first_name,
      last_name,
      account_user: accountUserId,
    });

    const createdIntUser = await intUserList.findAll({
      where: {
        first_name,
        last_name,
        username,
      },
    });

    return res.status(200).json({
      code: 0,
      result: createdIntUser,
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: "Invalid",
    });
  }
}
async function actionUpdate(req, res) {
  try {
    const { first_name, last_name, email, username, role, enabled } = req.body;

    await accountUser.update(
      {
        email,
        enabled,
      },
      {
        where: {
          username,
        },
      }
    );

    let accountUserId = await accountUser.findAll({
      where: {
        username,
      },
    });

    accountUserId = accountUserId[0].dataValues.id;

    if (role && role.length > 0) {
      await accountUserRole.destroy({
        where: {
          user_id: accountUserId,
        },
      });

      role.forEach(async (role) => {
        await accountUserRole.create({
          user_id: accountUserId,
          role_id: role,
        });
      });
    }

    await person.update(
      {
        first_name,
        last_name,
      },
      {
        where: {
          account_user: accountUserId,
        },
      }
    );

    const updatedIntUser = await intUserList.findAll({
      where: {
        first_name,
        last_name,
        username,
      },
    });

    return res.status(200).json({
      code: 0,
      result: updatedIntUser,
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: "Invalid",
    });
  }
}

module.exports = {
  getIntUserList,
  actionCreate,
  actionUpdate,
	getIntById,
};
