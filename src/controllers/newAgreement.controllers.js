const { Op, DATE, NOW } = require("sequelize");
const calculatePa = require("../models/calculatePa.models");
const cm_coverage = require("../models/cm_coverage.models");
const cm_agreement = require("../models/cm_agreement.models");
const findScc = require("../models/findScc.models");
const findPP = require("../models/findPP.models");
const date = require("date-and-time");
const cai = require("../models/cm_agreement_item.models");
var XLSX = require("xlsx");
const caiu = require("../models/cm_agreement_item_upload.models");
const sequelize = require("../models/db");
const cm_category = require("../models/cm_category.models");
const cm_user = require("../models/cm_user.models");
const cci = require("../models/cci.models");
const ccp = require("../models/ccp.models");
const ccc = require("../models/ccc.models");
const ccs = require("../models/ccs.models");
const cct = require("../models/cct.models");

async function getCoverage(req, res, next) {
  try {
    const { island } = req.query;

    const I = await cm_coverage.findOne({
      where: { coverage_island: island },
    });

    res.status(200).json({
      code: 0,
      result: {
        items: I,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

async function getScc(req, res, next) {
  try {
    const { scc } = req.query;

    const SCC = await findScc.findAll({
      where: { contract_code: scc },
    });

    res.status(200).json({
      code: 0,
      result: {
        items: SCC,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

async function getPP(req, res, next) {
  try {
    const { pp } = req.query;

    const PP = await findPP.findAll({
      where: { agreement_code: pp },
    });

    const I = await cci.findAll({
      where: { agreement_code: pp },
      attributes: ['island']
    });

    const P = await ccp.findAll({
      where: { agreement_code: pp },
      attributes: ['province']
    });

    const C = await ccc.findAll({
      where: { agreement_code: pp },
      attributes: ['city']
    });

    const S = await ccs.findAll({
      where: { agreement_code: pp },
      attributes: ['site']
    });

    res.status(200).json({
      code: 0,
      result: [PP, I, P, C, S],
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

// button save
async function createNewAgreementSave(req, res, next) {
  try {
    const { department } = req.body;
    const { category } = req.body;
    const { supplier_code } = req.body;
    const { agreementType } = req.body;
    const { agreement_item_code } = req.body;
    const { periodStart } = new Date(req.body.date);
    const { periodEnd } = new Date(req.body.date);
    const { sccId } = req.body;
    const { division } = req.body;
    const { feeAmount } = req.body;
    const { note } = req.body;
    const { onBudget } = req.body;
    const { negotiatorName } = req.body;
    const { position } = req.body;
    const { email1 } = req.body;
    const { email2 } = req.body;
    const { email3 } = req.body;
    const { supplierPhoneNumber } = req.body;
    const { supplierName } = req.body;
    const { supplierTaxId } = req.body;
    const { supplierTaxName } = req.body;
    const { supplierPosition } = req.body;
    const { tg } = req.body;
    const { fdt } = req.body;
    const { sdt } = req.body;
    const { cst } = req.body;
    const { cct } = req.body;
    const { faxNumber } = req.body;
    const { phoneNumber } = req.body;
    const island = req.body;
    const province = req.body;
    const city = req.body;
    const site = req.body;

    // const values = req.body;
			console.log(island);
      console.log(province);
      console.log(city);
      console.log(site);
    const day = date.format(new Date(), "YYMMDD");
    // console.log(day);

    // Dapatkan data agreement_code model cm_agreement
    const resultAgreement = await cm_agreement.findOne({
      attributes: [
        [
          sequelize.fn("RIGHT", sequelize.col("agreement_code"), 4
          ),
          "max_last_three_digits",
        ],
      ],
      order: [['id', 'DESC']]
    });

    // Dapatkan last id dari kolom agreement_code table cm_agreement
    const lastItemAgreementCode =
      resultAgreement.dataValues.max_last_three_digits;
    console.log(lastItemAgreementCode);
    const lastSeqAgreementCode = parseInt(lastItemAgreementCode.toString());

    // Hitung urutan agreement_item_code
    const autoCodeAgreement =
      lastSeqAgreementCode === 0 ? 1 : lastSeqAgreementCode + 1;
    // tambahkan jadi number 3 digit no urut
    const idauto = autoCodeAgreement.toString().padStart(4, "0");

    console.log(req.body.values);
    
    const TRI = await cm_agreement.create({
      agreement_code:
        "G" +
        department +
        category +
        supplier_code +
        "09" +
        "TRI" +
        day +
        idauto,
      agreement_end_date: new Date(),
      agreement_item_code: agreement_item_code,
      agreement_start_date: new Date(),
      agreement_type: agreementType,
      business_unit_code: "TRI",
      contract_code: sccId,
      created_date: new Date(),
      departement: department,
      division: division,
      fee_amount: feeAmount,
      holding_supplier_code: supplier_code,
      note: note,
      obot_type: onBudget,
      pic: negotiatorName,
      position: position,
      status: "DRAFT",
      supplier_email1: email1,
      supplier_email2: email2,
      supplier_email3: email3,
      supplier_phone_numeric: supplierPhoneNumber,
      supplier_pic: supplierName,
      supplier_position: supplierPosition,
      supplier_tax_id: supplierTaxId,
      supplier_tax_name: supplierTaxName,
      // updated_date: new Date(),
      category: category,
      // referential_agreement_code varchar(255) NULL,
      tg_tinggi: tg,
      floor_display_tinggi: fdt,
      standing_display_tinggi: sdt,
      clip_strip_tinggi: cst,
      chiller_cabinet_tinggi: cct,
      // last_generated timestamp NULL,
      // total_rafaksi numeric NULL DEFAULT 0,
      // final_value,
      fax_number: faxNumber,
      phone_number: phoneNumber
    });

    const ARI = await cm_agreement.create({
      agreement_code:
        "G" +
        department +
        category +
        supplier_code +
        "09" +
        "ARI" +
        day +
        idauto,
      agreement_end_date: new Date(),
      agreement_item_code: agreement_item_code,
      agreement_start_date: new Date(),
      agreement_type: agreementType,
      business_unit_code: "ARI",
      contract_code: sccId,
      created_date: new Date(),
      departement: department,
      division: division,
      fee_amount: feeAmount,
      holding_supplier_code: supplier_code,
      note: note,
      obot_type: onBudget,
      pic: negotiatorName,
      position: position,
      status: "DRAFT",
      supplier_email1: email1,
      supplier_email2: email2,
      supplier_email3: email3,
      supplier_phone_numeric: supplierPhoneNumber,
      supplier_pic: supplierName,
      supplier_position: supplierPosition,
      supplier_tax_id: supplierTaxId,
      supplier_tax_name: supplierTaxName,
      // updated_date: new Date(),
      category: category,
      // referential_agreement_code varchar(255) NULL,
      tg_tinggi: tg,
      floor_display_tinggi: fdt,
      standing_display_tinggi: sdt,
      clip_strip_tinggi: cst,
      chiller_cabinet_tinggi: cct,
      // last_generated timestamp NULL,
      // total_rafaksi numeric NULL DEFAULT 0,
      // final_value,
      fax_number: faxNumber,
      phone_number: phoneNumber
    });

    const ac = TRI.agreement_code;
    const aa = ARI.agreement_code;

    for (let a = 0; a < req.body.island.length; a++) {
      const is =req.body.island[a];
      console.log(is);
      if(req.body.island[a] != null){
        const IT = await cci.create({
          agreement_code: ac , 
          created_date: new Date(), 
          island: req.body.island[a]
          // updated_date
        });
        const IA = await cci.create({
          agreement_code: aa , 
          created_date: new Date(), 
          island: req.body.island[a]
          // updated_date
        });
      };
    }
    for (let b = 0; b < req.body.province.length; b++) {
        const is =req.body.province[b];
        console.log(is);
        if(req.body.province[b] != null){
          const PT = await ccp.create({
            agreement_code: ac , 
            created_date: new Date(), 
            province: req.body.province[b]
            // updated_date
          });
          const PA = await ccp.create({
            agreement_code: aa , 
            created_date: new Date(), 
            province: req.body.province[b]
            // updated_date
          });
        };
      }
     
      for (let c = 0; c < req.body.city.length; c++) {
        const is =req.body.city[c];
        console.log(is);
        if(req.body.city[c] != null){
          const CT = await ccc.create({
            agreement_code: ac , 
            created_date: new Date(), 
            city: req.body.city[c]
            // updated_date
          });
          const CA = await ccc.create({
            agreement_code: aa , 
            created_date: new Date(), 
            city: req.body.city[c]
            // updated_date
          });
        };
      }

      for (let d = 0; d < req.body.site.length; d++) {
          const is =req.body.site[d];
          console.log(is);
          if(req.body.site[d] != null){
            const ST = await ccs.create({
              agreement_code: ac , 
              created_date: new Date(), 
              site: req.body.site[d]
              // updated_date
            });
            const SA = await ccs.create({
              agreement_code: aa , 
              created_date: new Date(), 
              site: req.body.site[d]
              // updated_date
            });
        };
      }
      
    res.status(200).json({
      code: 0,
      result: {
        items: TRI,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

// button send to suplier
async function createNewAgreementSendToSupp(req, res, next) {
  try {
    const { action } = req.body;
    const { department } = req.body;
    const { category } = req.body;
    const { supplier_code } = req.body;
    const { agreementType } = req.body;
    const { agreement_item_code } = req.body;
    const { periodStart } = new Date(req.body.date);
    const { periodEnd } = new Date(req.body.date);
    const { sccId } = req.body;
    const { division } = req.body;
    const { feeAmount } = req.body;
    const { note } = req.body;
    const { onBudget } = req.body;
    const { negotiatorName } = req.body;
    const { position } = req.body;
    const { email1 } = req.body;
    const { email2 } = req.body;
    const { email3 } = req.body;
    const { supplierPhoneNumber } = req.body;
    const { supplierName } = req.body;
    const { supplierTaxId } = req.body;
    const { supplierTaxName } = req.body;
    const { supplierPosition } = req.body;
    const { tg } = req.body;
    const { fdt } = req.body;
    const { sdt } = req.body;
    const { cst } = req.body;
    const { cct } = req.body;
    const { faxNumber } = req.body;
    const { phoneNumber } = req.body;
    const island = req.body;
    const province = req.body;
    const city = req.body;
    const site = req.body;
    const { ppnumber } = req.body;

    if(action === "NEW"){
      const day = date.format(new Date(), "YYYYMMDD");
      console.log(day);
  
      // Dapatkan data agreement_code model cm_agreement
      const resultAgreement = await cm_agreement.findOne({
        attributes: [
          [
            sequelize.fn(
              "MAX",
              sequelize.fn("RIGHT", sequelize.col("agreement_code"), 3)
            ),
            "max_last_three_digits",
          ],
        ],
      });
  
      // Dapatkan last id dari kolom agreement_code table cm_agreement
      const lastItemAgreementCode =
        resultAgreement.dataValues.max_last_three_digits;
  
      const lastSeqAgreementCode = parseInt(lastItemAgreementCode.toString());
  
      // Hitung urutan agreement_item_code
      const autoCodeAgreement =
        lastSeqAgreementCode === 0 ? 1 : lastSeqAgreementCode + 1;
      // tambahkan 0 setelah M 3 jadi number 3 digit
      const idauto = autoCodeAgreement.toString().padStart(3, "0");
  
      const TRI = await cm_agreement.create({
        agreement_code:
          "G" +
          dept +
          category +
          supplier_code +
          "09" +
          "TRI" +
          day +
          idauto,
        agreement_end_date: new Date(),
        agreement_item_code: agreement_item_code,
        agreement_start_date: new Date(),
        agreement_type: agreementType,
        business_unit_code: "TRI",
        contract_code: sccId,
        created_date: new Date(),
        departement: department,
        division: division,
        fee_amount: feeAmount,
        holding_supplier_code: supplier_code,
        note: note,
        obot_type: onBudget,
        pic: negotiatorName,
        position: position,
        status: "OPEN",
        supplier_email1: email1,
        supplier_email2: email2,
        supplier_email3: email3,
        supplier_phone_numeric: supplierPhoneNumber,
        supplier_pic: supplierName,
        supplier_position: supplierPosition,
        supplier_tax_id: supplierTaxId,
        supplier_tax_name: supplierTaxName,
        // updated_date: new Date(),
        category: category,
        // referential_agreement_code varchar(255) NULL,
        tg_tinggi: tg,
        floor_display_tinggi: fdt,
        standing_display_tinggi: sdt,
        clip_strip_tinggi: cst,
        chiller_cabinet_tinggi: cct,
        // last_generated timestamp NULL,
        // total_rafaksi numeric NULL DEFAULT 0,
        // final_value,
        fax_number: faxNumber,
        phone_number: phoneNumber
      });
  
      const ARI = await cm_agreement.create({
        agreement_code:
          "G" +
          department +
          category +
          supplier_code +
          "09" +
          "ARI" +
          day +
          idauto,
        agreement_end_date: new Date(),
        agreement_item_code: agreement_item_code,
        agreement_start_date: new Date(),
        agreement_type: agreementType,
        business_unit_code: "ARI",
        contract_code: sccId,
        created_date: new Date(),
        departement: department,
        division: division,
        fee_amount: feeAmount,
        holding_supplier_code: supplier_code,
        note: note,
        obot_type: onBudget,
        pic: negotiatorName,
        position: position,
        status: "OPEN",
        supplier_email1: email1,
        supplier_email2: email2,
        supplier_email3: email3,
        supplier_phone_numeric: supplierPhoneNumber,
        supplier_pic: supplierName,
        supplier_position: supplierPosition,
        supplier_tax_id: supplierTaxId,
        supplier_tax_name: supplierTaxName,
        // updated_date: new Date(),
        category: category,
        // referential_agreement_code varchar(255) NULL,
        tg_tinggi: tg,
        floor_display_tinggi: fdt,
        standing_display_tinggi: sdt,
        clip_strip_tinggi: cst,
        chiller_cabinet_tinggi: cct,
        // last_generated timestamp NULL,
        // total_rafaksi numeric NULL DEFAULT 0,
        // final_value,
        fax_number: faxNumber,
        phone_number: phoneNumber
      });
  
      const ac = TRI.agreement_code;
      const aa = ARI.agreement_code;
  
        for (let a = 0; a < req.body.island.length; a++) {
          const is =req.body.island[a];
          console.log(is);
          if(req.body.island[a] != null){
            const IT = await cci.create({
              agreement_code: ac , 
              created_date: new Date(), 
              island: req.body.island[a]
              // updated_date
            });
            const IA = await cci.create({
              agreement_code: aa , 
              created_date: new Date(), 
              island: req.body.island[a]
              // updated_date
            });
          };
        }

        for (let b = 0; b < req.body.province.length; b++) {
            const is =req.body.province[b];
            console.log(is);
            if(req.body.province[b] != null){
              const PT = await ccp.create({
                agreement_code: ac , 
                created_date: new Date(), 
                province: req.body.province[b]
                // updated_date
              });
              const PA = await ccp.create({
                agreement_code: aa , 
                created_date: new Date(), 
                province: req.body.province[b]
                // updated_date
              });
            };
        }
       
        for (let c = 0; c < req.body.city.length; c++) {
          const is =req.body.city[c];
          console.log(is);
          if(req.body.city[c] != null){
            const CT = await ccc.create({
              agreement_code: ac , 
              created_date: new Date(), 
              city: req.body.city[c]
              // updated_date
            });
            const CA = await ccc.create({
              agreement_code: aa , 
              created_date: new Date(), 
              city: req.body.city[c]
              // updated_date
            });
          };
        }
  
        for (let d = 0; d < req.body.site.length; d++) {
            const is =req.body.site[d];
            console.log(is);
            if(req.body.site[d] != null){
              const ST = await ccs.create({
                agreement_code: ac , 
                created_date: new Date(), 
                site: req.body.site[d]
                // updated_date
              });
              const SA = await ccs.create({
                agreement_code: aa , 
                created_date: new Date(), 
                site: req.body.site[d]
                // updated_date
              });
          };
        }
      
        res.status(200).json({
          code: 0,
          result: {
            items: TRI.agreement_code,
          },
          message: "ok",
          type: "success",
        });
    }else if (action === "UPDATE"){
        const TRI = await cm_agreement.update({
            agreement_end_date: new Date(),
            agreement_item_code: agreement_item_code,
            agreement_start_date: new Date(),
            agreement_type: agreementType,
            // business_unit_code: "TRI",
            // contract_code: sccId,
            created_date: new Date(),
            departement: department,
            division: division,
            fee_amount: feeAmount,
            // holding_supplier_code: supplier_code,
            note: note,
            obot_type: onBudget,
            // pic: negotiatorName,
            // position: position,
            status: "OPEN",
            // supplier_email1: email1,
            // supplier_email2: email2,
            // supplier_email3: email3,
            // supplier_phone_numeric: supplierPhoneNumber,
            // supplier_pic: supplierName,
            // supplier_position: supplierPosition,
            supplier_tax_id: supplierTaxId,
            supplier_tax_name: supplierTaxName,
            // updated_date: new Date(),
            category: category,
            // referential_agreement_code varchar(255) NULL,
            tg_tinggi: tg,
            floor_display_tinggi: fdt,
            standing_display_tinggi: sdt,
            clip_strip_tinggi: cst,
            chiller_cabinet_tinggi: cct,
            // last_generated timestamp NULL,
            // total_rafaksi numeric NULL DEFAULT 0,
            // final_value,
            fax_number: faxNumber,
            phone_number: phoneNumber
          },{where: {agreement_code: ppnumber}
        });
        console.log(req.body);
  
        for (let a = 0; a < req.body.island.length; a++) {
          const CCI = await cci.destroy({
            where: { agreement_code: ppnumber },
          });

          if(req.body.island[a] != null){
            const IT = await cci.create({
              agreement_code: ppnumber , 
              created_date: new Date(), 
              island: req.body.island[a]
              // updated_date
            });
          };
        }

        for (let b = 0; b < req.body.province.length; b++) {
            const CCP = await ccp.destroy({
              where: { agreement_code: ppnumber },
            });
            if(req.body.province[b] != null){
              const PT = await ccp.create({
                agreement_code: ppnumber , 
                created_date: new Date(), 
                province: req.body.province[b]
                // updated_date
              });
            };
        }
       
        for (let c = 0; c < req.body.city.length; c++) {
          const CCC = await ccc.destroy({
            where: { agreement_code: ppnumber },
          });

          if(req.body.city[c] != null){
            const CT = await ccc.create({
              agreement_code: ppnumber , 
              created_date: new Date(), 
              city: req.body.city[c]
              // updated_date
            });
          };
        }
  
        for (let d = 0; d < req.body.site.length; d++) {
          const CCS = await ccs.destroy({
            where: { agreement_code: ppnumber },
          });
            if(req.body.site[d] != null){
              const ST = await ccs.create({
                agreement_code: ppnumber , 
                created_date: new Date(), 
                site: req.body.site[d]
                // updated_date
              });
          };
        }
        res.status(200).json({
          code: 0,
          result: {
            items: ppnumber,
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

async function actionNASupplier(req, res, next) {
  const { action } = req.body;
  //console.log(req.body);
  if (action === "ACCEPT") {
    try {
      const { id } = req.body;

      const NAS = await cm_agreement.update(
        {
          status: "APPROVED",
        },
        { where: { id: id } }
      );

      res.status(200).json({
        code: 0,
        result: {
          items: NAS,
        },
        message: "ok",
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  } else if (action === "REJECT") {
    try {
      const { id } = req.body;

      const NAS = await cm_agreement.update(
        {
          status: "SUPPLIER_REJECTED",
        },
        { where: { id: id } }
      );

      res.status(200).json({
        code: 0,
        result: {
          items: NAS,
        },
        message: "ok",
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

async function actionNABuyer(req, res, next) {
  const { action } = req.body;
  //console.log(req.body);
  if (action === "ACCEPT") {
    try {
      const { id } = req.body;

      const NAS = await cm_agreement.update(
        {
          status: "CONFIRM",
        },
        { where: { id: id } }
      );

      res.status(200).json({
        code: 0,
        result: {
          items: NAS,
        },
        message: "ok",
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  } else if (action === "REJECT") {
    try {
      const { id } = req.body;

      const NAS = await cm_agreement.update(
        {
          status: "BUYER_REJECTED",
        },
        { where: { id: id } }
      );

      res.status(200).json({
        code: 0,
        result: {
          items: NAS,
        },
        message: "ok",
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

const uploadFilesAgreementItem = async (req, res) => {
  try {
    var workbook = XLSX.readFile("test1.xlsx");
    console.log(req.file.namafile);
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    // Dapatkan data dari model caiu
    const resultCaiu = await caiu.findOne({
      attributes: [
        [
          sequelize.fn("max", sequelize.col("agreement_item_code")),
          "max_agreement_item_code",
        ],
      ],
    });

    // Dapatkan last id dari model caiu
    const lastItemCodeCaiu =
      resultCaiu.dataValues.max_agreement_item_code || "M000";
    const lastSeqCaiu = parseInt(lastItemCodeCaiu.toString().substring(2));

    // Hitung urutan agreement_item_code
    const autoIdCaiu = lastItemCodeCaiu === 0 ? 1 : lastSeqCaiu + 1;
    // tambahkan 0 setelah M 3 jadi number 3 digit
    const idautonya = autoIdCaiu.toString().padStart(3, "0");

    // Get the number of rows
    const numRows = xlData.length;
    console.log(`Number of rows in the Excel file: ${numRows}`);

    // Insert data ke model caiu
    const createdItemsCaiu = await caiu.bulkCreate(
      xlData.map((xlData, index) => {
        return {
          item_code: xlData.Item,
          item_name: xlData.Item_name,
          promotion_type: xlData.promotion_type,
          discount_type: xlData.discount_type,
          discount_value: xlData.discount_value,
          discount_percent: xlData.discount_percent,
          promo_quantity: xlData.promo_qty,
          normal_quantity: xlData.normal_qty,
          max_quantity: xlData.max_qty,
          retur_item: xlData.retur_item,
          remark: xlData.remark,
          created_date: new Date(),
          agreement_item_code: "CM" + idautonya,
        };
      })
    );

    // Dapatkan data yang baru diinsert dari model caiu
    const insertedDataCaiu = createdItemsCaiu.map((item) =>
      item.get({ plain: true })
    );

    // Insert data ke model cai
    const createdItemsCai = await insertAgreementItemCai(insertedDataCaiu);

    // Dapatkan data yang baru diinsert dari model cai
    const insertedDataCai = createdItemsCai.map((item) =>
      item.get({ plain: true })
    );

    res.status(200).json({
      code: 0,
      result: {
        itemsCaiu: insertedDataCaiu,
        itemsCai: insertedDataCai,
      },
      message: `File has been uploaded ${numRows} rows`,
      type: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 1,
      message: `Error when trying to upload xlsx: ${error}`,
      type: "error",
    });
  }
};

// insert data ke model cai dari data caiu
const insertAgreementItemCai = async (dataCaiu) => {
  try {
    // Insert data dari model caiu ke model cai
    const createdItemsCai = await cai.bulkCreate(
      dataCaiu.map((itemCaiu) => {
        return {
          item_code: itemCaiu.item_code,
          item_name: itemCaiu.item_name,
          promotion_type: itemCaiu.promotion_type,
          discount_type: itemCaiu.discount_type,
          discount_value: itemCaiu.discount_value,
          discount_percent: itemCaiu.discount_percent,
          promo_quantity: itemCaiu.promo_quantity,
          normal_quantity: itemCaiu.normal_quantity,
          max_quantity: itemCaiu.max_quantity,
          retur_item: itemCaiu.retur_item,
          remark: itemCaiu.remark,
          created_date: itemCaiu.created_date,
          agreement_item_code: itemCaiu.agreement_item_code,
        };
      })
    );
    return createdItemsCai;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//get all data model cai
async function getCai(req, res, next) {
  try {
    const { agreement_item_code } = req.query;
    const filter = {};

    if (agreement_item_code) {
      filter.agreement_item_code = { [Op.iLike]: `%${agreement_item_code}%` };
    }

    const dataCai = await cai.findAll({
      where: filter,
    });

    if (Object.keys(filter).length === 0) {
      return res.status(200).json({
        code: 0,
        result: {
          items: [],
        },
        message: "Tidak ada filter ditemukan",
        type: "success",
      });
    }

    res.status(200).json({
      code: 0,
      result: {
        items: dataCai,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

// get coverage island all
async function getCoverageIsland(req, res, next) {
  try {
    const dataIslandAll = await cm_coverage.findAll({
      attributes: ["coverage_island"],
      group: ["coverage_island"],
      order: ["coverage_island"],
    });

    res.status(200).json({
      code: 0,
      result: {
        items: dataIslandAll,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

// get coverage province
async function getCoverageProvince(req, res, next) {
  try {
    const provincesToSearch = req.query.island;

    const provinceFilter = await cm_coverage.findAll({
      where: {
        coverage_island: {
          [Op.in]: provincesToSearch,
        },
      },
      attributes: ["coverage_island", "coverage_province"],
      group: ["coverage_province", "coverage_island"],
      order: [["coverage_province"]],
    });

    res.status(200).json({
      code: 0,
      result: {
        items: provinceFilter,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

// get coverage cisty
async function getCoverageCity(req, res, next) {
  try {
    const cityToSearch = req.query.province;

    const cityFilter = await cm_coverage.findAll({
      where: {
        coverage_province: {
          [Op.in]: cityToSearch,
        },
      },  
      attributes: ["coverage_island", "coverage_province", "coverage_city"],
      group: ["coverage_province", "coverage_island", "coverage_city"],
      order: [["coverage_city"]],
    });

    res.status(200).json({
      code: 0,
      result: {
        items: cityFilter,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

// get coverage site
async function getCoverageSite(req, res, next) {
  try {
    const siteToSearch = req.query.city;

    const siteFilter = await cm_coverage.findAll({
      where: {
        coverage_city: {
          [Op.in]: siteToSearch,
        },
      },
      attributes: [
        "coverage_island",
        "coverage_province",
        "coverage_city",
        "coverage_site",
      ],
      group: [
        "coverage_province",
        "coverage_island",
        "coverage_city",
        "coverage_site",
      ],
      order: [["coverage_site"]],
    });

    res.status(200).json({
      code: 0,
      result: {
        items: siteFilter,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

//get all data model category
async function getCatDept(req, res, next) {
  try {
    
    const cc = await cm_category.findAll();

    res.status(200).json({
      code: 0,
      result: {
        items: cc,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

//get all data model category
async function getNegotiator(req, res, next) {
  try {
    const { name } = req.query;
		const filter = {};
		if (name) {
			filter.name = { [Op.iLike]: `%${name}%` };
		}
    const cu = await cm_user.findAll({
      where: filter
    });

    res.status(200).json({
      code: 0,
      result: {
        items: cu,
      },
      message: "ok",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}

async function getContractType(req, res, next) {
	try {
			const CCT = await cct.findAll({
			});
			res.status(200).json({
				code: 0,
				result: {
					items: CCT
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
  getCoverage,
  getScc,
  getPP,
  createNewAgreementSave,
  createNewAgreementSendToSupp,
  actionNASupplier,
  actionNABuyer,
  uploadFilesAgreementItem,
  getCai,
  getCoverageIsland,
  getCoverageProvince,
  getCoverageCity,
  getCoverageSite,
  getCatDept,
  getNegotiator,
  getContractType
};
