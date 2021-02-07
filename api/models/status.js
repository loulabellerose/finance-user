const db = require('mongoose');

const statusSchema = new db.Schema ({
    currentStatus: {
        type: String,
        default: "Submitted by merchant"

    },
    createdAt: Number
});

const Status = db.model('Status', statusSchema);

exports.Status = Status
exports.statusSchema = statusSchema;