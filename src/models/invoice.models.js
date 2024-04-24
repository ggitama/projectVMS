
const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db.js');
const PO = require('./po.models.js');

class i extends Model {}
i.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		created_by: {
			type: DataTypes.STRING
		},
		created_on: {
			type: DataTypes.DATE
		},
		last_updated_by: {
			type: DataTypes.STRING
		},
		last_updated_on: {
			type: DataTypes.DATE
		},
		currency_code: {
			type: DataTypes.STRING
		},
		due_date: {
			type: DataTypes.DATE
		},
		extraction_date: {
			type: DataTypes.DATE
		},
		invoice_date: {
			type: DataTypes.DATE
		},
		invoice_id: {
			type: DataTypes.STRING
		},
		nature_code: {
			type: DataTypes.STRING
		},
		receive_date: {
			type: DataTypes.DATE
		},
		ship_to: {
			type: DataTypes.STRING
		},
		total_gross_amount: {
			type: DataTypes.INTEGER
		},
		total_luxury_amount: {
			type: DataTypes.INTEGER
		},
		total_net_amount: {
			type: DataTypes.INTEGER
		},
		total_vat_amount: {
			type: DataTypes.INTEGER
		},
		vendor_id: {
			type: DataTypes.STRING
		},
		voucher_id_in_source: {
			type: DataTypes.STRING
		},
		mversion: {
			type: DataTypes.INTEGER
		},
		city: {
			type: DataTypes.STRING
		},
		company_address1: {
			type: DataTypes.STRING
		},
		company_address2: {
			type: DataTypes.STRING
		},
		company_name: {
			type: DataTypes.STRING
		},
		country: {
			type: DataTypes.STRING
		},
		date_updated: {
			type: DataTypes.DATE
		},
		dept_code: {
			type: DataTypes.STRING
		},
		ima_processed: {
			type: DataTypes.STRING
		},
		name: {
			type: DataTypes.STRING
		},
		peoplesoft_amount: {
			type: DataTypes.INTEGER
		},
		postal_code: {
			type: DataTypes.STRING
		},
		purchase_price_correction: {
			type: DataTypes.INTEGER
		},
		revision: {
			type: DataTypes.INTEGER
		},
		status: {
			type: DataTypes.STRING
		},
		store_code: {
			type: DataTypes.STRING
		},
		supplier_code: {
			type: DataTypes.STRING
		},
		supplier_grp_id: {
			type: DataTypes.INTEGER
		},
		tax_invoice_date: {
			type: DataTypes.DATE
		},
		tax_serial_number: {
			type: DataTypes.STRING
		},
		vat_correction: {
			type: DataTypes.INTEGER
		},
		purchase_order: {
			type: DataTypes.STRING
		},
		business_unit: {
			type: DataTypes.INTEGER
		},
		accepted_date: {
			type: DataTypes.DATE
		},
		company_registration_number: {
			type: DataTypes.STRING
		},
		fax: {
			type: DataTypes.STRING
		},
		telephone_number: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING
		},
		accept_reject_by: {
			type: DataTypes.STRING
		},
		sent_date: {
			type: DataTypes.DATE
		},
		ima_sent_date: {
			type: DataTypes.DATE
		},
		is_retracted: {
			type: DataTypes.STRING
		},
		etax_status: {
			type: DataTypes.STRING
		},
		flag_status: {
			type: DataTypes.INTEGER
		},
		orig_tax_invoice_date: {
			type: DataTypes.DATE
		},
		pfi_cdt: {
			type: DataTypes.STRING
		},
		pfi_rev: {
			type: DataTypes.INTEGER
		},
		scan2_receive_date: {
			type: DataTypes.DATE
		},
		cdt: {
			type: DataTypes.STRING
		},
		url: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'invoice',
		tableName: 'invoice',
		schema: 'vms'
	},
);

PO.hasMany(PO, { foreignKey: 'id' });
i.belongsTo(PO, { as:'po', foreignKey: 'purchase_order' });

module.exports = i;
