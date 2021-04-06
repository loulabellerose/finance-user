const db = require('mongoose');

const statusSchema = new db.Schema ({
    currentStatus: {
        type: String
    },
    createdAt: {
        type: Date
    }
});

const Status = db.model('Status', statusSchema);

exports.Status = Status
exports.statusSchema = statusSchema;