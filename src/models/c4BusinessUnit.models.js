const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class 
bUnit extends Model {}
bUnit.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			autoIncrement: true
		},
		mversion: {
			type: DataTypes.STRING
		},
		business_unit_code: {
			type: DataTypes.STRING
		},
		business_unit_name: {
			type: DataTypes.STRING
		},
		business_unit_address: {
			type: DataTypes.STRING
		},
		business_unit_registration: {
			type: DataTypes.STRING
		},
		setid: {
			type: DataTypes.STRING
		},
		business_unitgln: {
			type: DataTypes.STRING
		},
		hm_od_directory: {
			type: DataTypes.STRING
		},
		ima_store_prefix: {
			type: DataTypes.STRING
		},
		trf_mapping: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'c4business_unit',
		tableName: 'c4business_unit',
		schema: 'vms'
	}
);

module.exports = bUnit;
