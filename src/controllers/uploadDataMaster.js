const fs = require("fs");
var XLSX = require('xlsx');
const cm_user = require("../models/cm_user.models");
const cm_user_item = require("../models/cm_user_item.models");
const cm_agreement = require("../models/cm_agreement.models");
const cm_coverage = require("../models/cm_coverage.models");
const cm_contract = require("../models/cm_contract.models");
const cct = require("../models/cct.models");

const uploadFilesUser = async (req, res) => {
  try {
    var workbook = XLSX.readFile('template_mycm_user.xlsx');
    console.log(req.file.namafile);
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    console.log(xlData);
    
    cm_user.bulkCreate(
      xlData.map((xlData) => {
        return {
      departement: xlData.department,
      division: xlData.division,
      name: xlData.firstname,
      name_pic: xlData.pic,
      position: xlData.position,
      role_code: xlData.role,
      username: xlData.username
    };
  })
    ).then((u) => {
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload xlsx: ${error}`);
  }
};


const uploadFilesUserItem = async (req, res) => {
  try {
    var workbook = XLSX.readFile('template_mycm_user_item.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    console.log(xlData);
    
    cm_user_item.bulkCreate(
      xlData.map((xlData) => {
        return {
      family_filter_code: xlData.item_code,
      username: xlData.username
    };
  })
    ).then((u) => {
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload xlsx: ${error}`);
  }
};

const uploadFilesAgreement = async (req, res) => {
  try {
    var workbook = XLSX.readFile('template_mycm_agreement_type.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    console.log(xlData);
    
    cm_agreement.bulkCreate(
      xlData.map((xlData) => {
        return {
      agreement_name: xlData.agreement_name,
      agreement_type: xlData.agreement_type
    };
  })
    ).then((u) => {
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload xlsx: ${error}`);
  }
};

const uploadFilesCoverage = async (req, res) => {
  try {
    var workbook = XLSX.readFile('template_mycm_coverage.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    console.log(xlData);
    
    cm_coverage.bulkCreate(
      xlData.map((xlData) => {
        return {
          coverage_city: xlData.city,
          coverage_island: xlData.island,
          coverage_province: xlData.province,
          coverage_site: xlData.site
    };
  })
    ).then((u) => {
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload xlsx: ${error}`);
  }
};

const uploadFilesContract = async (req, res) => {
  try {
    var workbook = XLSX.readFile('template_mycm_contract.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    console.log(xlData);
    
    cm_contract.bulkCreate(
      xlData.map((xlData) => {
        return {
          contract_code: xlData.contract_code,
          contract_name: xlData.contract_name,
          // contract_type: xlData.contract_type,
          departement: xlData.department,
          holding_supplier_code: xlData.supplier_code,
          // holding_supplier_email1: xlData.supplier_email_1,
          // holding_supplier_email2: xlData.supplier_email_2,
          // holding_supplier_email3: xlData.supplier_email_3,
          // holding_supplier_phone_numeric: xlData.supplier_phone,
          // holding_supplier_pic: xlData.supplier_pic,
          // holding_supplier_position: xlData.supplier_position
    };
  })
    ).then((u) => {
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload xlsx: ${error}`);
  }
};

async function getUserList(req, res, next) {
	try {
			const U = await cm_user.findAll({
				attributes:['departement' ,'division', 'name', 'name_pic', 'position', 'role_code', 'username'],
        order:  [['id', 'DESC']]
			});
			res.status(200).json({
				code: 0,
				result: {
					items: U
				},
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

async function getUserItemList(req, res, next) {
	try {
			const U = await cm_user_item.findAll({
				attributes:['family_filter_code' ,'username'],
        order:  [['id', 'DESC']]
			});
			res.status(200).json({
				code: 0,
				result: {
					items: U
				},
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

async function getUserItemList(req, res, next) {
	try {
			const U = await cm_user_item.findAll({
				attributes:['family_filter_code' ,'username'],
        order:  [['id', 'DESC']]
			});
			res.status(200).json({
				code: 0,
				result: {
					items: U
				},
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

async function getAgreementTypeList(req, res, next) {
	try {
			const U = await cm_agreement.findAll({
				attributes:['agreement_type' ,'agreement_name'],
        order:  [['id', 'DESC']]
			});
			res.status(200).json({
				code: 0,
				result: {
					items: U
				},
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

async function getCoverageList(req, res, next) {
	try {
			const U = await cm_coverage.findAll({
				attributes:['coverage_city' ,'coverage_island', 'coverage_province', 'coverage_site'],
        order:  [['id', 'DESC']]
			});
			res.status(200).json({
				code: 0,
				result: {
					items: U
				},
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

async function getContractList(req, res, next) {
	try {
			const U = await cm_contract.findAll({
				attributes:['contract_code' ,'contract_name', 'contract_type', 'departement', 'holding_supplier_code', 'holding_supplier_email1', 'holding_supplier_email2', 'holding_supplier_email3', 'holding_supplier_phone_numeric', 'holding_supplier_pic', 'holding_supplier_position'],
        order:  [['id', 'DESC']]
			});
			res.status(200).json({
				code: 0,
				result: {
					items: U
				},
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}



module.exports = {
  uploadFilesUser,
  uploadFilesUserItem,
  uploadFilesAgreement,
  uploadFilesCoverage,
  uploadFilesContract,
  getUserList,
  getUserItemList,
  getAgreementTypeList,
  getCoverageList,
  getContractList
};