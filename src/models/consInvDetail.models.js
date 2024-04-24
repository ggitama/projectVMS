const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const consInvDetail = sequelize.define('consInvDetail',
	{
	i_id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},	
	ii_id: {
		type: DataTypes.INTEGER
	},
	barcode: {
		type: DataTypes.STRING
	},
	nama_barang: {
		type: DataTypes.STRING
	},
    sales_qty: {
		type: DataTypes.INTEGER
	},
    cons_margin: {
		type: DataTypes.INTEGER
	},
    cons_payable: {
		type: DataTypes.INTEGER
	},
	support_promo_sup: {
		type: DataTypes.INTEGER
	},
    tot_cons_pay_before_tax: {
		type: DataTypes.INTEGER
	},
    pajak: {
		type: DataTypes.INTEGER
	},
    tot_cons_pay_after_tax: {
		type: DataTypes.INTEGER
	},
    sub_total: {
		type: DataTypes.INTEGER
	},
    koreksi_harga_beli: {
		type: DataTypes.INTEGER
	},
    koreksi_ppn: {
		type: DataTypes.INTEGER
	},
    ppn: {
		type: DataTypes.INTEGER
	},
    pajak_barang_mewah: {
		type: DataTypes.INTEGER
	},
    total_harga: {
		type: DataTypes.INTEGER
	},
		url: {
		type: DataTypes.STRING
	}
  }, {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_CONS_INV_DETAILL',
	schema: 'vms',
	timestamps: false
  });

module.exports = consInvDetail;
