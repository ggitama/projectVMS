const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');
const supplier = require('./supplier.models.js');


class sc extends Model {}
sc.init(
	{
		city: {
			type: DataTypes.STRING,
			
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
		name: {
			type: DataTypes.STRING
		},
		postal_code: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		person: {
			type: DataTypes.INTEGER
		},
		supplier: {
			type: DataTypes.INTEGER
		},
		fax: {
			type: DataTypes.STRING
		},
		telephone_number: {
			type: DataTypes.STRING
		},
		po_email_enabled: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'supplier_contact',
		tableName: 'supplier_contact',
		schema: 'vms'
	}
);

// supplier.hasMany(supplier, { foreignKey: 'id' });
// sc.belongsTo(supplier, { foreignKey: 'supplier' });

module.exports = sc;
