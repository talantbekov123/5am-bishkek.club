/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const GroupSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	img: {
		type: String,
		required: true
	},
    chats: {
		type: [String],
		required: true,
		default: []
    }
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = (registry) => {
	registry.Group = Group;
};
