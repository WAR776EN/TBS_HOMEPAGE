const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boostSchema = new Schema({
    creator: {
        type: mongoose.Types.ObjectId,
        required: [true, 'creatorId is required'],
        ref: 'User'
    },
    content: [{
        type: String,
        required:[true, 'content is required']
    }],
    comments: {
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    },
	deleted: {
		type: Boolean,
		default: false
	},
	hidden: {
		type: Boolean,
		default: false
	}
    
});

module.exports = mongoose.model('Boost', boostSchema);
