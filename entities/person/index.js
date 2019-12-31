module.exports = {
	entityName: 'person',
	validation: require('./validation'),
	fields: [
		{
			field: 'id',
			type: 'id'
		},
		{
			field: 'firstName',
			type: 'text'
		},
		{
			field: 'lastName',
			type: 'text'
		},
		{
			field: 'address',
			type: 'text'
		},
		{
			field: 'province',
			type: 'text'
		},
		{
			field: 'country',
			type: 'text'
		},
		{
			field: 'phone',
			type: 'text'
		}
	]
};
