/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
	name: {
		type: String,
		required: true
    },
    address: {
		type: String,
		required: true
    },
    phone: {
		type: String,
		required: true
    },
    items: {
		type: Object,
		required: true
	},
	orderTotal: {
		type: Number,
		required: true
	},
    isApproved: {
        type: Boolean,
        default: false
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = (registry) => {
	registry.Order = Order;
};
