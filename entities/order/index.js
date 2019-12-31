module.exports = {
	name: 'order',
	fields: [
		{
			field: 'id',
			type: 'id'
		},
		{
			field: 'personId',
			type: 'text'
		},
		{
			field: 'orderNum',
			type: 'text'
		},
		{
			field: 'orderDate',
			type: 'datetime'
		},
		{
			field: 'price',
			type: 'text'
		},
		{
			field: 'profit',
			type: 'text'
		}
	]
};
