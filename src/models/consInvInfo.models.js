const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const consInvInfo = sequelize.define('consInvInfo',
	{
	i_id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},	
	cdt: {
		type: DataTypes.STRING
	},
	pfi_number: {
		type: DataTypes.STRING
	},
	tanggal_pfi: {
		type: DataTypes.DATE
	},
    toko: {
		type: DataTypes.STRING
	},
    department: {
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
    sales_start_date: {
		type: DataTypes.DATE
	},
    sales_end_date: {
		type: DataTypes.DATE
	},
    cons_margin_rate: {
		type: DataTypes.INTEGER
	},
    cons_margin_value: {
		type: DataTypes.INTEGER
	},
    code: {
		type: DataTypes.STRING
	},
    nama_perusahaan_supp: {
		type: DataTypes.STRING
	},
    alamat_perusahaan_supp: {
		type: DataTypes.STRING
	},
	npwp_sup: {
		type: DataTypes.STRING
	},
    kode_pos: {
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
    telepon: {
		type: DataTypes.STRING
	},
    fax: {
		type: DataTypes.STRING
	},
    email: {
		type: DataTypes.STRING
	},
	nomor_seri_pajak: {
		type: DataTypes.STRING
	},
	confirm_seri_pajak: {
		type: DataTypes.STRING
	},
	tgl_faktur_pajak: {
		type: DataTypes.DATE
	},
	no_inv_supplier: {
		type: DataTypes.INTEGER
	},
	tgl_inv_supplier: {
		type: DataTypes.DATE
	},
	revisi: {
		type: DataTypes.INTEGER
	},
	status: {
		type: DataTypes.STRING
	},
	sc_id: {
		type: DataTypes.STRING
	},
	supp_id: {
		type: DataTypes.STRING
	},
	url: {
		type: DataTypes.STRING
	}
  }, {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_CONS_INV_INFO2',
	schema: 'vms',
	timestamps: false
  });

module.exports = consInvInfo;
