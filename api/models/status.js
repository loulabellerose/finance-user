const db = require('mongoose');

const statusSchema = new db.Schema ({
    currentStatus: {
        type: String
    },
    createdAt: Number
});

const Status = db.model('Status', statusSchema);

exports.Status = Status
exports.statusSchema = statusSchema;