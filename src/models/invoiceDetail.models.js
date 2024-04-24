const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const ViewsInvoiceDetail = sequelize.define('invdetail',
	{
	// Define fields that match the columns in your view
	nomor_order: {
		type: DataTypes.STRING
	},
	tanggal_order: {
		type: DataTypes.STRING
	},
	departemen: {
		type: DataTypes.STRING
	},
    toko: {
		type: DataTypes.STRING
	},
    nama_perusahaan: {
		type: DataTypes.STRING
	},
    alamat_perusahaan: {
		type: DataTypes.STRING
	},
    npwp: {
		type: DataTypes.STRING
	},
    nama_supplier: {
		type: DataTypes.STRING
	},
    alamat_supplier: {
		type: DataTypes.STRING
	},
    kodepos: {
		type: DataTypes.STRING
	},
    kota: {
		type: DataTypes.STRING
	},
    negara: {
		type: DataTypes.STRING
	},
    nama: {
		type: DataTypes.STRING
	},
    telp_supplier: {
		type: DataTypes.STRING
	},
    npwp_supp: {
		type: DataTypes.STRING
	},
    nomor_seri_pajak: {
		type: DataTypes.STRING
	},
    confirm_seri_pajak: {
		type: DataTypes.STRING
	},
    tgl_faktur_pajak: {
		type: DataTypes.STRING
	},
    no_inv_supplier: {
		type: DataTypes.STRING
	},
    tgl_inv_supplier: {
		type: DataTypes.STRING
	},
    revisi: {
		type: DataTypes.STRING
	},
	status: {
		type: DataTypes.STRING
	},
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	kode_supplier: {
		type: DataTypes.STRING
	},
	fax_supplier: {
		type: DataTypes.STRING
	},
	npwp_supp: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.STRING
	},
	purchase_order: {
		type: DataTypes.STRING
	},
	flag_status: {
		type: DataTypes.STRING
	},
	receiving_advice_date: {
		type: DataTypes.DATE
	},
	url: {
		type: DataTypes.STRING
	}
  }, {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_INV_DETAIL2',
	schema: 'vms',
	timestamps: false
  });

module.exports = ViewsInvoiceDetail;
